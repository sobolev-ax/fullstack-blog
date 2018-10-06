const express = require('express');
const path = require('path');

const port = process.env.PORT || 5000;
const clientPath = path.join(__dirname, 'client');

const app = express();
app.use(express.static(clientPath));

app.listen(port, () => {
    console.log(`Server has been started on port ${port}`);
});
