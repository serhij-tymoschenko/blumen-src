import { useEffect, useRef } from "react";
import { toSvgFile } from "../../../utils/helpers/SvgHelper";

const NAMESPACE_PREFIX = "item";

const namespaceStyles = (styleTag, prefix) => {
    let cssText = styleTag.textContent;
    cssText = cssText.replace(/\.cls-(\d+)/g, (_, clsNum) => `.${prefix}-cls-${clsNum}`);
    styleTag.textContent = cssText;
};

const namespaceClasses = (svgElement, itemIndex) => {
    const prefix = `${NAMESPACE_PREFIX}${itemIndex}`;
    svgElement.querySelectorAll("style").forEach((styleTag) => namespaceStyles(styleTag, prefix));
    svgElement.querySelectorAll("[class]").forEach((el) => {
        const updatedClasses = el
            .getAttribute("class")
            .split(/\s+/)
            .map((cls) => (cls.startsWith("cls-") ? `${prefix}-${cls}` : cls));
        el.setAttribute("class", updatedClasses.join(" "));
    });
};

const updateDefsIds = (svgElement, defsCounter, combinedDefs) => {
    const defs = svgElement.querySelector("defs");
    if (!defs) return defsCounter;

    const clonedDefs = defs.cloneNode(true);
    clonedDefs.querySelectorAll("[id]").forEach((el) => {
        const newId = `def-${defsCounter}-${el.id}`;
        svgElement.innerHTML = svgElement.innerHTML.replace(
            new RegExp(`(#${el.id})([^0-9a-zA-Z]|$)`, "g"),
            `#${newId}$2`
        );
        el.id = newId;
    });

    combinedDefs.add(clonedDefs.innerHTML);
    return defsCounter + 1;
};

const getDimensions = (svgElement) => {
    const viewBox = svgElement.getAttribute("viewBox");
    if (viewBox) {
        const [, , w, h] = viewBox.split(" ");
        return [parseFloat(w), parseFloat(h)];
    }
    const width = parseFloat(svgElement.getAttribute("width") || 0);
    const height = parseFloat(svgElement.getAttribute("height") || 0);
    return [width, height];
};

const parseSvgContent = (svgElement) => {
    return svgElement.innerHTML.replace(/<defs>[\s\S]*?<\/defs>/gi, "");
};

const centerContent = (content, width, height, containerWidth = 552, containerHeight = 736) => {
    const centerX = (containerWidth - width) / 2;
    const centerY = (containerHeight - height) / 2;
    return `<g transform="translate(${centerX}, ${centerY})">${content}</g>`;
};

const parseSvg = async (svgString, itemIndex, combinedDefs, defsCounter) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const svgElement = doc.querySelector("svg");
    if (!svgElement) return { content: "", defsCounter };

    namespaceClasses(svgElement, itemIndex);
    defsCounter = updateDefsIds(svgElement, defsCounter, combinedDefs);

    const [childWidth, childHeight] = getDimensions(svgElement);
    const innerContent = parseSvgContent(svgElement);

    if (childWidth && childHeight) {
        return {
            content: centerContent(innerContent, childWidth, childHeight),
            defsCounter,
        };
    }
    return { content: innerContent, defsCounter };
};

const HexShowcase = ({ items, setTraitsSvg }) => {
    const svgContainerRef = useRef(null);

    useEffect(() => {
        const localItems = toSvgFile(items.slice(1, 10).filter(Boolean));

        const process = async () => {
            let combinedSvgContent = "";
            let combinedDefs = new Set();
            let defsCounter = 1;

            for (let i = 0; i < localItems.length; i++) {
                const src = localItems[i]?.src;
                if (!src) continue;

                if (src.startsWith("<svg")) {
                    const { content, defsCounter: newDefsCounter } = await parseSvg(src, i, combinedDefs, defsCounter);
                    combinedSvgContent += content;
                    defsCounter = newDefsCounter;
                } else if (src.startsWith("blob:")) {
                    try {
                        const response = await fetch(src);
                        const text = await response.text();
                        const { content, defsCounter: newDefsCounter } = await parseSvg(text, i, combinedDefs, defsCounter);
                        combinedSvgContent += content;
                        defsCounter = newDefsCounter;
                    } catch (e) {
                        console.error("Failed to fetch blob SVG:", src, e);
                    }
                } else if (src.startsWith("data:image")) {
                    combinedSvgContent += `<image href="${src}" x="0" y="0" width="552" height="736" />`;
                }
            }

            const defsContent = combinedDefs.size ? `<defs>${Array.from(combinedDefs).join("")}</defs>` : "";

            const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="552" height="736" viewBox="0 0 552 736">
        ${defsContent}
        ${combinedSvgContent}
      </svg>`;

            setTraitsSvg(fullSvg);
        };

        process();
    }, [items, setTraitsSvg]);

    return <div ref={svgContainerRef} style={{ display: "none" }} />;
};

export default HexShowcase;
