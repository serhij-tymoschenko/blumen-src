import {Box, Stack} from "@mui/material";
import ColorSection from "./ColorSection";
import ZipDownload from "./ZipDownload";

const SideMenu = ({
                      bodyColor,
                      setBodyColor,
                      hairColor,
                      setHairColor,
                      eyesColor,
                      setEyesColor,
                      snooItems,
                      showcase,
                      hex
                  }) => {
    return <>
        <Stack
            direction="column"
        >
            <Box sx={{flexGrow: 1}}/>

            <Box sx={{flexGrow: 0}}>
                <ColorSection
                    bodyColor={bodyColor}
                    setBodyColor={setBodyColor}
                    hairColor={hairColor}
                    setHairColor={setHairColor}
                    eyesColor={eyesColor}
                    setEyesColor={setEyesColor}
                />
            </Box>

            <Box sx={{flexGrow: 1}}/>

            <Box sx={{flexGrow: 0}}>
                <ZipDownload snooItems={snooItems} hex={hex} showcase={showcase}/>
            </Box>
        </Stack>
    </>
}

export default SideMenu;