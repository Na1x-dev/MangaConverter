import express from 'express';
import multer from 'multer';
import * as zip from "@zip.js/zip.js";
import * as fs from "node:fs";

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
    console.log(zipArray);
    // console.log(getClearNumbersStr(zipArray[0]));
})

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => console.log(`The Server is running on port ${PORT}...`));

async function openZipArray() {

   
    // const reader = new zip.ZipReader(zipArray[0]);
    // const entries = await reader.getEntries();
    // if(entries.length){
    //     console.log(entries[0]);
    // }
}

function compare(a, b) {
    if (getClearNumbersStr(a) < getClearNumbersStr(b)) {
        return -1;
    }
    if (getClearNumbersStr(a) > getClearNumbersStr(b)) {
        return 1;
    }
    return 0;
}

function getClearNumbersStr(a){
    return a.originalname.replace(/[^\d]/g, '0');
}