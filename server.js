// --- Dependencies ---
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb'); // ObjectId for handling MongoDB IDs
const cors = require('cors');

// --- Configuration ---
const app = express();
const port = 8080; // Port the backend will run on
const mongoUrl = 'mongodb://localhost:27017'; // Your MongoDB connection string
const dbName = 'timecapsuleDB_simple'; // Database name for this simple version

// --- Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing (allows frontend to connect)
app.use(express.json()); // Allow the server to understand JSON request bodies

// --- MongoDB Connection ---
let db; // Variable to hold the database connection
let usersCollection;
let capsulesCollection;

MongoClient.connect(mongoUrl)
  .then(client => {
    console.log('MongoDB connected successfully.');
    db = client.db(dbName);
    usersCollection = db.collection('users');
    capsulesCollection = db.collection('capsules');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit if DB connection fails
  });

// --- API Endpoints ---

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required.');
  }

  try {
    const existingUser = await usersCollection.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send('Email already registered.');
    }

    // !! INSECURE: Storing plain text password !! Only for simple demo.
    const newUser = { email, password };
    await usersCollection.insertOne(newUser);
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Internal server error during registration.');
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required.');
  }

  try {
    // !! INSECURE: Comparing plain text password !!
    const user = await usersCollection.findOne({ email: email, password: password });

    if (user) {
      // Send back user ID (as string) and email
      res.status(200).json({ id: user._id.toString(), email: user.email });
    } else {
      res.status(401).send('Invalid email or password.');
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Internal server error during login.');
  }
});

// POST /api/capsules
app.post('/api/capsules', async (req, res) => {
  const { userId, message, revealDate } = req.body;

  if (!userId || !message || !revealDate) {
    return res.status(400).send('UserId, message, and revealDate are required.');
  }

  try {
    const newCapsule = {
      userId: userId, // Store as string, could convert back to ObjectId if needed later
      message: message,
      revealDate: new Date(revealDate) // Store as a proper Date object
    };
    const result = await capsulesCollection.insertOne(newCapsule);
    // Send back the created capsule with its new ID
     res.status(201).json({ ...newCapsule, _id: result.insertedId });
  } catch (error) {
    console.error('Error creating capsule:', error);
    res.status(500).send('Internal server error creating capsule.');
  }
});

// GET /api/capsules/user/:userId
app.get('/api/capsules/user/:userId', async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
     return res.status(400).send('User ID is required.');
  }

  try {
    // Find capsules matching the userId string
    const capsules = await capsulesCollection.find({ userId: userId }).toArray();
    res.status(200).json(capsules);
  } catch (error) {
    console.error('Error fetching capsules:', error);
    res.status(500).send('Internal server error fetching capsules.');
  }
});


// --- Start Server ---
app.listen(port, () => {
  console.log(`Simple backend server running at http://localhost:${port}`);
});

