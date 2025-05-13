import PreviewGrid from "./components/PreviewGrid";
import {Alert, Box, Snackbar} from "@mui/material";
import Actions from "../combine/components/Actions";
import Output from "../combine/components/Output";
import React, {useState} from "react";

const Preview = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return(
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

                {/* Right Column: Combined TraitPreview */}
                <PreviewGrid/>
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
    )
}

export default Preview;