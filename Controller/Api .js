const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Blog = require('../Model/Formschema'); // Import the Blog model
const { translate } = require('@vitalets/google-translate-api');
const fs = require('fs');


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const destinationPath = path.join(__dirname, 'uploads');
//     cb(null, destinationPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   },


// });

// const upload = multer({ storage });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });




router.post('/blogs', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : '';

    // Translate to Dutch
    const dutchTranslation = await translate(title, { to: 'nl' });
    const dutchDescription = await translate(description, { to: 'nl' });

    const blog = new Blog({
      title,
      description,
      image,
      translations: [
        {
          language: 'en', // English
          title,
          description,
          image,
        },
        {
          language: 'nl', // Dutch
          title: dutchTranslation.text,
          description: dutchDescription.text,
          image: image, 
        },
      ],
    });

    await blog.save();
    res.json({ message: 'Blog post saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving blog post' });
  }
});

router.get('/blogs', async (req, res) => {
  try {
    const posts = await Blog.find();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching blog posts' });
  }
});
module.exports = router;
