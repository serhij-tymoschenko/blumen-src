export const toSvgFile = (items) => items.map((item) => {
    if (typeof item.src === 'string' && item.src.startsWith('<svg')) {
        const blob = new Blob([item.src], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        return {
            ...item,
            src: url,
        };
    } else {
        return item;
    }
});

export const replaceColors = (items, body, hair, eyes) => items.map((item) => {
    if (typeof item.src === 'string' && item.src.startsWith('<svg')) {
        return {
            ...item,
            src: item.src
                .replace(/#00[Ff][Ff]00/g, body)
                .replace(/#[Ff][Ff][Ff][Ff]00/g, eyes)
                .replace(/lime/g, body)
                .replace(/blue/g, hair)
                .replace(/#ff0/g, eyes)
        };
    } else {
        return item;
    }
});