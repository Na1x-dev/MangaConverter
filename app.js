import express from 'express';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const app = express();
const PORT = 3000;


app.set('view engine', 'ejs');

app.use(express.static('public'));

app.post('/upload', upload.array('files', 100), (req, res, next) => {
    // res.send(`${req.files.length} files loaded`);
    console.log(`${req.files.length} files loaded`);
})

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => console.log(`The Server is running on port ${PORT}...`));