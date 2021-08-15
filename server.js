const express = require('express');
const path = require('path');
const db = require('./db/db.json');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('/', (req, res) => res.send());

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/db', (req, res) => 
  res.json(db)
);

// app.post('/api/reviews', (req, res) => {
//   // Log that a POST request was received
//   console.info(`${req.method} request received to add a review`);

//   // Destructuring assignment for the items in req.body
//   const { title, text } = req.body;

//   // If all the required properties are present
//   if (product && review && username) {
//     // Variable for the object we will save
//     const newEntry = {
//       id: uid(),
//       title,
//       text,
//     };

//     const response = {
//       status: 'success',
//       body: newEntry,
//     };

//     console.log(response);
//     res.json(response);
//   } else {
//     res.json('Error in adding entry');
//   }
// });

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);