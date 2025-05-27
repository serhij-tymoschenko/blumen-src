import correct from "./corrector/Corrector";

const extractSvgStyles = (svg) => {
    const match = svg.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    return match ? match[1].trim() : "";
};

const extractDefs = (svg) => {
    const match = svg.match(/<defs[^>]*>([\s\S]*?)<\/defs>/i);
    if (!match) return "";
    const defsContent = match[1];
    return defsContent.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "").trim();
};

const extractSvgContent = (svg) => {
    const match = svg.match(/<svg[^>]*?>([\s\S]*?)<\/svg>/i);
    return match ? match[1].replace(/<defs[^>]*>[\s\S]*?<\/defs>/gi, "").trim() : "";
};


export const insertPngIntoSvg = (svg, png) => {
    const insertIndex = svg.lastIndexOf('</svg>');
    const injected = `<image href="${png}" width="380px" height="600px" x="0" y="0" />\n`;
    return svg.slice(0, insertIndex) + injected + svg.slice(insertIndex);
};

export const combineTogether = (items, requiredWidth, requiredHeight, backgroundIndex = null) => {
    let combinedContent = "";
    let combinedStyles = [];
    let combinedDefs = [];

    if (!items || !Array.isArray(items)) return "";

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
        let item = items[itemIndex].replace(/<\?xml[\s\S]*?\?>/, "").trim();

        if (item.trim().startsWith("<svg")) {
            const svg = item.replace(/cls-/g, `item-${itemIndex}-cls-`);

            const styles = extractSvgStyles(svg);
            const defs = extractDefs(svg);
            combinedDefs.push(defs);
            combinedStyles.push(styles);

            const content = extractSvgContent(svg);

            const [offsetX, offsetY] = (itemIndex === backgroundIndex)
                ? [0, 0]
                : [(requiredWidth - 380) / 2, (requiredHeight - 600) / 2];

            combinedContent += `
            <g transform="translate(${offsetX}, ${offsetY})">
                ${content}
            </g>
        `;
        } else {
            const [centerX, centerY] = (itemIndex === backgroundIndex)
                ? [0, 0]
                : [(requiredWidth - 380) / 2, (requiredHeight - 600) / 2];
            const [width, height] = (itemIndex === backgroundIndex)
                ? [552, 736]
                : [380, 600];

            combinedContent += `
            <image 
                href="${item}" 
                x="${centerX}" 
                y="${centerY}" 
                width="${width}px" 
                height="${height}px" 
            />
        `;
        }
    }

    const defs = `<defs>
            ${combinedDefs.join("\n")}
            <clipPath id="clipRect">
                <rect width="552" height="736" rx="27.6" ry="36.8" />
            </clipPath>
            <style>
                ${combinedStyles.join("\n").replace(/<\/?style>/g, '')}
            </style>
        </defs>
    `;

    return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="${requiredWidth}" height="${requiredHeight}" viewBox="0 0 ${requiredWidth} ${requiredHeight}">
            ${defs}
            <g clip-path="url(#clipRect)">${combinedContent}</g>
        </svg>`
};

export const combineGrid = (items, requiredWidth, requiredHeight) => {
    let combinedContent = "";
    let combinedStyles = [];
    let combinedDefs = [];

    if (!items || !Array.isArray(items)) return "";

    const rowsCount = Math.floor(items.length / 5);

    const localItems = items.length > 5 ? [items.slice(0, 5), items.slice(5)] : [items.slice(0, 5)]

    for (let i = 0; i < localItems.length; i++) {
        const offsetY = i * requiredHeight;
        for (let j = 0; j < localItems[i].length; j++) {
            const item = localItems[i][j];

            const svg = item.replace(/cls-/g, `item-${i}${j}-cls-`);
            const styles = extractSvgStyles(svg);
            const defs = extractDefs(svg);
            if (defs) combinedDefs.push(defs);
            if (styles) combinedStyles.push(styles);

            const content = extractSvgContent(svg);
            const offsetX = (j) * requiredWidth

            combinedContent += `
            <g transform="translate(${offsetX}, ${offsetY})">
                ${content}
            </g>
        `;
        }
    }

    const defs = `
        <defs>
            ${combinedDefs.join("\n")}
            <style>
                ${combinedStyles.join("\n")}
            </style>
        </defs>
    `;

    return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="${requiredWidth * 5}" height="${requiredHeight * rowsCount}" viewBox="0 0 ${requiredWidth * 5} ${requiredHeight * rowsCount}">
            ${defs}
            ${combinedContent}
        </svg>`;
}
