import React, {useState} from "react";
import ScreenType from "../../data/models/ScreenType";
import Combine from "../combine/Combine";
import Preview from "../preview/Preview";
import {Alert, Box, Snackbar} from "@mui/material";
import Header from "../components/Header";

const Main = () => {
    const [activeButton, setActiveButton] = useState(ScreenType.PREVIEW);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const onButtonClick = (buttonType) => {
        setActiveButton(buttonType);
    };

    const screen = (activeButton === ScreenType.COMBINE)
        ? <Combine setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage}/>
        : <Preview setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage}/>


    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <Header
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