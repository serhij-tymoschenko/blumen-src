import React, {useState} from 'react';
import {Alert, Box, Snackbar, Typography} from '@mui/material';
import Actions from "./components/Actions";
import Output from "./components/Output";
import convert from "../../utils/normalizer/Converter";
import {combine} from "../../utils/combiner/Combiner";

const Combine = () => {
    const [svgSrc, setSvgSrc] = useState(null);
    const [pngSrc, setPngSrc] = useState(null);
    const [svgSize, setSvgSize] = useState(0);
    const [pngSize, setPngSize] = useState(0);
    const [svg, setSvg] = useState(null);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const REQUIRED_RATIO = 380 / 600;
    const hasExactRatio = (width, height) => {
        return (width / height) === REQUIRED_RATIO;
    };

    const onSvgChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'image/svg+xml') {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    if (!hasExactRatio(img.width, img.height)) {
                        setSnackbarMessage('SVG must have an exact 380:600 aspect ratio');
                        setOpenSnackbar(true);
                        return;
                    }
                    setSvgSize(file.size);
                    setSvgSrc(reader.result);
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);

            const textReader = new FileReader();

            textReader.onloadend = () => {
                setSvg(convert(textReader.result));
            };
            textReader.readAsText(file);
        }
    };

    const onPngChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'image/png') {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    if (!hasExactRatio(img.width, img.height)) {
                        setSnackbarMessage('PNG must have an exact 380:600 aspect ratio');
                        setOpenSnackbar(true);
                        return;
                    }
                    setPngSize(file.size);
                    setPngSrc(reader.result);
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const onDownload = () => {
        let output = pngSrc ? combine(svg, pngSrc) : svg;
        const blob = new Blob([output], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.svg';
        a.click();
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 0,
                minWidth: 0,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    alignItems: 'center',
                }}
            >
                {/* Left Column: File Inputs */}
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                    <Actions
                        onSvgChange={onSvgChange}
                        onPngChange={onPngChange}
                        onDownload={onDownload}
                    />
                    <Output
                        svgSize={svgSize}
                        pngSize={pngSize}
                        svgSrc={svgSrc}
                        pngSrc={pngSrc}
                        onDownload={onDownload}
                    />
                </Box>

                {/* Right Column: Combined Preview */}
                <Box
                    sx={{
                        width: 190,
                        height: 300,
                        border: '2px dashed #ccc',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f9f9f9',
                    }}
                >
                    {!svgSrc && !pngSrc ? (
                        <Typography variant="body2" color="textSecondary">
                            Combined Preview
                        </Typography>
                    ) : (
                        <>
                            {svgSrc && (
                                <img
                                    src={svgSrc}
                                    alt="SVG Background"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                    }}
                                />
                            )}
                            {pngSrc && (
                                <img
                                    src={pngSrc}
                                    alt="PNG Overlay"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        pointerEvents: 'none',
                                    }}
                                />
                            )}
                        </>
                    )}
                </Box>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{width: '100%'}}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Combine;
