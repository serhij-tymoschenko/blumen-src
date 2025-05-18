const extractSvgStyles = (svg) => {
    const styles = svg.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    return styles ? styles[1] : "";
};

const extractSvgContent = (svg) => {
    const content = svg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
    return content ? content[1].replace(/<defs[^>]*>[\s\S]*?<\/defs>/gi, "") : "";
};

export const insertPngIntoSvg = (svg, png) => {
    const insertIndex = svg.lastIndexOf('</svg>');
    const injected = `<image href="${png}" width="380px" height="600px" x="0" y="0" />\n`;
    return svg.slice(0, insertIndex) + injected + svg.slice(insertIndex);
};

export const combineTogether = (items, requiredWidth, requiredHeight, backgroundIndex = null) => {
    let combinedContent = "";
    let combinedStyles = new Set();

    if (!items || !Array.isArray(items)) return "";

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
        const item = items[itemIndex];

        if (typeof item === "string" && item.startsWith("<svg")) {
            const svg = item.replace(/cls-/g, `item-${itemIndex}-cls-`);
            const styles = extractSvgStyles(svg);
            if (styles) combinedStyles.add(styles);

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

    const defs = `
        <defs>
            <clipPath id="clipRect">
                <rect width="552" height="736" rx="55.2" ry="73.6" />
            </clipPath>
            <style>
                ${Array.from(combinedStyles).join("\n").replace(/<\/?style>/g, '')}
            </style>
        </defs>
    `;

    return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="${requiredWidth}" height="${requiredHeight}" viewBox="0 0 ${requiredWidth} ${requiredHeight}">
            ${defs}
            <g clip-path="url(#clipRect)">${combinedContent}</g>
        </svg>`;
};

export const combineGrid = (items, requiredWidth, requiredHeight) => {
    let combinedContent = "";
    let combinedStyles = new Set();

    if (!items || !Array.isArray(items)) return "";

    const localItems = items.length > 5 ? [items.slice(0, 5), items.slice(5)] : [items.slice(0, 5)]
    const rows = items.length > 5 ? 2 : 1

    for (let i = 0; i < localItems.length; i++) {
        const offsetY = i * requiredHeight;
        for (let j = 0; j < localItems[i].length; j++) {
            const item = localItems[i][j];

            const svg = item.replace(/cls-/g, `item-${j}-cls-`);
            const styles = extractSvgStyles(svg);
            if (styles) combinedStyles.add(styles);

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
        <clipPath id="clipRect">
        <rect width="552" height="736" rx="55.2" ry="73.6" />
        </clipPath>
            <style>
                ${Array.from(combinedStyles).join("\n")}
            </style>
        </defs>
    `;

    return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="${requiredWidth * 5}" height="${requiredHeight * rows}" viewBox="0 0 ${requiredWidth * 5} ${requiredHeight * rows}">
            ${defs}
            ${combinedContent}
        </svg>`;
}
