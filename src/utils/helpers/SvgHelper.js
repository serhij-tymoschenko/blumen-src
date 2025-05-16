export const toSvgFile = (item)=> {
    if (typeof item === 'string' && item.startsWith('<svg')) {
        const blob = new Blob([item], {type: 'image/svg+xml'});
        return URL.createObjectURL(blob);
    } else {
        return item;
    }
}

export const toSvgBlob = (item) => {
    return new Blob([item], {type: 'image/svg+xml'})
}

export const replaceColors = (items, bodyColor, hairColor, eyesColor) =>
    items.map((item) => {
        if (typeof item === 'string') {
            let modifiedSrc = item;

            // Replace body colors (green/lime)
            if (bodyColor) {
                modifiedSrc = modifiedSrc
                    .replace(/#00[Ff][Ff]00/g, bodyColor)
                    .replace(/lime/g, bodyColor);
            }

            // Replace eye colors (yellow)
            if (eyesColor) {
                modifiedSrc = modifiedSrc
                    .replace(/#[Ff][Ff][Ff][Ff]00/g, eyesColor)
                    .replace(/#ff0/g, eyesColor);
            }

            // Replace hair color (blue)
            if (hairColor) {
                modifiedSrc = modifiedSrc.replace(/blue/g, hairColor);
            }

            return modifiedSrc;
        }
        return item;
    });

export const toPngSrc = (svgString) => {
    return new Promise((resolve, reject) => {
        if (!svgString) return reject("SVG string is empty");

        const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.onload = () => {
            const width = img.width;
            const height = img.height;

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;

            function isRowTransparent(y) {
                for (let x = 0; x < width; x++) {
                    if (data[(y * width + x) * 4 + 3] !== 0) return false;
                }
                return true;
            }

            let topVisibleRow = 0;
            for (; topVisibleRow < height; topVisibleRow++) {
                if (!isRowTransparent(topVisibleRow)) break;
            }

            const cropWidth = 404;
            const cropHeight = 404;
            const cropX = Math.max(0, Math.floor((width - cropWidth) / 2));
            let cropY = topVisibleRow;
            if (cropY + cropHeight > height) {
                cropY = Math.max(0, height - cropHeight);
            }

            const croppedCanvas = document.createElement("canvas");
            croppedCanvas.width = cropWidth;
            croppedCanvas.height = cropHeight;
            const croppedCtx = croppedCanvas.getContext("2d");
            croppedCtx.drawImage(canvas, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

            // Get base64 PNG data URL here (default MIME is image/png)
            const base64Png = croppedCanvas.toDataURL("image/png");

            URL.revokeObjectURL(url);
            resolve(base64Png);
        };

        img.onerror = (err) => {
            URL.revokeObjectURL(url);
            reject("Image load error: " + err);
        };

        img.src = url;
    });
};