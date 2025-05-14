export const combine = (svg, src) => {
    const index = svg.lastIndexOf("</svg>") - 1

    const chs = src.src.includes('data:image/png;base64')
        ? `
    <image href="${src.src}" width="380px" height="600px" x="0" y="0" />
        `
        : src.src;

    const combinedSvg =
        svg.slice(0, index)
        + chs
        + svg.slice(index);

    return combinedSvg;
}