import {Box, Button, Stack} from "@mui/material";
import React from "react";
import RefreshIcon from "@mui/icons-material/Refresh";

const Actions = ({onSvgChange, onPngChange, pngSrc, onPngReset}) => {
    return (
        <Stack spacing={2} direction="column">
            <Box alignSelf={"flex-end"}>
                <Button variant="contained" component="label">
                    Upload SVG
                    <input hidden type="file" accept=".svg" onChange={onSvgChange}/>
                </Button>
            </Box>

            <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
                <Button
                    variant="outlined"
                    onClick={onPngReset}
                    style={{
                        minWidth: 0,
                        width: 30,
                        height: 30,
                        padding: 0,
                        borderRadius: '50%',
                        border: '1px solid #ccc',
                        visibility: pngSrc ? 'visible' : 'hidden'
                    }}>
                    <RefreshIcon fontSize="small"/>
                </Button>

                <Button variant="contained" component="label">
                    Upload PNG
                    <input hidden type="file" accept=".png" onChange={onPngChange}/>
                </Button>
            </Stack>
        </Stack>
    )
};

export default Actions;