import AppBar from '@mui/material/AppBar';
import {Box, Button, Stack, Typography} from "@mui/material";
import logo from "../../res/raw/logo.png";
import ScreenType from "../../data/models/ScreenType";

const TopAppBar = ({onButtonClick}) => {
    return <>
        <AppBar position="static" color="success">
            <Box position="relative" width="100vw">
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                >
                    <Typography variant="h6">Blumen</Typography>
                    <img src={logo} width={32} height={32}/>
                </Stack>

                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    position="absolute"
                    left={16}
                    top="50%"
                    sx={{transform: "translateY(-50%)"}}
                >
                    <Button onClick={() => onButtonClick(ScreenType.SVG_TOOL)} color={"inherit"}>
                        Svg Tool
                    </Button>
                    <Button onClick={() => onButtonClick(ScreenType.PREVIEW)} color={"inherit"}>
                        Preview
                    </Button>
                </Stack>
            </Box>
        </AppBar>
    </>
}

export default TopAppBar;