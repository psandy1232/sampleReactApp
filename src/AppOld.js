import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    todoInput:'',
    test:''
  };
  render() {
    return (
      <div className="App">
          <input type="text" data-testid='testinput'
            name="todoInput"
            ref="todoInput"
            placeholder="Enter your list here"
            className="formInput"
            value={this.state.todoInput}
            onChange={(e)=>{
                this.setState({todoInput:e.currentTarget.value})
            }}
            autoComplete="off"
           
          />
          <button
          onClick={()=>{
            this.setState({test:"test"})
        }}
          data-testid='btnsub' type="button" className="btn btn-primary" name="button">Add</button>
         
      </div>
    );
  }
}

export default App;
