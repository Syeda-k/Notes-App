const mongoose = require('mongoose');

// Correct the MongoDB URI (remove the extra space)
const mongoURI = "mongodb://localhost:27017/inotebook";

// Function to connect to MongoDB
const connectToMongo = () => {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => {
            console.error('Failed to connect to MongoDB:', err.message);
            process.exit(1); // Exit the app if the connection fails
        });
};

module.exports = connectToMongo;
