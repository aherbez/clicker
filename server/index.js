const express = require('express');
const cors = require('cors');
const app = express();

const businessListJSON = require('./data/businesses');

app.use(cors());

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.json({
        businesses: [],
        v: '0.1',
    });
});

app.get('/businesses/list', (req, res) => {
    res.json(businessListJSON);
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});