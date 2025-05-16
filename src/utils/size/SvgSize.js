export const getSvgSize = (svg) => {
    const bytes = new TextEncoder().encode(svg).length;
    return bytes + bytes * 0.03;
}

export const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}