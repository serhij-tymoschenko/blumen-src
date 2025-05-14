import {Box, Typography} from "@mui/material";
import React from "react";

export const TraitPreview = ({
                                 width = 190,
                                 height = 300,
                                 traitWidth = 190,
                                 traitHeight = 300,
                                 topWidth = null,
                                 topHeight = null,
                                 borderRadius = 0,
                                 bottom,
                                 top,
                             }) => {
    const [localTraitWidth, localTraitHeight] = (traitWidth !== 138 && traitHeight !== 184) ? [traitWidth, traitHeight] : [95, 150];

    return(
        <Box
            sx={{
                width,
                height,
                border: '2px dashed #ccc',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f9f9f9',
                borderRadius,
            }}
        >
            {!bottom && !top ? (
                <Typography variant="body2" color="textSecondary">
                    Combined Preview
                </Typography>
            ) : (
                <>
                    {bottom && (
                        <img
                            src={bottom}
                            alt="SVG Background"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: traitWidth,
                                height: traitHeight,
                                objectFit: 'scale-down'
                            }}
                        />
                    )}
                    {top && (
                        <img
                            src={top}
                            alt="PNG Overlay"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: localTraitWidth,
                                height: localTraitHeight,
                                objectFit: 'scale-down',
                                pointerEvents: 'none'
                            }}
                        />
                    )}
                </>
            )}
        </Box>
    );
}
