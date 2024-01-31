import { useState } from "react"
import MusicStaff from "./musicStaff/MusicStaff"
import PianoContainer from "./PianoContainer/PianoContainer"

const PianoStaffContainer = () => {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)


    return (
        <div className="app-container">
            <MusicStaff currentQuestionIndex={currentQuestionIndex}/>
            <PianoContainer currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex}/>
        </div>
    )
}

export default PianoStaffContainer