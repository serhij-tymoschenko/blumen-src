import React, {useEffect, useState} from 'react';
import Actions from "./components/Actions";
import Output from "./components/Output";
import correct from "../../utils/corrector/Corrector";
import {combine, insertPngIntoSvg} from "../../utils/combiner/Combiner";
import {TraitPreview} from "../components/TraitPreview";
import Centered from "../../stacks/Centered";
import HStack from "../../stacks/HStack";
import VStack from "../../stacks/VStack";
import {toSvgFile} from "../../utils/helpers/SvgHelper";

const Combine = ({setOpenSnackbar, setSnackbarMessage}) => {
    const [svgSrc, setSvgSrc] = useState(null);
    const [svgName, setSvgName] = useState(null);
    const [pngSrc, setPngSrc] = useState(null);
    const [svg, setSvg] = useState(null);

    const REQUIRED_RATIO = 380 / 600;
    const hasExactRatio = (width, height) => {
        return (width / height) === REQUIRED_RATIO;
    };

    useEffect(() => {
        if (!svgSrc) {
            setSvg(null);
            return;
        }
        const result = pngSrc
            ? combine([svgSrc, pngSrc], 380, 600)
            : combine([svgSrc], 380, 600);

        setSvg(result);
    }, [svgSrc, pngSrc]);

    const onSvgChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'image/svg+xml') {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    if (!hasExactRatio(img.width, img.height)) {
                        setSnackbarMessage('SVG must have an exact 380:600 aspect ratio');
                        setOpenSnackbar(true);
                        return;
                    }
                    setSvgName(file.name);
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);

            const textReader = new FileReader();
            textReader.onloadend = () => {
                setSvgSrc(correct(textReader.result));
            };
            textReader.readAsText(file);
        }
    };

    const onPngChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'image/png') {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    if (!hasExactRatio(img.width, img.height)) {
                        setSnackbarMessage('PNG must have an exact 380:600 aspect ratio');
                        setOpenSnackbar(true);
                        return;
                    }
                    setPngSrc(reader.result);
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const onDownload = () => {
        const output = (pngSrc) ?
            insertPngIntoSvg(svgSrc, pngSrc)
            : svgSrc

        const blob = new Blob([output], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = pngSrc ? `combined-${svgName}` : `corrected-${svgName}`;
        a.click();
    };

    return (
        <Centered>
            <HStack>
                <VStack>
                    <Actions
                        onSvgChange={onSvgChange}
                        onPngChange={onPngChange}
                        onDownload={onDownload}
                    />
                    <Output
                        svg={svg}
                        svgSrc={svgSrc}
                        pngSrc={pngSrc}
                        onDownload={onDownload}
                    />
                </VStack>
                {svg && <TraitPreview key={svg} item={toSvgFile(svg)} width={380} height={600}/>}
            </HStack>
        </Centered>
    );
};

export default Combine;
