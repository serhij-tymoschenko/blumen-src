export const combine = (svg, pngSrc) => {
    const index = svg.indexOf("</svg>") - 1

    const combinedSvg =
        svg.slice(0, index) +
        `
    <image href="${pngSrc}" width="380px" height="600px" x="0" y="0" />
        `
        + svg.slice(index);

    return combinedSvg;
}