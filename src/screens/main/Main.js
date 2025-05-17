import React, {useState} from "react";
import ButtonType from "../../data/models/ButtonType";
import Combine from "../combine/Combine";
import Preview from "../preview/Preview";
import {Alert, Box, Snackbar} from "@mui/material";
import PageHeader from "../components/PageHeader";

const Main = () => {
    const [activeButton, setActiveButton] = useState(ButtonType.PREVIEW);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const onButtonClick = (buttonType) => {
        setActiveButton(buttonType);
    };

    const screen = (activeButton === ButtonType.COMBINE)
        ? <Combine setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage}/>
        : <Preview setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage}/>


    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <PageHeader
                activeButton={activeButton}
                onButtonClick={onButtonClick}
            />
            {screen}
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
}

export default Main;