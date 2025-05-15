import React from "react";
import {TraitPreview} from "../../components/TraitPreview";
import {replaceColors, toSvgFile} from "../../../utils/helpers/SvgHelper";
import VStack from "../../../stacks/VStack";
import Hex from "./Hex";
import {combine} from "../../../utils/combiner/Combiner1";

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
        <div style={{
            width: 207,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            position: "relative",
        }}>
            <VStack>
                <Hex traitSvg={localTraitsSvg}/>
                <TraitPreview
                    width={207}
                    height={276}
                    borderRadius={5}
                    item={showcaseItem}
                />
            </VStack>
        </div>
    );
};

export default Showcase;