import React from "react";
import {TraitPreview} from "../../components/TraitPreview";
import {replaceColors, toSvgFile} from "../../../utils/helpers/SvgHelper";

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
    ].filter(Boolean);

    localItems = localItems.map(item => ({
        src: item.src,
        traitWidth: item.traitWidth * 2,
        traitHeight: item.traitHeight * 2
    }));
    localItems = replaceColors(localItems, bodyColor, hairColor, eyesColor)
    localItems = toSvgFile(localItems)

    return (
        <div style={{width: 272, textAlign: 'center'}}>
            {/* Label above, NOT draggable */}
            <div
                style={{
                    marginBottom: 6,
                    fontSize: 14,
                    color: '#333',
                }}
            >
                Showcase
            </div>
        <TraitPreview
            width={272}
            height={368}
            borderRadius={5}
            layers={localItems}/>
        </div>
    );
}

export default Showcase;