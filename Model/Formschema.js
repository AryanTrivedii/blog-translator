const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  translations: [
    {
      language: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
