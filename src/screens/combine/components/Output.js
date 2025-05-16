import {Button, Typography} from "@mui/material";
import React from "react";
import VStack from "../../../stacks/VStack";
import MatchParent from "../../../stacks/MatchParent";
import {formatSize, getSvgSize} from "../../../utils/size/SvgSize";
import {toSvgFile} from "../../../utils/helpers/SvgHelper";

const output = ({svg, svgSrc, pngSrc, onDownload}) => {
    const svgSize = getSvgSize(svg)

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
                    Size: {formatSize(svgSize)}
                </Typography>
            </VStack>
        </MatchParent>
    </VStack> : null;
}

export default output;