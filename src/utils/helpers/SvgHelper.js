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

export const replaceColor = (item,  bodyColor, hairColor, eyesColor) => {
    if (typeof item === 'string') {
        let modifiedSrc = item;

        if (hairColor) {
            modifiedSrc = modifiedSrc.replaceAll(/blue/g, hairColor);
        }

        if (eyesColor) {
            modifiedSrc = modifiedSrc
                .replaceAll(/#[Ff][Ff][Ff][Ff]00/g, eyesColor)
                .replaceAll(/#ff0/g, eyesColor);
        }

        // Replace body colors (green/lime)
        if (bodyColor) {
            modifiedSrc = modifiedSrc
                .replaceAll(/#00[Ff][Ff]00/g, bodyColor)
                .replaceAll(/lime/g, bodyColor);
        }

        // Replace eye colors (yellow)


        // Replace hair color (blue)


        return modifiedSrc
    }
    return item;
}