import ColorPicker from "../../components/ColorPicker";
import {Button, Stack} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import React from "react";

const ColorSection = ({bodyColor, setBodyColor, hairColor, setHairColor, eyesColor, setEyesColor}) => {
    const resetColors = () => {
        setBodyColor('#00FF00')
        setHairColor('#0000FF')
        setEyesColor('#FFFF00')
    }

    return (
        <Stack spacing={2} direction="column">
            <ColorPicker color={bodyColor} setColor={setBodyColor}/>
            <ColorPicker color={hairColor} setColor={setHairColor}/>
            <ColorPicker color={eyesColor} setColor={setEyesColor}/>
            <Button
                variant="outlined"
                onClick={resetColors}
                style={{
                    minWidth: 0,
                    width: 30,
                    height: 30,
                    padding: 0,
                    borderRadius: '50%',
                    border: '1px solid #ccc',
                }}
            >
                <RefreshIcon fontSize="small"/>
            </Button>
        </Stack>
    )
}

export default ColorSection;