const express = require('express');
const _ = require('lodash');
require('dotenv').config();

const app = express();


const analyzeData = require('./middleware/analyzeData.js');
const fetchData = require('./middleware/fetchData.js');
const fetchWithCache = require('./middleware/fetchWithCache.js');


const port = process.env.PORT;



app.get('/api/blog-stats', fetchData, analyzeData, (req, res) => {
  res.json(req.analytics);
});


app.get('/api/blog-search', fetchData, (req, res) => {
  const query = req.query.query;
  if (!query) {
    res.status(400).json({ message: 'Missing query parameter'});
  }
  else{
    const lowercaseQuery = query.toLowerCase();
    const results = _.filter(req.blogData, blog => blog.title && blog.title.toLowerCase().includes(lowercaseQuery));
    res.json(results);
  }
});


app.get('/api/blog-stats-cached', fetchWithCache, analyzeData, (req, res) => {
    res.json(req.analytics);
});

app.get('/api/blog-search-cached', fetchWithCache, (req, res) => {
  const query = req.query.query;
  if (!query) {
    res.status(400).json({ message: 'Missing query parameter'});
  }
  else{ 
    const lowercaseQuery = req.query.query.toLowerCase();
    const results = _.filter(req.blogData, blog => blog.title && blog.title.toLowerCase().includes(lowercaseQuery));
    res.json(results);
  }
});

app.listen(port, () => {
  console.log(`Blog Analytics tool is running on http://localhost:${port}`);
});