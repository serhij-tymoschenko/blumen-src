import './App.css';
import PageHeader from "./screens/components/PageHeader";
import {useState} from "react";
import ButtonType from "./data/models/ButtonType";

function App() {
    const [activeButton, setActiveButton] = useState(ButtonType.COMBINE);
    const onButtonClick = (buttonType) => {
        setActiveButton(buttonType);
    };

    return (
        <PageHeader title="RCA utils"
                    activeButton={activeButton}
                    onButtonClick={onButtonClick}
        />
    );
}

export default App;
