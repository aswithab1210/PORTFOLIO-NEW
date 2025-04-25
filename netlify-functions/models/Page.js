const mongoose = require('mongoose');

// Define the schema for a page
const pageSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
      unique: true,  // Ensure each page (Home, About, etc.) is unique
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
  }
);

// Create a model for the page schema
const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
