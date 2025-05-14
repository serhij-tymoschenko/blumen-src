export const combine = (svg, src) => {
    const insertIndex = svg.lastIndexOf('</svg>');

    let injected = '';

    if (src?.src?.includes('data:image/png;base64')) {
        injected = `<image href="${src.src}" width="380px" height="600px" x="0" y="0" />\n`;
    } else if (src?.src?.includes('<svg')) {
        // Remove wrapping <svg>...</svg> tags and extract inner content
        const match = src.src.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
        if (match) {
            injected = match[1]; // Inner contents only
        } else {
            injected = src.src; // fallback
        }
    } else {
        injected = src.src; // Raw <g> or similar
    }

    return svg.slice(0, insertIndex) + injected + svg.slice(insertIndex);
};