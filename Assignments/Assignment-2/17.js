function downloadFile(filename, callback) {
    setTimeout(() => {
        console.log(`Downloading ${filename}...`);
        callback();
    }, 2000);
}

function onDownloadComplete() {
    console.log("Download complete!");
}

// Call the function
downloadFile("movie.mp4", onDownloadComplete);
