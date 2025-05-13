import './App.css';
import PageHeader from "./screens/components/PageHeader";
import {useState} from "react";
import ButtonType from "./data/models/ButtonType";
import Combine from "./screens/combine/Combine";
import {Box} from "@mui/material";
import Preview from "./screens/preview/Preview";

function App() {
    const [activeButton, setActiveButton] = useState(ButtonType.PREVIEW);
    const onButtonClick = (buttonType) => {
        setActiveButton(buttonType);
    };

    const screen = (activeButton === ButtonType.COMBINE)
        ? <Combine/>
        : <Preview/>


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <PageHeader title="RCA utils"
                        activeButton={activeButton}
                        onButtonClick={onButtonClick}
            />
            {screen}
        </Box>
    );
}

export default App;
