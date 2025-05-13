import PreviewGrid from "./components/PreviewGrid";
import {Alert, Box, Paper, Snackbar, Typography} from "@mui/material";


import React, {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";

const Preview = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [items, setItems] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        const newItems = acceptedFiles.map((file) => ({
            top: URL.createObjectURL(file),
            bottom: '', // You can allow custom selection logic
        }));

        setItems((prev) => [...prev, ...newItems]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: true,
    });

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return(
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


                {/* Right column (grid of image previews) */}
                <PreviewGrid />
            </Box>

            {/* Snackbar feedback */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Preview;