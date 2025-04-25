const mongoose = require('mongoose');
const Page = require('./models/Page');


exports.handler = async function(event, context) {
  const uri = process.env.MONGO_URI;
  try {
    // Connect to MongoDB using Mongoose
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri);
    }

    // Fetch all page content from the database
    const pages = await Page.find();

    // Convert the page data into a structure suitable for the frontend
    const pageData = pages.reduce((acc, page) => {
      acc[page.page] = page.content;
      return acc;
    }, {});

    return {
      statusCode: 200,
      body: JSON.stringify(pageData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching page data', error: error.message }),
    };
  } finally {
    await mongoose.disconnect();
  }
};
