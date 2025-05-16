import {Button, Typography} from "@mui/material";
import React from "react";
import VStack from "../../../stacks/VStack";
import MatchParent from "../../../stacks/MatchParent";

const output = ({svgSize, svgSrc, pngSrc, onDownload}) => {
    return svgSrc ? <VStack>
        <MatchParent>
            <VStack>
                <Button variant="contained" onClick={onDownload} fullWidth>
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
                    Size: {svgSize}
                </Typography>
            </VStack>
        </MatchParent>
    </VStack> : null;
}

export default output;