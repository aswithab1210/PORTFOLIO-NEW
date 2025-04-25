const mongoose = require('mongoose');
const Page = require('./models/Page');


exports.handler = async function(event, context) {
  const { page, content } = JSON.parse(event.body);  // Get the page and content from the request body
  const uri = process.env.MONGO_URI;

  try {
    console.log('Connecting to MongoDB...');
    
    // Connect to MongoDB using Mongoose without deprecated options
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri);
      console.log('Connected to MongoDB successfully!');
    }

    // Check if the page already exists
    const existingPage = await Page.findOne({ page: page });

    if (existingPage) {
      // Update the existing page's content
      existingPage.content = content;
      await existingPage.save();
    } else {
      // Create a new page if it doesn't exist
      const newPage = new Page({ page, content });
      await newPage.save();
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Page content updated successfully' }),
    };
  } catch (error) {
    console.error('Error in MongoDB connection:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Error saving page content', error: error.message }),
    };
  } finally {
    // Close the MongoDB connection after the operation
    await mongoose.disconnect();
  }
};
