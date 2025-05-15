import React, {useState} from "react";
import {TraitPreview} from "../../components/TraitPreview";
import {replaceColors, toSvgFile} from "../../../utils/helpers/SvgHelper";
import GetTraitsSvg from "../../../utils/combiner/GetTraitsSvg";

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

    let showcaseItems = [localItems[0], {src: traitsSvg, traitWidth: 272, traitHeight: 368}].filter(Boolean);
    showcaseItems = toSvgFile(showcaseItems);

    const handleDownload = async () => {
        const blob = new Blob([traitsSvg], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `combined.svg`
        a.click();
    };

    return (
        <div style={{
            width: 272,
            textAlign: 'center',
            position: 'relative'
        }}>
            <div style={{marginBottom: 6, fontSize: 14, color: '#333'}}>
                Showcase
            </div>
            <TraitPreview
                width={272}
                height={368}
                borderRadius={5}
                layers={showcaseItems}
            />
            <GetTraitsSvg items={localItems} setTraitsSvg={setTraitsSvg}/>
        </div>
    );
};

export default Showcase;