import {Button, Stack} from "@mui/material";
import React from "react";

const Actions = ({onSvgChange, onPngChange}) => {
    return (
        <Stack spacing={2} direction="column">
            <Button variant="contained" component="label">
                Upload SVG
                <input hidden type="file" accept=".svg" onChange={onSvgChange}/>
            </Button>

            <Button variant="contained" component="label">
                Upload PNG
                <input hidden type="file" accept=".png" onChange={onPngChange}/>
            </Button>
        </Stack>
    )
};

export default Actions;