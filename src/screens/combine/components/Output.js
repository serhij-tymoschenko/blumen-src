import {Button, Typography} from "@mui/material";
import React from "react";
import VStack from "../../../stacks/VStack";
import MatchParent from "../../../stacks/MatchParent";

const output = ({svgSize, pngSize, svgSrc, pngSrc, onDownload}) => {
    const formatBytes = (bytes) => {
        if (!bytes) return '0 B';
        const sizes = ['B', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
    };

    const size = svgSize + pngSize + pngSize * 1 / 3;

    return svgSrc.src ? <VStack>
        <MatchParent>
            <VStack>
                <Button variant="contained" onClick={onDownload} fullWidth>
                    {svgSrc.src && pngSrc.src && 'Combine'}
                    {svgSrc.src && !pngSrc.src && 'Correct'}
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
            </VStack>
        </MatchParent>
    </VStack> : null;
}

export default output;