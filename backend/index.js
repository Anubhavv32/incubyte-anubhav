const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose')

const app = express();

const Words = require('./models');

app.use(cors({ origin: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
// Connecting to DB
mongoose.connect('mongodb://localhost:27017/Words', {useNewUrlParser: true, useUnifiedTopology: true, directConnection: true
}).then(() => {
 console.log('connected to db')
}).catch((error) => {
 console.log(error)
})
app.use(express.static(path.join(__dirname, 'build')));


// app.get('/*', async (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.get('/words', async (req, res) => {
    const words = await Words.find();
    res.send(words);
});
app.post('/', function async (req, res) {
    let newWord = new Words({word: req.body.word});
    newWord = newWord.save();
    res.send(newWord);
  });
app.delete('/:id', async (req, res) => {
    const word = await Words.findByIdAndRemove(req.params.id);

  if (!word) return res.status(404).send('The word with the given ID was not found.');

  res.send(word);
})
app.put('/:id', async (req, res) => {
    const word = await Words.findByIdAndUpdate(req.body.id, {
        word: req.body.word
    });
    if (!word) return res.status(400).send('Invalid words.');
    res.send(word);
})
app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});