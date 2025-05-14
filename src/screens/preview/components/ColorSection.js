import ColorPicker from "../../components/ColorPicker";
import {Box} from "@mui/material";

const ColorSection = () => {
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <ColorPicker/>
            <ColorPicker/>
            <ColorPicker/>
        </Box>
    )
}

export default ColorSection;