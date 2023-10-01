const express = require('express');
const _ = require('lodash');
require('dotenv').config();

const app = express();


const analyzeData = require('./middleware/analyzeData.js');
const fetchData = require('./middleware/fetchData.js');
const fetchWithCache = require('./middleware/fetchWithCache.js');


const port = process.env.PORT;

app.use((err, req, res, next) => {
  console.error(err);

  if (err.status) {
    res.status(err.status).json({ message: err.message });
  } else if (err.isAxiosError && err.response) {
    const status = err.response.status;
    const message = err.response.data.message || 'Internal Server Error';
    res.status(status).json({message: message });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/blog-stats', fetchData, analyzeData, (req, res) => {
  try {
    res.json(req.analytics);
  } catch (error) {
    res.status(500).json({ message: 'Something Went Wrong!!!'});
  }
});


app.get('/api/blog-search', fetchData, (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      res.status(400).json({ message: 'Missing query parameter'});
    }
    else{
      const lowercaseQuery = query.toLowerCase();
      const results = _.filter(req.blogData, blog => blog.title && blog.title.toLowerCase().includes(lowercaseQuery));
      res.json(results);
    }
  } catch (error) {
    res.status(500).json({ message: 'Something Went Wrong!!!'});
  }
});


app.get('/api/blog-stats-cached', fetchWithCache, analyzeData, (req, res) => {
    try {
      res.json(req.analytics);
    } catch (error) {
      res.status(500).json({ message: 'Something Went Wrong!!!'});
    }
});

app.get('/api/blog-search-cached', fetchWithCache, (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      res.status(400).json({ message: 'Missing query parameter'});
    }
    else{ 
      const lowercaseQuery = req.query.query.toLowerCase();
      const results = _.filter(req.blogData, blog => blog.title && blog.title.toLowerCase().includes(lowercaseQuery));
      res.json(results);
    }
    
  } catch (error) {
    res.status(500).json({ message: 'Something Went Wrong!!!'});
  }
});

app.listen(port, () => {
  console.log(`Blog Analytics tool is running on http://localhost:${port}`);
});