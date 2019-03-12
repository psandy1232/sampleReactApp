"use strict";
import React, { Component } from "react";
import axios from "axios";
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: '',
      todoInput: '',
      editInput: '',
      index: -1,
      todoOutput: [
        { title: "One", status: "pending" },
        { title: "Two", status: "pending" },
        { title: "Three", status: "pending" },
        { title: "Four", status: "pending" },
        { title: "Five", status: "pending" },
        { title: "Six", status: "pending" },
        { title: "Seven", status: "pending" },
        { title: "Eight", status: "pending" },
        { title: "Nine", status: "pending" },
        { title: "Ten", status: "pending" },
        { title: "Eleven", status: "pending" },
        { title: "Twelve", status: "pending" },
        { title: "Thirteen", status: "pending" },
        { title: "Fourteen", status: "pending" },
        { title: "Fifteen", status: "pending" },
        { title: "Sixteen", status: "pending" },
        { title: "Seventeen", status: "pending" },
        { title: "Eighteen", status: "pending" },
        { title: "Nineteen", status: "pending" },
        { title: "Twenty", status: "pending" }        
      ],
      autoSuggestions: [],
      showSuggestions: false,
      activeSuggestion: 0,

      //For Pagination
      recsPerPage:5,
      activePage:1

      // siteData : [],
      // isLoading: true,
      // error:null
    };
    this.makeComplete = this.makeComplete.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.showEdit = this.showEdit.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.setValue = this.setValue.bind(this);
    // this.chooseSuggestion = this.chooseSuggestion.bind(this);
    this.showPage = this.showPage.bind(this);

  }

  componentWillReceiveProps(props) {

  }
  componentDidMount() {

    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then(response => response.json())
      .then(data =>
        console.log(data, "dadta")
      )
      .catch(error => error);

    this.refs.todoInput.focus();
  }


  addToDo(e) {
    e.preventDefault();
    if (this.state.todoInput) {
      var temp = this.state.todoOutput;
      var data = { title: this.state.todoInput, status: 'pending' };
      temp.push(data);
      this.setState({
        todoOutput: temp,
        todoInput: '',
      })
      this.refs.todoInput.focus();
    } else {
      alert("Please add any task to submit.");
      return false;
    }
  }

  makeComplete(i) {
    //if (confirm("Are you sure wants to complete it?")) {
      let exData = this.state.todoOutput[i];
      exData.status = 'completed';
      exData = [...this.state.todoOutput];
      this.setState({ todoOutput: exData });
      
    //}
  }
  removeTask(i) {
    let data = [...this.state.todoOutput];
    data.splice(i, 1);
    this.setState({ todoOutput: data });
  }
  setValue(field, e) {
    var object = {};
    object[field] = e.target.value;
    this.setState(object);

    if (field == 'todoInput') {
      this.filterResults(object[field]);
      // var sugg = [];
      // sugg.push(object);
      //this.setValue({autoSuggestions[] = object;})
    }
  }

  filterResults(item) {
    var data = this.state.todoOutput;
    //console.log(item);
    data = data.filter(function (i) {
      //console.log(i.title,"title")
      
      return i.title.toLowerCase().includes(item.toLowerCase());
    });
    this.setState({ autoSuggestions: data, showSuggestions: true, activeSuggestion: 0 });
  }

  // chooseSuggestion(title) {
  //   this.setState({ todoInput: title, showSuggestions: false, activeSuggestion: 0 });
  // }

  showEdit(i) {
    let title = this.state.todoOutput[i].title;
    this.setState({ editInput: title, action: 'edit', index: i });
  }
  cancelEdit() {
    this.setState({ editInput: '', action: '', index: -1 });
  }
  saveEdit(i) {
    let exData = this.state.todoOutput[i];
    exData.title = this.state.editInput;
    exData = [...this.state.todoOutput];
    this.setState({ todoOutput: exData, editInput: '', action: '', index: -1 });
  }

  renderAutoSuggestions() {
    //console.log(this.state.autoSuggestions)
    return (
      <div className="searchResults">
        <ul>
          {
            this.state.autoSuggestions.map((content, i) =>
              <li key={i}
                className={i == this.state.activeSuggestion ? 'active' : 'inactive'}
                onClick={()=>{
                  this.setState({ todoInput: content.title, showSuggestions: false, activeSuggestion: 0 });
                }}>{content.title}</li>
            )
          }
        </ul>
      </div>
    )
  }

  showPage(pageNum){
    this.setState({
      activePage:pageNum
    })
  }

  onKeyDown(e) {
    const { activeSuggestion, autoSuggestions } = this.state;
    //console.log(e.keyCode,"keyCode")
    //User pressed the enter key, update the input and close the
    //suggestions
    //console.log(autoSuggestions,"autoSuggestions")
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        todoInput: autoSuggestions[activeSuggestion].title
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === autoSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  hideSuggestions(e) {
    if (e.target.id == "inner_container")
      return false;
    else
      this.setState({ activeSuggestion: 0, autoSuggestions: [], showSuggestions: false })
  }

  render() {
    return (
      <div className="container" onClick={this.hideSuggestions.bind(this)}>
        <div className="inner_container" id="inner_container">
          <h1>To Do List</h1>
          <div className="todocont">
            <form onSubmit={this.addToDo.bind(this)} className="listForm" >
              <input type="text"
                name="todoInput"
                ref="todoInput"
                placeholder="Enter your list here"
                className="formInput"
                value={this.state.todoInput}
                onChange={this.setValue.bind(this, 'todoInput')}
                autoComplete="off"
                onKeyDown={this.onKeyDown.bind(this)}
              />
              <button type="submit" className="btn btn-primary" name="button">Add</button>

              {
                (this.state.showSuggestions === true && this.state.todoInput) ?
                  this.renderAutoSuggestions()
                  : null
              }


            </form>
          </div>

          <TodoListItem {...this.state}
            makeComplete={this.makeComplete}
            removeTask={this.removeTask}
            showEdit={this.showEdit}
            cancelEdit={this.cancelEdit}
            saveEdit={this.saveEdit}
            setValue={this.setValue}
          />

          <Pagination {...this.state}
            showPage={this.showPage}
          />


        </div>
      </div>

    );
  }
}


