import ColorPicker from "../../components/ColorPicker";
import {Box} from "@mui/material";
import VStack from "../../../stacks/VStack";

const ColorSection = () => {
    return (
        <VStack>
            <ColorPicker/>
            <ColorPicker/>
            <ColorPicker/>
        </VStack>
    )
}

export default ColorSection;