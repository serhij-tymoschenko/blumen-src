import {Box, Button, Typography} from "@mui/material";
import React from "react";

const output = ({svgSize, pngSize, svgSrc, pngSrc, onDownload}) => {
    const formatBytes = (bytes) => {
        if (!bytes) return '0 B';
        const sizes = ['B', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
    };

    const size = svgSize + pngSize + pngSize * 1 / 3;
    const output = svgSrc ? <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" onClick={onDownload}>
            {svgSrc && pngSrc && 'Combine'}
            {svgSrc && !pngSrc && 'Convert'}
        </Button>
        <Typography
            variant="body2"
            fontWeight="bold"
            color={
                size > 512 * 1024
                    ? 'error'
                    : 'textPrimary'
            }
        >
            Size: {formatBytes(size)}
        </Typography>
    </Box> : null

    return output;
}

export default output;