import express from 'express';
import multer from 'multer';
import * as fs from "node:fs";
import unzipper from 'unzipper';

const upload = multer({ dest: 'uploads/' });
const app = express();
const PORT = 3000;

let zipArray = [];

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.post('/upload', upload.array('files', 100), (req, res, next) => {
    console.log(`${req.files.length} files loaded`);
    zipArray = req.files;
    // zipArray.sort(compare);
    // console.log(zipArray);
    // console.log(getClearNumbersStr(zipArray[0]));

    openZipArray();
})

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => console.log(`The Server is running on port ${PORT}...`));

async function openZipArray() {

let jpegArray = await unzipper.Open.file(zipArray[0].path);
jpegArray.files.pop();
console.log(jpegArray.files);

} 

function compare(a, b) { //переделать 
    if (getClearNumbersStr(a) < getClearNumbersStr(b)) {
        return -1;
    }
    if (getClearNumbersStr(a) > getClearNumbersStr(b)) {
        return 1;
    }
    return 0;
}

function getClearNumbersStr(a) {
    return a.originalname.replace(/[^\d]/g, '0');
}