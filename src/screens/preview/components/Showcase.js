import React, {useState} from "react";
import {TraitPreview} from "../../components/TraitPreview";
import {replaceColors, toSvgFile} from "../../../utils/helpers/SvgHelper";
import GetTraitsSvg from "../../../utils/combiner/GetTraitsSvg";
import VStack from "../../../stacks/VStack";
import Hex from "./Hex";

const Showcase = ({items, bodyColor, hairColor, eyesColor}) => {
    const [traitsSvg, setTraitsSvg] = useState('<svg></svg>');

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
        .map(item => ({
            src: item.src,
            traitWidth: item.traitWidth * 2,
            traitHeight: item.traitHeight * 2
        }));

    localItems = replaceColors(localItems, bodyColor, hairColor, eyesColor);

    let showcaseItems = [localItems[0], {src: traitsSvg, traitWidth: 207, traitHeight: 276}].filter(Boolean);
    showcaseItems = toSvgFile(showcaseItems);

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
            <GetTraitsSvg items={localItems} setTraitsSvg={setTraitsSvg}/>
            <VStack>
                <Hex traitSvg={traitsSvg}/>
                <TraitPreview
                    width={207}
                    height={276}
                    borderRadius={5}
                    layers={showcaseItems}
                />
            </VStack>
        </div>
    );
};

export default Showcase;