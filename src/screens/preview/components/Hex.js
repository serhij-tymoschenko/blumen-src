import {useEffect, useState} from "react";
import SvgBlobToCroppedPng, {toSvgBlop} from "../../../utils/helpers/SvgHelper";
import background from "../../../res/raw/background.svg";
import hex from "../../../res/raw/hex.svg";

const Hex = ({traitSvg}) => {
    const [base64Svg, setBase64Svg] = useState(null);
    const [pngBlob, setPngBlob] = useState(null);

    useEffect(() => {
        if (!traitSvg) return;

        const processImage = async () => {

            const svgBlob = toSvgBlop({src: traitSvg});
            if (!svgBlob) throw new Error("Failed to create SVG blob");

        };

        processImage();
    }, [traitSvg]);

    useEffect(() => {
        if (!pngBlob) return;

        const convertToFinalSvg = async () => {
            const pngSrc = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(pngBlob);
            });

            // Increased height by 7% (from 120 to ~128.4)
            const clippedImageSvg = `
                    <svg width="100%" height="107%" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <clipPath id="clip-shape">
                                <path d="M120 0H0V96H22.0602C22.5169 98.2109 23.896 100.155 25.8949 101.309L56
                                118.691C58.4752 120.12 61.5248 120.12 64 118.691L94.1051 101.309C96.104 100.155 97.4831
                                98.2109 97.9398 96H120V0Z" />
                            </clipPath>
                        </defs>
                        <image href="${pngSrc}" clip-path="url(#clip-shape)" height="100%" width="100%" preserveAspectRatio="xMidYMid slice" />
                    </svg>
                `;

            console.log(pngSrc)

            const base64 = window.btoa(unescape(encodeURIComponent(clippedImageSvg)));
            setBase64Svg(`data:image/svg+xml;base64,${base64}`);
        };

        convertToFinalSvg();
    }, [pngBlob]);

    return (
        <>
            {traitSvg && (
                <SvgBlobToCroppedPng
                    svgBlob={toSvgBlop({src: traitSvg})}
                    setPngBlob={setPngBlob}
                />
            )}

            <div style={{
                position: "relative",
                width: 120,
                height: 124.5,
                margin: "0 auto",
            }}>
                <img
                    src={background}
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "114px",
                        height: "114px",
                        objectFit: "contain",
                        pointerEvents: "none",
                    }}
                    alt="background"
                />

                <img
                    src={hex}
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "114px",
                        height: "114px",
                        objectFit: "contain",
                        pointerEvents: "none",
                    }}
                    alt="hex border"
                />

                {base64Svg && (
                    <img
                        src={base64Svg}
                        style={{
                            position: "absolute",
                            top: "44%", // 43 on site
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "114px",
                            height: "114px",
                            objectFit: "contain",
                            pointerEvents: "none",
                        }}
                        alt="clipped trait"
                    />
                )}
            </div>
        </>
    );
};

export default Hex;