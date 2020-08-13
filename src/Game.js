import React from "react"

class Game extends React.Component {
    constructor() {
        super()
        super()
        this.state = {
            lives: 3,
            questionNum: 1,
            totalScore: 0,
            questions: [{ "id": 0, "question": "loading...", "correctAnswer": "loading...", "wrongAnswer1": "loading...", "wrongAnswer2": "loading...", "wrongAnswer3": "loading..." }],
            currentQuestionId: 0,
        }
    }

    render() {
        return (
            <div className="game">
                <table>
                    <tr>
                        <td>{this.state.totalScore}</td>
                        <td>Question {this.state.questionNum}</td>
                        <td>time</td>
                        <td>{this.state.lives}</td>
                    </tr>
                </table>
                
            </div>
        )
    }
}

export default Game