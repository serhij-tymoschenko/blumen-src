import React from "react";
import {TraitPreview} from "../../components/TraitPreview";
import {replaceColors, toSvgFile} from "../../../utils/helpers/SvgHelper";
import Hex from "./Hex";
import {combineTogether} from "../../../utils/combiner/Combiner";
import {Stack} from "@mui/material";

const Showcase = ({items, bodyColor, hairColor, eyesColor, hex, setHex, setShowcase}) => {
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
    ]

    localItems = replaceColors(localItems, bodyColor, hairColor, eyesColor);
    const localTraitsSvg = combineTogether(localItems.slice(1), 552, 736);

    let showcaseItem = combineTogether(localItems, 552, 736, 0)
    setShowcase(showcaseItem)
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
            <Hex traitSvg={localTraitsSvg} setHex={setHex} hex={hex}/>
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