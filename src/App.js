import React, { useReducer } from 'react';
import './components/Todo.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

//const todo_list = (JSON.parse(localStorage.getItem('todo_list'))).todos || [];
const ADD_TODO = 'ADD_TODO';
const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';
const CLEAR_COMPLETE = 'CLEAR_COMPLETE';
const ON_INPUT_CHANGE = 'ON_INPUT_CHANGE';
function reducer(state, action) {
	switch (action.type) {
		case ADD_TODO:
			return {
				...state,
				todos: [
					...state.todos,
					{
						id: Date.now(),
						task: state.todo,
						completed: false
					}
				],
				todo: ""
			}
		case TOGGLE_COMPLETE:
			return {
				...state,
				todos: state.todos.map(todo => {
					if (todo.id !== action.payload) return todo;
					return { ...todo, completed: !todo.completed }
				})
			};
		case CLEAR_COMPLETE:
			return {
				...state,
				todos: state.todos.filter(todo => !todo.completed)
			};
		case ON_INPUT_CHANGE:
			return {
				...state,
				...action.payload
			};
		default:
			return state;
	}
}

export default function App(props) {
	const [state, dispatch] = useReducer(reducer, {
		search: "",
		todo: "",
		todos: [],
	})
	const toggleComplete = (id) => {
		return (event => {
			dispatch({
				type: TOGGLE_COMPLETE,
				payload: id
			});
		});
	}
	const removeTodos = () => {
		dispatch({
			type: CLEAR_COMPLETE
		});
	}
	const addTodo = (e) => {
		e.preventDefault();
		if (!state.todo) return false;
		dispatch({
			type: ADD_TODO
		});
	}
	const searchOnChange = (e) => {
		dispatch({
			type: ON_INPUT_CHANGE,
			payload: { search: e.target.value }
		});
	}
	const todoOnChange = (e) => {
		dispatch({
			type: ON_INPUT_CHANGE,
			payload: { todo: e.target.value }
		});
	}

	const { todos, todo, search } = state;
	const searchedTodos = search ?
		todos.filter(_todo => _todo.task.includes(search)) : todos;


	return (<>
		<TodoList
			data={searchedTodos}
			toggleComplete={toggleComplete}
		/>
		<TodoForm
			search={search}
			searchOnChange={searchOnChange}
			todo={todo}
			todoOnChange={todoOnChange}
			addTodo={addTodo}
			removeTodos={removeTodos}
		/>
	</>);
}
