import ColorPicker from "../../components/ColorPicker";
import VStack from "../../../stacks/VStack";

const ColorSection = ({bodyColor, setBodyColor, hairColor, setHairColor, eyesColor, setEyesColor}) => {
    return (
        <VStack>
            <ColorPicker color={bodyColor} setColor={setBodyColor} title={"Body:"}/>
            <ColorPicker color={hairColor} setColor={setHairColor} title={"Hair:"}/>
            <ColorPicker color={eyesColor} setColor={setEyesColor} title={"Eyes:"}/>
        </VStack>
    )
}

export default ColorSection;