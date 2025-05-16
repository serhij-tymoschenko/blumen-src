import React from "react";
import JSZip from "jszip";

const ZipDownload = ({}) => {
    const downloadZip = async () => {
        const zip = new JSZip();

        // Example base64 PNG data (you would replace this with your actual base64 image data)
        const base64Image = "iVBORw0KGgoAAAANSUhEUgAAAAUA..."; // truncated

        zip.file("image1.png", base64Image, { base64: true });
        zip.file("text.txt", "Hello from zipped file!");

        const content = await zip.generateAsync({ type: "blob" });

        const url = URL.createObjectURL(content);
        const a = document.createElement("a");
        a.href = url;
        a.download = "archive.zip";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <button onClick={downloadZip}>
            Download ZIP
        </button>
    );
};

export default ZipDownload;