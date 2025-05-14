import {Button} from "@mui/material";
import React from "react";
import VStack from "../../../stacks/VStack";

const Actions = ({onSvgChange, onPngChange}) => {
    return (
        <VStack>
            <Button variant="contained" component="label">
                Upload SVG
                <input hidden type="file" accept=".svg" onChange={onSvgChange}/>
            </Button>

            <Button variant="contained" component="label">
                Upload PNG
                <input hidden type="file" accept=".png" onChange={onPngChange}/>
            </Button>
        </VStack>
    )
};

export default Actions;