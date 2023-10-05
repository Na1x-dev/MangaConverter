import express from 'express';
import multer from 'multer';
import * as fs from "node:fs";
import unzipper from 'unzipper';
import path from 'node:path';
import { PDFDocument, StandardFonts } from 'pdf-lib';

const upload = multer({ dest: 'uploads/' });
const app = express();
const PORT = 3000;

let pdfDoc = 0;
let pdfName = '';
let zipArray = [];
let greatJpgArray = [];

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.post('/upload', upload.array('files', 100), (req, res, next) => {
    console.log(`${req.files.length} files loaded`);
    zipArray = req.files;

    zipArray.sort(compare);
    createPDFfile();
    openZipArray();
})

app.get('/', (req, res, next) => {
    res.render('index');
});

app.get('/download', (req, res, next) => {
    res.download('output/' + pdfName + '.pdf');
    clearUploads();
})

app.listen(PORT, () => console.log(`The Server is running on port ${PORT}...`));

async function openZipArray() {
    findMangaName();

    for (let zip of zipArray) {
        let jpegArray = await unzipper.Open.file(zip.path);
        jpegArray.files.pop();
        let bufferArray = [];
        for (let jpegObj of jpegArray.files) {
            bufferArray.push(await jpegObj.buffer());
            greatJpgArray.push(await jpegObj.buffer());
        }
        await addImgToPDF(bufferArray);
        mangaToFolder();
    }

    const pdfBytes = await pdfDoc.save();
    await fs.promises.writeFile('output/' + pdfName.trim() + '.pdf', pdfBytes);
}

function mangaToFolder() {
    fs.rmdir('output/' + pdfName, { recursive: true }, (err) => console.log(err));
    setTimeout(() => {
        fs.mkdir('output/' + pdfName, (err) => console.log(err));
        let i = 0;
        for (let jpgFile of greatJpgArray) {
            fs.writeFile('output/' + pdfName + '/' + i + '.jpg', jpgFile, (err) => console.log(err));
            i++;
        }
    }, 3000);
}

function findMangaName() {
    pdfName = '';
    for (let match of zipArray[0].originalname.match(/[a-zA-Z]+ /g))
        pdfName += match;
    pdfName = pdfName.trimEnd();
}

function clearUploads() {
    const directory = 'uploads';
    fs.readdir(directory, (err, files) => {
        if (err) console.log(err);
        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) console.log(err);
            });
        }
    });
}

async function createPDFfile() {
    pdfDoc = await PDFDocument.create();
}

async function addImgToPDF(images) {
    for (let imageBuffer of images) {
        const image = await pdfDoc.embedJpg(imageBuffer);
        const imagePage = pdfDoc.addPage();
        const { width, height } = image.scaleToFit(imagePage.getWidth(), imagePage.getHeight());
        imagePage.drawImage(image, {
            x: 0,
            y: 0,
            width,
            height,
        });
    }
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
    let chaptersNumbers = a.originalname.match(/ \d+ /g);
    return parseFloat(chaptersNumbers[chaptersNumbers.length - 1]);
}