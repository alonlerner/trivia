import React from "react"

class Question extends React.Component {
    constructor() {
        super()
        this.state = {
            lives: 3,
            questionNum: 1,
            totalScore: 0,
            questions: [{ "id": 0, "question": "loading...", "correctAnswer": "loading...", "wrongAnswer1": "loading...", "wrongAnswer2": "loading...", "wrongAnswer3": "loading..." }],
            currentQuestionId: 0,
            notClicked: true,
            randomAnswers:[]
        }
        this.getQuestions = this.getQuestions.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.getQuestions()
    }

    getQuestions = () => {
        fetch('http://localhost:4000/questions')
            .then(response => response.json())
            .then(response => this.setState({ questions: response.data }))
            .then(() => {
                const array = [this.state.questions[this.state.currentQuestionId].correctAnswer, this.state.questions[this.state.currentQuestionId].wrongAnswer1, this.state.questions[this.state.currentQuestionId].wrongAnswer2, this.state.questions[this.state.currentQuestionId].wrongAnswer3]
                let ctr = array.length, temp, index
                while (ctr > 0) {
                    index = Math.floor(Math.random() * ctr)
                    ctr--
                    temp = array[ctr]
                    array[ctr] = array[index]
                    array[index] = temp
                }
                this.setState({ randomAnswers: array })
            })
    }

    handleClick(event) {
        
        if (event.target.textContent.substring(3).trim() === this.state.questions[this.state.currentQuestionId].correctAnswer.trim()) {
            event.target.style.backgroundColor = '#79ff4d'
        }

        else {
            event.target.style.backgroundColor = '#ff4000'
            this.setState((prevState) => {
                return { lives: prevState.lives - 1 }
            })
        }
        this.setState({ notClicked: false })
        setTimeout(() => {
            this.setState({
                questions: null,
                
            })
        }, 3000)
        
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
                <br style={{ display: this.state.questions ? "block" : "none" }}/>
                <div className="question" style={{ display: this.state.questions ? "block" : "none" }}>{this.state.questions &&this.state.questions[this.state.currentQuestionId].question}</div>
                <br style={{ display: this.state.questions ? "block" : "none" }} />
                <div className="div-answer" onClick={this.state.notClicked && this.handleClick} style={{ display: this.state.questions ? "block" : "none" }}> A: {this.state.questions && this.state.randomAnswers[0]}</div>
                <br style={{ display: this.state.questions ? "block" : "none" }} />
                <div className="div-answer" onClick={this.state.notClicked && this.handleClick} style={{ display: this.state.questions ? "block" : "none" }}>B: {this.state.questions && this.state.randomAnswers[1]}</div>
                <br style={{ display: this.state.questions ? "block" : "none" }}/>
                <div className="div-answer" onClick={this.state.notClicked && this.handleClick} style={{ display: this.state.questions ? "block" : "none" }}>C: {this.state.questions && this.state.randomAnswers[2]}</div>
                <br style={{ display: this.state.questions ? "block" : "none" }} />
                <div className="div-answer" onClick={this.state.notClicked && this.handleClick} style={{ display: this.state.questions ? "block" : "none" }}>D: {this.state.questions && this.state.randomAnswers[3]}</div>
                <br style={{ display: this.state.questions ? "block" : "none" }}/>
            </div>    
        )
    }
}

export default Question