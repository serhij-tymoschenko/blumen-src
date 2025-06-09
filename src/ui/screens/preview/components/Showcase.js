import React from "react";
import {TraitPreview} from "../../../components/TraitPreview";
import Hex from "./Hex";
import {Stack} from "@mui/material";
import {toSvgFile} from "../../../../utils/svg/SvgHelper";

const Showcase = ({showcase, hex}) => {
    return (
        <Stack
            sx={{
                height: '100%',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
            }}
            spacing={1}
        >
            <Hex hex={hex}/>
            <TraitPreview
                width={207}
                height={276}
                borderRadius={5}
                item={toSvgFile(showcase)}
            />
        </Stack>
    );
};

export default Showcase;