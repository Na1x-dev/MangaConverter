const dropFileZone = document.querySelector(".drop-zone");
const statusText = document.getElementById("uploadForm_Status");
const inputFiles = document.querySelector("input-files");

let setStatus = (text) => {
    statusText.textContent = text;
}

const uploadUrl = "/unicorns";

["dragover", "drop"].forEach((event) => {
    document.addEventListener(event, function (evt) {
        evt.preventDefault()
        return false
    })
})

dropFileZone.addEventListener("dragenter", () => { dropFileZone.classList.add("_active"); });
dropFileZone.addEventListener("dragleave", () => { dropFileZone.classList.remove("_active"); });

dropFileZone.addEventListener("drop", function (event) {
    dropFileZone.classList.remove("_active");
    const files = event.dataTransfer?.files[0];
    if (!files) {
        return
    }
    console.log(files);
    inputFiles.files = event.dataTransfer.files;
});

inputFiles.addEventListener("change", (event)=>{
    const files = inputFiles.files?.[0];
    if(files){
        console.log("loading...");
    }
});