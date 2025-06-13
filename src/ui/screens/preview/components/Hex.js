import {toSvgFile} from "../../../../utils/svg/SvgHelper";

const Hex = ({hex}) => {
    return (
        <div style={{position: "relative", width: 120, height: 120}}>
            <img
                width={120}
                height={120}
                src={toSvgFile(hex)}
            />
        </div>
    );
};

export default Hex;
