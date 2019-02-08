const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/bundle.js'));
});

app.listen(3000, () => console.log('Listening on port 3000...'));
