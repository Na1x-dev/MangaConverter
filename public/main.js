

const dropFileZone = document.querySelector(".upload-zone_dragover");
const statusText = document.getElementById("uploadForm_Status");
const sizeText = document.getElementById("uploadForm_Size");
const uploadInput = document.querySelector(".form-upload__input");

let setStatus = (text) => {
    statusText.textContent = text;
}

const uploadUrl = "/upload";

["dragover", "drop"].forEach(function (event) {
    document.addEventListener(event, function (evt) {
        evt.preventDefault();
        return false;
    })
})

dropFileZone.addEventListener("dragenter", function () {
    dropFileZone.classList.add("_active");
})

dropFileZone.addEventListener("dragleave", function () {
    dropFileZone.classList.remove("_active");
})

dropFileZone.addEventListener("drop", function (event) {
    dropFileZone.classList.remove("_active");
    const files = event.dataTransfer.files;
    if (!files) {
        return;
    }
    uploadInput.files = event.dataTransfer.files;
    processingUploadFile(files);
})

uploadInput.addEventListener("change", (event) => {
    const files = uploadInput.files;
    if (files) {
        processingUploadFile(files);
    } else {
        setStatus("err");
        return false;
    }
})

function processingUploadFile(files) {
    if (files) {
        const dropZoneData = new FormData();
        const xhr = new XMLHttpRequest();
        console.log(Array.from(files));
        dropZoneData.append('file', files);
        
        xhr.open("POST", uploadUrl, true);

        xhr.send(dropZoneData);

        xhr.onload = function () {
            if (xhr.status == 200) {
                // setStatus("Всё загружено");
            } else {
                setStatus("Oшибка загрузки");
            }
            // HTMLElement.style.display = "none";
        }
    }
}

function processingDownloadFileWithFetch() {
    fetch(url, {
        method: "POST",
    }).then(async (res) => {
        const reader = res?.body?.getReader();
        while (true && reader) {
            const { value, done } = await reader?.read();
            console.log("value", value);
            if (done) break;
            console.log("Received", value);
        }
    })
}



