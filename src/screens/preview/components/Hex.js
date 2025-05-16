import background from "../../../res/raw/background.svg";
import hex from "../../../res/raw/hex.svg";
import {useEffect, useRef, useState} from "react";
import {toPngSrc} from "../../../utils/helpers/SvgHelper";
import * as htmlToImage from 'html-to-image';

const Hex = ({traitSvg, setHexUrl}) => {
    const [svg, setSvg] = useState(null);
    const captureRef = useRef(null);

    useEffect(() => {
        if (!traitSvg) {
            setSvg(null);
            return;
        }

        let mounted = true;

        toPngSrc(traitSvg)
            .then((base64Png) => {
                if (mounted) {
                    const clippedImageSvg = `
                    <svg width="100%" height="107%" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <clipPath id="clip-shape">
                                <path d="M120 0H0V96H22.0602C22.5169 98.2109 23.896 100.155 25.8949 101.309L56
                                118.691C58.4752 120.12 61.5248 120.12 64 118.691L94.1051 101.309C96.104 100.155 97.4831
                                98.2109 97.9398 96H120V0Z" />
                            </clipPath>
                        </defs>
                        <image href="${base64Png}" clip-path="url(#clip-shape)" height="100%" width="100%" preserveAspectRatio="xMidYMid slice" />
                    </svg>
                `;
                    const blob = new Blob([clippedImageSvg], {type: "image/svg+xml"})
                    const svgDataUrl = URL.createObjectURL(blob)
                    setSvg(svgDataUrl);
                }
            })

        return () => {
            mounted = false;
        };
    }, [traitSvg]);

    const handleOnLoad = () => {
        htmlToImage.toPng(captureRef.current)
            .then((dataUrl) => {
                setHexUrl(dataUrl);
            })
    }

    return (
        <div style={{position: "relative", width: 120, height: 124.5}}>
            <svg
                ref={captureRef}
                width="120"
                height="124.5"
                viewBox="0 -7 120 131.5"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                }}
            >
                <image
                    href={background}
                    x="0"
                    y="2.25"
                    width="120"
                    height="120"
                    preserveAspectRatio="xMidYMid meet"
                />

                <image
                    href={hex}
                    x="0"
                    y="2.25"
                    width="120"
                    height="120"
                    preserveAspectRatio="xMidYMid meet"
                />

                {svg && (
                    <image
                        href={svg}
                        x="0"
                        y="-6.465"
                        width="120"
                        height="120"
                        preserveAspectRatio="xMidYMid meet"
                        onLoad={handleOnLoad}
                    />
                )}
            </svg>
        </div>
    );
};

export default Hex;
