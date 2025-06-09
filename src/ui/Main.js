import React, {useState} from "react";
import ScreenType from "../data/models/ScreenType";
import Combine from "./screens/combine/Combine";
import Preview from "./screens/preview/Preview";
import {Alert, Box, Snackbar} from "@mui/material";
import Bottom from "./components/Bottom";
import TopAppBar from "./components/TopAppBar";

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

    const screen = (activeButton === ScreenType.SVG_TOOL)
        ? <Combine setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage}/>
        : <Preview setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage}/>


    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <TopAppBar
                onButtonClick={onButtonClick}
            />
            {screen}
            <Bottom/>
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