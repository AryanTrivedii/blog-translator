import React, { useState, useEffect } from 'react';
import { Button, Box, styled } from '@mui/material';
import axios from 'axios';

const Options = styled(Box)`
  display: flex;
`;

function Posts() {
  const [language, setLanguage] = useState('en');
  const [posts, setPosts] = useState([]);

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/blogs');
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Options>
        <Button variant='contained' onClick={() => handleLanguageChange('en')}>English</Button>
        <Button variant='contained' onClick={() => handleLanguageChange('nl')}>Dutch</Button>
      </Options>

      <div>
        <h2>Blog Posts:</h2>
        <ul>
          {posts.map((post) => {
            const translation = post.translations.find((t) => t.language === language);
            const title = translation ? translation.title : post.title;
            const description = translation ? translation.description : post.description;
            const image = translation ? translation.image : post.image;

            return (
              <li key={post._id}>
                <h3>{title}</h3>
                <p>{description}</p>
                {image && <img src={`http://localhost:5000/uploads/${image.image}`} alt={title} />}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Posts;
