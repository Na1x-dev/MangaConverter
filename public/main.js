// const dropFileZone = document.querySelector(".drop-zone");
// const statusText = document.getElementById("uploadForm_Status");
// const sizeText = document.getElementById("uploadForm_Size");
// const inputFiles = document.querySelector(".input-files");

// let setStatus = (text) => {
//     statusText.textContent = text;
// }

// const uploadUrl = "/unicorns";

// ["dragover", "drop"].forEach(function (event) {
//     document.addEventListener(event, function (evt) {
//         evt.preventDefault();
//         return false;
//     })
// })

// dropFileZone.addEventListener("dragenter", () => { dropFileZone.classList.add("_active"); });
// dropFileZone.addEventListener("dragleave", () => { dropFileZone.classList.remove("_active"); });


// dropFileZone.addEventListener("drop", function (event) {
//     dropFileZone.classList.remove("_active");
//     const files = event.dataTransfer?.files;

//     console.log(event);

//     if (!files) {
//         return;
//     }

//     // if (file.type.startsWith("image/")) {
//         inputFiles.files = event.dataTransfer.files;
//         // processingUploadFile()
//     // } else {
//         // setStatus("Можно загружать только изображения")
//         // return false
//     // }
// })

// inputFiles.addEventListener("change", (event) => {
//     const files = inputFiles.files?.[0]
//     if (files) {
//         // console.log(files);
//         // processingUploadFile(files)
//     } else {
//         setStatus("err")
//         return false
//     }
// })

// function processingUploadFile(files) {
//     if (files) {
//         const dropZoneData = new FormData()
//         const xhr = new XMLHttpRequest()

//         dropZoneData.append("file", files)

//         xhr.open("POST", uploadUrl, true)

//         xhr.send(dropZoneData)

//         xhr.onload = function () {
//             if (xhr.status == 200) {
//                 setStatus("Всё загружено")
//             } else {
//                 setStatus("Oшибка загрузки")
//             }
//             HTMLElement.style.display = "none"
//         }
//     }
// }

// function processingDownloadFileWithFetch() {
//     fetch(url, {
//         method: "POST",
//     }).then(async (res) => {
//         const reader = res?.body?.getReader();
//         while (true && reader) {
//             const { value, done } = await reader?.read()
//             console.log("value", value)
//             if (done) break
//             console.log("Received", value)
//         }
//     })
// }




// // dropFileZone.addEventListener("drop", function (event) {
// //     dropFileZone.classList.remove("_active");
// //     const files = event.dataTransfer?.files;
// //     console.log(files);
// //     if (!files) {
// //         return
// //     }
// //     console.log(files);
// //     inputFiles.files = event.dataTransfer.files;
// // });

// // inputFiles.addEventListener("change", (event)=>{
// //     const files = inputFiles.files?.[0];
// //     if(files){
// //         console.log("loading...");
// //     }
// // });


const dropFileZone = document.querySelector(".upload-zone_dragover");
const statusText = document.getElementById("uploadForm_Status");
const sizeText = document.getElementById("uploadForm_Size");
const uploadInput = document.querySelector(".form-upload__input");

let setStatus = (text) => {
    statusText.textContent = text;
}

const uploadUrl = "/unicorns";

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

dropFileZone.addEventListener("drop", function () {
    dropFileZone.classList.remove("_active");
    const file = event.dataTransfer?.files[0];
    if (!file) {
        return;
    }
    uploadInput.files = event.dataTransfer.files;
    processingUploadFile();
})

uploadInput.addEventListener("change", (event) => {
    const file = uploadInput.files?.[0];
    if (file) {
        processingUploadFile();
    } else {
        setStatus("err");
        return false;
    }
})

function processingUploadFile(file) {
    if (file) {
        const dropZoneData = new FormData();
        const xhr = new XMLHttpRequest();

        dropZoneData.append("file", file);

        xhr.open("POST", uploadUrl, true);

        xhr.send(dropZoneData);

        xhr.onload = function () {
            if (xhr.status == 200) {
                setStatus("Всё загружено");
            } else {
                setStatus("Oшибка загрузки");
            }
            HTMLElement.style.display = "none";
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



