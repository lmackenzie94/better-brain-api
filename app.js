require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import routes
const wordsRouter = require('./routes/words');
const quotesRouter = require('./routes/quotes');
const adviceRouter = require('./routes/advice');
const learningsRouter = require('./routes/learnings');
const highlightsRouter = require('./routes/highlights');
const randomRouter = require('./routes/random');


// initialize
const app = express();

// enable cors
app.use(cors());

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

// The urlencoded method within body-parser tells body-parser to extract data
// from the <form> element and add them to the body property in the request object.
app.use(bodyParser.urlencoded({ extended: true }));

// tell Express it should accept JSON
app.use(express.json());

// use routes
app.use('/words', wordsRouter);
app.use('/quotes', quotesRouter);
app.use('/advice', adviceRouter);
app.use('/learnings', learningsRouter);
app.use('/highlights', highlightsRouter);
app.use('/random', randomRouter);


app.get('/', (req, res) => {
  res.send(`Home | wikiluke API`);
});

const port = process.env.PORT || 6969;

// listen
app.listen(port, () =>
  console.log(`your dope app is running at http://localhost:${port}`)
);
