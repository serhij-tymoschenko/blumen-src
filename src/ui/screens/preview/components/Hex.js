import {toSvgFile} from "../../../../utils/svg/SvgHelper";

const Hex = ({hex}) => {
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
