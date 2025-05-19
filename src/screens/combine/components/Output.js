import {Box, Button, Stack, Typography} from "@mui/material";
import React from "react";
import {formatSize, getSvgSize} from "../../../utils/svg/SizeHelper";

const output = ({svg, svgSrc, pngSrc, onDownload}) => {
    const svgSize = getSvgSize(svg)

    return svgSrc ?
        <Box paddingLeft={5.7}>
            <Stack spacing={2} direct ion="column">
                <Button variant="contained" onClick={onDownload}>
                    {svgSrc && pngSrc && 'Combine'}
                    {svgSrc && !pngSrc && 'Correct'}
                </Button>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color={
                        svgSize > 512 * 1024
                            ? 'error'
                            : 'textPrimary'
                    }
                >
                    Size: {formatSize(svgSize)}
                </Typography>
            </Stack>
        </Box> : null;
}

export default output;