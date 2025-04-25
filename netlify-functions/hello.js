const { MongoClient } = require('mongodb');

exports.handler = async function(event, context) {
  const uri = process.env.MONGO_URI;  // Connection string from environment variables
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();  // Connect to MongoDB
    const database = client.db('mydatabase');  // Replace with your MongoDB database name
    const collection = database.collection('test');  // Replace with your collection name

    // Fetch one document (for demonstration)
    const result = await collection.findOne({});

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Successfully connected to MongoDB!', data: result })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'MongoDB connection failed', error: error.message })
    };
  } finally {
    await client.close();
  }
};
