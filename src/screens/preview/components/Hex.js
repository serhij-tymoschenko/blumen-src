import background from "../../../res/raw/background.svg";
import hex from "../../../res/raw/hex.svg";
import {useEffect, useState} from "react";
import {toPngSrc} from "../../../utils/helpers/SvgHelper";

const Hex = ({traitSvg}) => {

    const [svg, setSvg] = useState(null);

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
                    const blob = new Blob([clippedImageSvg], { type: "image/svg+xml" })
                    const svgDataUrl = URL.createObjectURL(blob)
                    setSvg(svgDataUrl);
                }
            })
            .catch((err) => {
                console.error("Error generating PNG:", err);
                if (mounted) setSvg(null);
            });

        return () => {
            mounted = false;
        };
    }, [traitSvg]);

    return (
        <div style={{position: "relative", width: 120, height: 124.5, margin: "0 auto"}}>
            <div style={{position: "relative", width: 120, height: 124.5}}>
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

                {svg && (
                    <img
                        src={svg}
                        style={{
                            position: "absolute",
                            top: "44%",
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
        </div>
    );
};

export default Hex;
