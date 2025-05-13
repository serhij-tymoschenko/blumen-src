import {Box, Typography} from "@mui/material";
import React from "react";

export const TraitPreview = ({
                                 width = 190,
                                 height = 300,
                                 traitWidth = 190,
                                 traitHeight = 300,
                                 borderRadius = 0,
                                 bottom,
                                 top,
                             }) => (
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
                            objectFit: 'contain',
                            borderRadius,
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
                            width: traitWidth,
                            height: traitHeight,
                            objectFit: 'contain',
                            pointerEvents: 'none',
                            borderRadius,
                        }}
                    />
                )}
            </>
        )}
    </Box>
);
