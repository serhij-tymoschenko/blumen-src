import {Box, Button} from "@mui/material";
import React from "react";

const Actions = ({onSvgChange, onPngChange}) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button variant="contained" component="label">
                Upload SVG
                <input hidden type="file" accept=".svg" onChange={onSvgChange} />
            </Button>

            <Button variant="contained" component="label">
                Upload PNG
                <input hidden type="file" accept=".png" onChange={onPngChange} />
            </Button>
        </Box>
    )
};

export default Actions;