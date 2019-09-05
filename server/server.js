const config = require('./config/config');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('../build'));
app.get('/*', (req, res) => res.sendFile(path.resolve('../build', 'index.html')));

require('./api').init(app);

app.listen(
    config.nodePort,
    () => console.log(`Listening api on port ${config.nodePort}`)
);
