import React from 'react';
import './components/TodoComponents/Todo.css';
import TodoList from './components/TodoComponents/TodoList';
import TodoForm from './components/TodoForm';

const todo_list = (JSON.parse(localStorage.getItem('todo_list'))).todos || [];
export default class App extends React.Component {
	// you will need a place to store your state in this component.
	// design `App` to be the parent component of your application.
	// this component is going to take care of state, and any change handlers you need to work with your state
	constructor(props) {
		super(props);
		this.state = {
			search: "",
			todo: "",
			todos: todo_list,
		}
	}
	persistState = (key, value) => {
		localStorage.setItem(key, value);
	}
	toggleComplete = (id) => {
		return (event => {
			this.setState(currentState => {
				const state = {
					todos: currentState.todos.map(todo => {
						if (todo.id !== id) return todo;
						return { ...todo, completed: !todo.completed }
					})
				};
				this.persistState('todo_list', JSON.stringify(state));
				return state;
			});
		});
	}
	removeTodos = () => {
		this.setState(currentState => {
			const state = {
				todos: currentState.todos.filter(todo => !todo.completed),
			};
			this.persistState('todo_list', JSON.stringify(state));
			return state;
		});
	}
	addTodo = (e) => {
		e.preventDefault();
		this.setState(currentState => {
			if (!currentState.todo) return false;
			const state = {
				todos: [
					...currentState.todos,
					{
						id: Date.now(),
						task: currentState.todo,
						completed: false
					}
				]
			};
			this.persistState('todo_list', JSON.stringify(state));
			return { ...state, todo: "" };
		});
	}
	searchOnChange = (e) => {
		this.setState({
			search: e.target.value
		});
	}
	todoOnChange = (e) => {
		this.setState({
			todo: e.target.value
		});
	}
	render() {
		const { todos, todo, search } = this.state;
		const searchedTodos = search ? 
			todos.filter(_todo => _todo.task.includes(search)) : todos;
		return (<>
			<TodoList
				data={searchedTodos}
				toggleComplete={this.toggleComplete}
			/>
			<TodoForm
				search={search}
				searchOnChange={this.searchOnChange}
				todo={todo}
				todoOnChange={this.todoOnChange}
				addTodo={this.addTodo}
				removeTodos={this.removeTodos}
			/>
		</>);
	}
}
