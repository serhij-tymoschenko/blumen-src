const extractStyles = (svg) => {
    const styles = svg.match(/<style[^>]*>[\s\S]*?<\/style>/gi);
    return styles ? styles.join("\n") : "";
};

const extractContent = (svg) => {
    const content = svg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
    return content ? content[1].replace(/<defs[^>]*>[\s\S]*?<\/defs>/gi, "") : "";
};

export const combine = (items, requiredWidth, requiredHeight, backgroundIndex = null) => {
    let combinedContent = "";
    let combinedStyles = new Set();

    if (!items || !Array.isArray(items)) return "";

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
        const item = items[itemIndex];

        if (typeof item === "string" && item.startsWith("<svg")) {
            const svg = item.replace(/cls-/g, `item-${itemIndex}-cls-`);
            const styles = extractStyles(svg);
            if (styles) combinedStyles.add(styles);

            const content = extractContent(svg);
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
                width="${width}" 
                height="${height}" 
            />
        `;
        }
    }

    const defs = `
        <defs>
            <style>
                ${Array.from(combinedStyles).join("\n")}
            </style>
        </defs>
    `;

    return `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="${requiredWidth}" height="${requiredHeight}" viewBox="0 0 ${requiredWidth} ${requiredHeight}">
            ${defs}
            ${combinedContent}
        </svg>
    `.trim();
};
