import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList'
import Color from './components/Palette'

class App extends Component {

  id =3


  
  state = {
    input: '',
    selected_color: 'black',
    color: ['#343a40', '#f03e3e', '#12b886', '#228ae6'],
    todos: [
      { id: 0, text: ' 리액트', checked: false, color: 'black' },
      { id: 1, text: ' 스터디', checked: true, color: 'black'  },
      { id: 2, text: ' 화이팅', checked: false, color: 'red'  }
    ]
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  handleCreate = () => {
    const { input, todos } = this.state
    this.setState({
      input: '',
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false,
        color: this.state.selected_color
      })
    })
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.handleCreate()
    }
  }

  handleToggle = (id) => {
    const { todos } = this.state
    const index = todos.findIndex(todo => todo.id ===id)
    const selected = todos[index]
    const nextTodos = [...todos]

    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    }

    this.setState({
      todos: nextTodos
    })
  }

  handleRemove = (id) => {
    const {todos} = this.state
    this.setState({
      todos: todos.filter(todo => todo.id !==id) //id가 일치하지 않는 배열을 재생성
    })

  }

  handleColor = (e) => {
    const selected = this.state.color
    const color = selected[e.target.id]
    this.setState({
      selected_color: color
    })
  }

  render() {
    const { input,todos } = this.state
    const {
      handleChange,
      handleCreate,
      handleKeyPress
    } = this

    return (
      <TodoListTemplate 
        color={
          <Color 
            colors = {this.state.color}
            selected = {this.handleColor}
          />
        } 
        form={
        <Form
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
          color={this.state.selected_color}
        />}>
        <TodoItemList todos={todos} onRemove={this.handleRemove} onToggle={this.handleToggle} />
      </TodoListTemplate>
    );
  }
}

export default App;