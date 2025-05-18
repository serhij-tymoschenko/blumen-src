import {toPngSrc, toSvgFile} from "../../../utils/helpers/SvgHelper";
import {getHexSrc} from "../../../utils/SvgSrc";

const Hex = ({traitSvg, hex, setHex}) => {
    toPngSrc(traitSvg)
        .then((base64Png) => {
            setHex(getHexSrc(base64Png));
        })

    return (
        <div style={{position: "relative", width: 120, height: 128.4}}>
            <img
                width={120}
                height={128.4}
                src={toSvgFile(hex)}
            />
        </div>
    );
};

export default Hex;
