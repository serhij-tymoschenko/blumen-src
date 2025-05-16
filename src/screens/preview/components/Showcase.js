import React from "react";
import {TraitPreview} from "../../components/TraitPreview";
import {replaceColors, toSvgFile} from "../../../utils/helpers/SvgHelper";
import Hex from "./Hex";
import {combine} from "../../../utils/combiner/Combiner";
import {Stack} from "@mui/material";

const Showcase = ({items, bodyColor, hairColor, eyesColor}) => {
    let localItems = [
        items[9],
        items[6],
        items[3],
        items[2],
        items[0],
        items[1],
        items[5],
        items[4],
        items[7],
        items[8],
    ].filter(Boolean)

    localItems = replaceColors(localItems, bodyColor, hairColor, eyesColor);
    const localTraitsSvg = combine(localItems.slice(1), 552, 736);

    let showcaseItem = combine(localItems, 552, 736, 0)
    showcaseItem = toSvgFile(showcaseItem);

    return (
        <Stack
            sx={{
                height: '100%',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
            }}
            spacing={1}
        >
            <Hex traitSvg={localTraitsSvg}/>
            <TraitPreview
                width={207}
                height={276}
                borderRadius={5}
                item={showcaseItem}
            />
        </Stack>
    );
};

export default Showcase;