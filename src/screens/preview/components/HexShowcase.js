import {useEffect, useRef, useState} from "react";
import {replaceColors, toSvgFile} from "../../../utils/helpers/SvgHelper";

const HexShowcase = ({items, bodyColor, hairColor, eyesColor}) => {
    const svgContainerRef = useRef(null);
    const [blobUrl, setBlobUrl] = useState(null);

    useEffect(() => {
        let localItems = [
            items[6],
            items[3],
            items[2],
            items[0],
            items[1],
            items[5],
            items[4],
            items[7],
            items[8],
        ].filter(Boolean);

        localItems = toSvgFile(localItems);

        const process = async () => {
            let combinedSvgContent = '';

            for (const item of localItems) {
                const src = item?.src;
                if (!src) continue;

                if (src.startsWith('<svg')) {
                    const match = src.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
                    if (match) {
                        combinedSvgContent += match[1];
                    }
                } else if (src.startsWith('blob:')) {
                    try {
                        const response = await fetch(src);
                        const text = await response.text();
                        const match = text.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
                        const svgTag = match ? match[0] : text;

                        const parser = new DOMParser();
                        const doc = parser.parseFromString(svgTag, 'image/svg+xml');
                        const svgElement = doc.querySelector('svg');

                        if (svgElement) {
                            const viewBox = svgElement.getAttribute('viewBox');
                            let childWidth, childHeight;

                            if (viewBox) {
                                const parts = viewBox.split(' ');
                                childWidth = parseFloat(parts[2]);
                                childHeight = parseFloat(parts[3]);
                            } else {
                                childWidth = parseFloat(svgElement.getAttribute('width') || 0);
                                childHeight = parseFloat(svgElement.getAttribute('height') || 0);
                            }

                            if (childWidth && childHeight) {
                                const centerX = (552 - childWidth) / 2;
                                const centerY = (736 - childHeight) / 2;
                                const innerContent = svgElement.innerHTML;
                                combinedSvgContent += `<g transform="translate(${centerX}, ${centerY})">${innerContent}</g>`;
                            } else {
                                combinedSvgContent += svgElement.innerHTML;
                            }
                        }
                    } catch (e) {
                        console.error("Failed to fetch blob SVG:", src, e);
                    }
                } else if (src.startsWith('data:image')) {
                    combinedSvgContent += `<image href="${src}" x="0" y="0" width="552" height="736" />`;
                }
            }

            const fullSvg = `
                <svg xmlns="http://www.w3.org/2000/svg" width="552" height="736" viewBox="0 0 552 736">
                    ${combinedSvgContent}
                </svg>`

            const blob = new Blob([fullSvg], {type: 'image/svg+xml'});
            const url = URL.createObjectURL(blob);
            setBlobUrl(url);
        };

        process();

        return () => {
            if (blobUrl) URL.revokeObjectURL(blobUrl);
        };
    }, [items, bodyColor, hairColor, eyesColor]);

    return (
        <>
            <div ref={svgContainerRef} style={{display: 'none'}}/>
            {blobUrl ? (
                <img
                    src={blobUrl}
                    alt="SVG Preview"
                    width={552}
                    height={736}
                    style={{
                        borderRadius: 5,
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                />
            ) : (
                <p>Loading image...</p>
            )}
        </>
    );
};

export default HexShowcase;