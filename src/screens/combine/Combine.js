import React, {useState} from 'react';
import Actions from "./components/Actions";
import Output from "./components/Output";
import correct from "../../utils/corrector/Corrector";
import {combine} from "../../utils/combiner/Combiner";
import {TraitPreview} from "../components/TraitPreview";
import Centered from "../../stacks/Centered";
import HStack from "../../stacks/HStack";
import VStack from "../../stacks/VStack";

const Combine = ({setOpenSnackbar, setSnackbarMessage}) => {
    const [svgSrc, setSvgSrc] = useState({src: null, traitWidth: 0, traitHeight: 0});
    const [svgName, setSvgName] = useState(null);
    const [pngSrc, setPngSrc] = useState({src: null, traitWidth: 0, traitHeight: 0});
    const [svgSize, setSvgSize] = useState(0);
    const [pngSize, setPngSize] = useState(0);
    const [svg, setSvg] = useState(null);

    const REQUIRED_RATIO = 380 / 600;
    const hasExactRatio = (width, height) => {
        return (width / height) === REQUIRED_RATIO;
    };

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
                    setSvgSize(file.size);
                    setSvgName(file.name);
                    setSvgSrc({
                        src: reader.result,
                        traitWidth: 190,
                        traitHeight: 300
                    });
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);

            const textReader = new FileReader();

            textReader.onloadend = () => {
                setSvg(correct(textReader.result));
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
                    setPngSize(file.size);
                    setPngSrc({src: reader.result, traitWidth: 380, traitHeight: 600});

                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const onDownload = () => {
        let output = pngSrc ? combine(svg, pngSrc) : svg;
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
                        svgSize={svgSize}
                        pngSize={pngSize}
                        svgSrc={svgSrc}
                        pngSrc={pngSrc}
                        onDownload={onDownload}
                    />
                </VStack>
                <TraitPreview layers={[svgSrc, pngSrc] || ""}/>
            </HStack>
        </Centered>
    );
};

export default Combine;
