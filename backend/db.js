const mongoose = require('mongoose');

const connectToMongo = async () => {
  try {
    // Directly setting the Mongo URI
    const mongoUri = 'mongodb://localhost:27017/inotebook';  // Direct Mongo URI
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);  // Exit the application if connection fails
  }
};

module.exports = connectToMongo;
