export const toSvgFile = (items) => items.map((item) => {
    if (typeof item.src === 'string' && item.src.startsWith('<svg')) {
        // It's an inline SVG string — convert to Blob and then Object URL
        const blob = new Blob([item.src], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        return {
            ...item,
            src: url, // now it's a usable image URL
        };
    } else {
        // Leave other items unchanged
        return item;
    }
});