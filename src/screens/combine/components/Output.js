import {Box, Typography} from "@mui/material";
import React from "react";

const output = ({svgSize, pngSize}) => {
    const formatBytes = (bytes) => {
        if (!bytes) return '0 B';
        const sizes = ['B', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
    };

    var size = svgSize + pngSize + pngSize * 1 / 3;

    return (
        <Box>
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
        </Box>
    );
}

export default output;