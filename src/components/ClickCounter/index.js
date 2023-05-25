import {Component} from 'react'
import './index.css'

class ClickCounter extends Component {
  state = {
    text: true,
    elapsedTime: 0,
    speed: 0,
    textvalue: '',
    totaltime: 0,
    correct: 0,
  }

  componentDidMount() {
    const {text} = this.state
    if (text === false) {
      this.timerId = setInterval(this.tick, 1000)
    } else {
      const {elapsedTime, textvalue, totaltime, correct} = this.state
      const Time = elapsedTime
      console.log(`Time is ${Time}`)
      clearInterval(this.timerId)

      this.setState({
        elapsedTime: 0,
      })
      const totalWord = textvalue.trim()
      let actualWord = totalWord === '' ? 0 : totalWord.split(' ')
      actualWord = this.errorChecking(actualWord)
      if (actualWord !== 0) {
        const typingSpeed = Math.round((actualWord / Time) * 60)
        console.log(`typing speed is ${typingSpeed}`)
        this.setState({
          speed: typingSpeed,
          totaltime: Time,
          correct: actualWord,
        })
      }
    }
  }

  tick = () => {
    this.setState(prevState => ({elapsedTime: prevState.elapsedTime + 1}))
  }

  errorChecking = words => {
    console.log(words)
    let num = 0
    const sentenceWrite = 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'.split(
      ' ',
    )
    console.log(sentenceWrite)
    for (let i = 0; i < words.length; i += 1) {
      if (words[i] === sentenceWrite[i]) {
        num += 1
      }
    }
    return num
  }

  startTimer = () => {
    this.setState(prevState => {
      const {text, textvalue} = prevState
      return {
        text: !text,
        textvalue: ' ',
      }
    }, this.componentDidMount())
  }

  addText = event => {
    this.setState({textvalue: event.target.value})
  }

  render() {
    const {elapsedTime, correct, totaltime, text, speed} = this.state

    const buttonText = text ? 'Stop' : 'Start'
    return (
      <div className="container">
        <div className="typing-container">
          <h1>Typing Speed Task</h1>
          <p>Time : {elapsedTime}s</p>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form.
          </p>
          <textarea
            rows="9"
            cols="60"
            placeholder="Start Typing..."
            onChange={this.addText}
          />
          <button type="button" className="start-btn" onClick={this.startTimer}>
            {buttonText}
          </button>
        </div>
        {text === true ? null : (
          <>
            <p className="result">You Type {correct} correct words</p>
            <p className="result">
              Your typing speed is {speed} words per minute & time taken is{' '}
              {totaltime}
              sec.
            </p>
          </>
        )}
      </div>
    )
  }
}

export default ClickCounter
