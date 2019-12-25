import React, { Component } from 'react';
import './App.css';
import ValidationText from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {

  state = {
    inputText: ''
  }

  inputTextListener = (event) => {
    this.setState({
      inputText: event.target.value
    })
  }


  removeCharHandler = (index) => {
    // const inputText = this.state.inputText;
    const text = this.state.inputText.split('');
    text.splice(index, 1);
    const updatedText = text.join('');
    this.setState({
      inputText:updatedText
    })

  }

  render() {



    let charArray = this.state.inputText.split('');
    let charComponentDisplay = (
      charArray.map((character, index) => {
        return <CharComponent
          character={character}
          key={index}
          click={() => this.removeCharHandler(index)}
        />
      })
    )

    return (
      <div className="App">
        <input type='text' value={this.state.inputText} onChange={this.inputTextListener} />
        <p>{this.state.inputText.length}</p>
        <ValidationText text={this.state.inputText} />
        {charComponentDisplay}
      </div>
    );
  }
}

export default App;
