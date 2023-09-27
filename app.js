import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hi, Bro, Why Are You Gay?');
});

app.listen(PORT, () => console.log(`The Server is running on port ${PORT}...`));