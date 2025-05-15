import { useEffect, useRef } from "react";
import { toSvgFile } from "../../../utils/helpers/SvgHelper";

const HexShowcase = ({ items, setTraitsSvg }) => {
    const svgContainerRef = useRef(null);

    useEffect(() => {
        let localItems = [
            items[1],
            items[2],
            items[3],
            items[4],
            items[5],
            items[6],
            items[7],
            items[8],
            items[9],
        ].filter(Boolean);

        localItems = toSvgFile(localItems);

        const process = async () => {
            let combinedSvgContent = '';
            let combinedDefs = new Set();
            let defsCounter = 1;

            const namespaceClasses = (svgElement, itemIndex) => {
                const prefix = `item${itemIndex}`;

                // Update style tags
                const styleTags = svgElement.querySelectorAll('style');
                styleTags.forEach((styleTag) => {
                    let cssText = styleTag.textContent;
                    const classRegex = /\.cls-(\d+)/g;
                    let match;

                    while ((match = classRegex.exec(cssText)) !== null) {
                        const oldClass = `cls-${match[1]}`;
                        const newClass = `${prefix}-cls-${match[1]}`;
                        cssText = cssText.replace(
                            new RegExp(`\\.${oldClass}(\\W)`, 'g'),
                            `.${newClass}$1`
                        );
                    }

                    styleTag.textContent = cssText;
                });

                // Update class attributes
                svgElement.querySelectorAll('[class]').forEach(el => {
                    const original = el.getAttribute('class').split(/\s+/);
                    const updated = original.map(cls =>
                        cls.startsWith('cls-') ? `${prefix}-${cls}` : cls
                    );
                    el.setAttribute('class', updated.join(' '));
                });
            };

            const parseSvg = async (svgString, itemIndex) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(svgString, 'image/svg+xml');
                const svgElement = doc.querySelector('svg');

                if (!svgElement) return;

                namespaceClasses(svgElement, itemIndex);

                const defs = svgElement.querySelector('defs');
                if (defs) {
                    const clonedDefs = defs.cloneNode(true);
                    clonedDefs.querySelectorAll('[id]').forEach(el => {
                        const newId = `def-${defsCounter}-${el.id}`;
                        svgElement.innerHTML = svgElement.innerHTML.replace(
                            new RegExp(`(#${el.id})([^0-9a-zA-Z]|$)`, 'g'),
                            `#${newId}$2`
                        );
                        el.id = newId;
                    });
                    combinedDefs.add(clonedDefs.innerHTML);
                    defsCounter++;
                }

                const viewBox = svgElement.getAttribute('viewBox');
                const innerContent = svgElement.innerHTML.replace(/<defs>[\s\S]*?<\/defs>/gi, '');
                let childWidth, childHeight;

                if (viewBox) {
                    const [, , w, h] = viewBox.split(' ');
                    childWidth = parseFloat(w);
                    childHeight = parseFloat(h);
                } else {
                    childWidth = parseFloat(svgElement.getAttribute('width') || 0);
                    childHeight = parseFloat(svgElement.getAttribute('height') || 0);
                }

                if (childWidth && childHeight) {
                    const centerX = (552 - childWidth) / 2;
                    const centerY = (736 - childHeight) / 2;
                    combinedSvgContent += `<g transform="translate(${centerX}, ${centerY})">${innerContent}</g>`;
                } else {
                    combinedSvgContent += innerContent;
                }
            };

            for (let i = 0; i < localItems.length; i++) {
                const item = localItems[i];
                const src = item?.src;
                if (!src) continue;

                if (src.startsWith('<svg')) {
                    await parseSvg(src, i);
                } else if (src.startsWith('blob:')) {
                    try {
                        const response = await fetch(src);
                        const text = await response.text();
                        await parseSvg(text, i);
                    } catch (e) {
                        console.error("Failed to fetch blob SVG:", src, e);
                    }
                } else if (src.startsWith('data:image')) {
                    combinedSvgContent += `<image href="${src}" x="0" y="0" width="552" height="736" />`;
                }
            }

            const defsContent = combinedDefs.size
                ? `<defs>${Array.from(combinedDefs).join('')}</defs>`
                : '';

            const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="552" height="736" viewBox="0 0 552 736">
                ${defsContent}
                ${combinedSvgContent}
            </svg>`;

            setTraitsSvg(fullSvg);
        };

        process();
    }, [items, setTraitsSvg]);

    return <div ref={svgContainerRef} style={{ display: 'none' }} />;
};

export default HexShowcase;
