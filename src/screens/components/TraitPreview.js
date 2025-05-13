import {Box, Typography} from "@mui/material";
import React from "react";

export const TraitPreview = ({
                     width = 190,
                     height = 300,
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
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
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
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
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
