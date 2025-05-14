export const toSvgFile = (items) => items.map((item) => {
    if (typeof item.src === 'string' && item.src.startsWith('<svg')) {
        const blob = new Blob([item.src], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);

        return {
            ...item,
            src: url,
        };
    } else {
        return item;
    }
});

export const replaceColors = (items, bodyColor, hairColor, eyesColor) =>
    items.map((item) => {
        if (typeof item.src === 'string') {
            let modifiedSrc = item.src;

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

            return {
                ...item,
                src: modifiedSrc
            };
        }
        return item;
    });