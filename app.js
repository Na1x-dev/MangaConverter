import express from 'express';
import multer from 'multer';
import * as fs from "node:fs";
import unzipper from 'unzipper';
import imgToPDF from 'image-to-pdf'
import { PDFDocument, StandardFonts } from 'pdf-lib';

const upload = multer({ dest: 'uploads/' });
const app = express();
const PORT = 3000;

let pdfDoc = 0;

let zipArray = [];

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.post('/upload', upload.array('files', 100), (req, res, next) => {
    console.log(`${req.files.length} files loaded`);
    zipArray = req.files;
    createPDFfile();
    openZipArray();
})

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => console.log(`The Server is running on port ${PORT}...`));

async function openZipArray() {
    for (let zip of zipArray) {
        let jpegArray = await unzipper.Open.file(zip.path);
        jpegArray.files.pop();
        let bufferArray = [];
        for (let jpegObj of jpegArray.files) {
            bufferArray.push(await jpegObj.buffer());
        }
        await addImgToPDF(bufferArray);
    }
    const pdfBytes = await pdfDoc.save();
    await fs.promises.writeFile('output.pdf', pdfBytes);
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
    return a.originalname.replace(/[^\d]/g, '0');
}