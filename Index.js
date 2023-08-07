const express = require('express');
const cors = require('cors');
const Connection = require('../Backend/Database/Database.js');
const Controller = require('../Backend/Controller/Api .js'); // I removed the space from the filename
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/', Controller);

Connection();

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
