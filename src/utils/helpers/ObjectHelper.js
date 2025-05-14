export const objectUrlToBlob = async (objectUrl) => {
    const response = await fetch(objectUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch object URL');
    }
    return await response.blob();
};