import {RGB_REGEX, STYLE_PARAM_REGEX} from "../../RegexConstants";
import {rgbToHex} from "./Color";

export const addCss = (content) => {
    const classes = {};
    let clsIndex = 0;
    let localContent = content;

    [...content.matchAll(STYLE_PARAM_REGEX)].forEach(match => {
        let style = match[1].replace(RGB_REGEX, (match, r, g, b) => {
            return rgbToHex(parseInt(r), parseInt(g), parseInt(b));
        });

        classes[clsIndex++] = style;
        const clsId = Object.keys(classes).find(key => classes[key] === style);
        localContent = localContent.replace(`style="${match[1]}"`, `class="cls-${clsId}"`);
    })

    let svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 600\">"
    let index = localContent.indexOf(svg) + svg.length;
    const clss = Object.entries(classes)
        .map(([k, v]) => `.cls-${k} { ${v.trim()}${v.endsWith(";") ? '' : ';'} }`)
        .join("\n");

    const updatedContent =
        localContent.slice(0, index) +
        `
    <defs>
        <style>
            ${clss}
        </style>
    </defs>
        `
        + localContent.slice(index);

    return updatedContent
}