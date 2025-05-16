export const getSvgSize = (svg) => {
    const utf8Encode = new TextEncoder();
    const bytes = utf8Encode.encode(svg);
    if (!bytes) return '0 B';
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}