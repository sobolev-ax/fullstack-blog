const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const keys = require('./keys');
const mongooseConnectParams = {
    useNewUrlParser: true
};
const postRouter = require('./routes/post');
const bodyParser = require('body-parser');

mongoose.connect(keys.mongoURI, mongooseConnectParams)
    .then(() => { console.log('MongoDB conected')})
    .catch(error => { console.error(error)})

const port = process.env.PORT || 5000;
const clientPath = path.join(__dirname, 'client');

const app = express();
app.use(bodyParser.json());
app.use('/api/post', postRouter);
app.use(express.static(clientPath));

app.listen(port, () => {
    console.log(`Server has been started on port ${port}`);
});