class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const fromRecord = (this.props.activePage-1)*(this.props.recsPerPage);
    const toRecord = fromRecord+this.props.recsPerPage;
    return (
      <div className="listItems">
        <ul>
          {
            (this.props.todoOutput.length > 0) ?
              this.props.todoOutput.slice(fromRecord, toRecord).map((item, i) =>
                <li key={i} className={item.status == 'pending' ? 'pending' : 'completed'}>
                  {
                    (this.props.action === 'edit' && this.props.index == i) ?
                      <div className="actions">
                        <input type="text"
                          name="editInput"
                          placeholder="Enter your list here"
                          className="formInput"
                          value={this.props.editInput}
                          onChange={this.props.setValue.bind(this, 'editInput')}
                        />
                      </div>
                      :
                      ((i+1) + fromRecord + ". " + item.title)
                  }

                  {item.status === 'pending' ?
                    (this.props.action === 'edit' && this.props.index == i) ?
                      <div className="actions">
                        <button type="button" className="btn btn-success" onClick={this.props.saveEdit.bind(this, i+fromRecord)} >Save</button>
                        <button type="button" className="btn btn-default" onClick={this.props.cancelEdit.bind(this)} >Cancel</button>
                      </div>
                      :
                      <div className="actions">
                        <span onClick={this.props.removeTask.bind(this, i+fromRecord)}><i className="fa fa-times-circle" title="Remove from list" aria-hidden="true"></i></span>

                        <span onClick={this.props.showEdit.bind(this, i+fromRecord)}><i className="far fa-edit"></i></span>


                        <span onClick={this.props.makeComplete.bind(this, i+fromRecord)}><i className="fa fa-check-circle" title="Click to Complete" aria-hidden="true"></i></span>
                      </div>

                    :
                    <span><i className="fa fa-check-circle" title="Completed" aria-hidden="true"></i></span>
                  }
                </li>
              )
              :
              <li key={1} className="error text-center">You have not Created any To Do list yet.</li>
          }
        </ul>
      </div>
    )
  }
}


class Pagination extends Component {
  
 

  render() {
    const {todoOutput,recsPerPage,activePage} = this.props; 
    
    
    //Find No of Pages it has
    var noOfPages = Math.ceil(parseInt(todoOutput.length)/recsPerPage);
    var data = [];
    for(let i=1;i<=noOfPages;i++){
      data.push(i);
    }
      

    return (
      <div>
        {noOfPages > 1 ?
          <ul className="pagination">
            {activePage > 1 ? <li onClick = {this.props.showPage.bind(this,1)}>{"<< First"}</li> : null }

            {activePage > 1 ? <li onClick = {this.props.showPage.bind(this,activePage-1)}>{"< Prev"}</li> : null }
            
            {
              data.map((pageNumber, i) =>
              <li key={i}
                onClick = {this.props.showPage.bind(this,pageNumber)}
                className={pageNumber == activePage ? 'active' : ''}
                >
                  {pageNumber}
              </li>
              )
            }
            
            {activePage < noOfPages ? <li onClick = {this.props.showPage.bind(this,activePage+1)}>{"Next >"}</li> : null }

            {activePage < noOfPages ? <li onClick = {this.props.showPage.bind(this,noOfPages)}>{"Last >>"}</li> : null }

            
          </ul>
          :
          null
        }
      </div>
    )
  }
}