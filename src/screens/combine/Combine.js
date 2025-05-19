import React, {useEffect, useState} from 'react';
import Actions from "./components/Actions";
import Output from "./components/Output";
import correct from "../../utils/svg/corrector/Corrector";
import {combineTogether, insertPngIntoSvg} from "../../utils/svg/CombineHelper";
import {TraitPreview} from "../components/TraitPreview";
import {toSvgFile} from "../../utils/svg/SvgHelper";
import {Box, Stack} from "@mui/material";

const Combine = ({setOpenSnackbar, setSnackbarMessage}) => {
    const [svgSrc, setSvgSrc] = useState(null);
    const [svgName, setSvgName] = useState(null);
    const [pngSrc, setPngSrc] = useState(null);
    const [svg, setSvg] = useState(null);

    const REQUIRED_RATIO = 380 / 600;
    const hasExactRatio = (width, height) => {
        return (width / height) === REQUIRED_RATIO;
    };

    const onPngReset = () => {
        setPngSrc(null);
    }

    useEffect(() => {
        if (!svgSrc) {
            setSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1" viewBox="0 0 1 1"></svg>`);
            return;
        }
        const result = pngSrc
            ? combineTogether([svgSrc, pngSrc], 380, 600)
            : combineTogether([svgSrc], 380, 600);

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

        const svg = toSvgFile(output);

        const a = document.createElement('a');
        a.href = svg;
        a.download = pngSrc ? `combined-${svgName}` : `corrected-${svgName}`;
        a.click();
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Stack spacing={2} direction="row">
                <Stack spacing={2} alignSelf={'center'}
                >
                    <Actions
                        onSvgChange={onSvgChange}
                        onPngChange={onPngChange}
                        pngSrc={pngSrc}
                        onPngReset={onPngReset}
                    />
                    <Output
                        svg={svg}
                        svgSrc={svgSrc}
                        pngSrc={pngSrc}
                        onDownload={onDownload}
                    />
                </Stack>
                <TraitPreview key={svg} item={toSvgFile(svg)} width={285} height={450}/>
            </Stack>
        </Box>
    );
};

export default Combine;
