import './App.css';
import PageHeader from "./screens/components/PageHeader";
import {useState} from "react";
import ButtonType from "./data/models/ButtonType";
import Combine from "./screens/combine/Combine";
import {Box} from "@mui/material";

function App() {
    const [activeButton, setActiveButton] = useState(ButtonType.COMBINE);
    const onButtonClick = (buttonType) => {
        setActiveButton(buttonType);
    };

    const screen = (activeButton === ButtonType.COMBINE)
        ? <Combine/>
        : <div></div>


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
