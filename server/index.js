const express = require('express');
const cors = require('cors');
const app = express();

const businessListJSON = require('./data/businesses');
const achievementListJSON = require('./data/achievements');
const upgradeJSON = require('./data/upgrades');

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
});

app.get('/achievements/list', (req, res) => {
    res.json(achivementListJSON);
});

app.get('/gamedata', (req, res) => {
    res.json({
        v: "0.4",
        businesses: businessListJSON.data.businesses,
        achievements: achievementListJSON.data.achievements,
        upgrades: upgradeJSON.data.upgrades
    });
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});