const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const port = 3000;

app.get('/', (req, res) => {
    res.json({
        businesses: [],
        v: '0.1',
    });
});

app.get('/businesses/list', (req, res) => {
    res.json({
        businesses: [],
        v: '0.1',
    });
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});