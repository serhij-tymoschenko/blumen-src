import PreviewGrid from "./components/PreviewGrid";
import {Alert, Box, Paper, Snackbar, Typography} from "@mui/material";


import React, {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";
import Showcase from "./components/Showcase";
import ColorSection from "./components/ColorSection";
import {objectUrlToBlob} from "../../utils/helpers/ObjectHelper";

const Preview = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [items, setItems] = useState([]);



    const getImageData = (file) => {
        return new Promise((resolve) => {
            const img = new Image();
            const objectUrl = URL.createObjectURL(file);

            img.onload = async () => {
                let imgWidth, imgHeight;

                if (img.width === 552) {
                    imgWidth = 138;
                    imgHeight = 184;
                } else {
                    imgWidth = 95;
                    imgHeight = 150;
                }


                const readBlob = (blob, isSvg) => {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.onerror = reject;
                        if (isSvg) {
                            reader.readAsText(blob);
                        } else {
                            reader.readAsDataURL(blob);
                        }
                    });
                };

// Usage

                const blob = await objectUrlToBlob(objectUrl);
                const isSvg = blob.type === 'image/svg+xml'; // Check if the image is SVG
                const localSrc = await readBlob(blob, isSvg);

                resolve({
                    src: localSrc,
                    traitWidth: imgWidth,
                    traitHeight: imgHeight,
                });
            };

            img.src = objectUrl;
        });
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        // Wait for all images to be processed
        const newItems = await Promise.all(
            acceptedFiles.map((file) => getImageData(file))
        );

        setItems(newItems);
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {'image/*': []},
        multiple: true,
    });

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column', // stack vertically
                alignItems: 'center',
                justifyContent: 'flex-start',
                p: 2,
            }}
        >
            {/* Drag-and-Drop Upload Area */}
            <Paper
                {...getRootProps()}
                elevation={3}
                sx={{
                    width: '100%',
                    maxWidth: 800,
                    border: '2px dashed #aaa',
                    padding: 4,
                    textAlign: 'center',
                    backgroundColor: isDragActive ? '#f0f0f0' : '#fafafa',
                    cursor: 'pointer',
                    mb: 4, // space below
                }}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <Typography>Drop the images here ...</Typography>
                ) : (
                    <Typography>Drag and drop images here, or click to select files</Typography>
                )}
            </Paper>

            {/* Main content row: inputs + preview */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    width: '100%',
                    maxWidth: 1200,
                }}
            >
                {/* Left column (file inputs or controls) */}
                <Showcase items={items}/>

                {/* Right column (grid of image previews) */}
                <PreviewGrid items={items} setItems={setItems}/>

                <ColorSection/>
            </Box>

            {/* Snackbar feedback */}
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
    )
}

export default Preview;