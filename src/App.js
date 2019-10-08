import React, { useReducer } from 'react';
import './components/Todo.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodosContext from './contexts/TodosContext';

//const todo_list = (JSON.parse(localStorage.getItem('todo_list'))).todos || [];
const ADD_TODO = 'ADD_TODO';
const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';
const CLEAR_COMPLETE = 'CLEAR_COMPLETE';
const ON_INPUT_CHANGE = 'ON_INPUT_CHANGE';
function reducer(state, action) {
	let finalState = state;
	switch (action.type) {
		case ADD_TODO:
			finalState = {
				...state,
				todos: [
					...state.todos,
					{
						id: Date.now(),
						item: state.todo,
						due: state.todoDue,
						completed: false,
						tags: state.todoTags
							.toLowerCase()
							.replace(/[^a-z,]/g, '')
							.split(',')
					}
				],
				todo: ""
			}
			break;
		case TOGGLE_COMPLETE:
			finalState = {
				...state,
				todos: state.todos.map(todo => {
					if (todo.id !== action.payload) return todo;
					return { ...todo, completed: !todo.completed }
				})
			};
			break;
		case CLEAR_COMPLETE:
			finalState = {
				...state,
				todos: state.todos.filter(todo => !todo.completed)
			};
			break;
		case ON_INPUT_CHANGE:
			finalState = {
				...state,
				...action.payload
			};
			break;
		default:
			finalState = state;
			break;
	}
	localStorage.setItem('app_todos_search', JSON.stringify(finalState.search));
	localStorage.setItem('app_todos_add', JSON.stringify(finalState.todo));
	localStorage.setItem('app_todos_add_due', JSON.stringify(finalState.todoDue));
	localStorage.setItem('app_todos_add_tags', JSON.stringify(finalState.todoTags));
	localStorage.setItem('app_todos_list', JSON.stringify(finalState.todos));
	return finalState;
}

const initialState = () => {
	const storage = {
		search: localStorage.getItem('app_todos_search'),
		todo: localStorage.getItem('app_todos_add'),
		todoDue: localStorage.getItem('app_todos_add_due'),
		todoTags: localStorage.getItem('app_todos_add_tags'),
		todos: localStorage.getItem('app_todos_list'),
	}
	return {
		search: (storage.search ? JSON.parse(storage.search) : ""),
		todo: (storage.todo ? JSON.parse(storage.todo) : ""),
		todoDue: (storage.todoDue ? JSON.parse(storage.todoDue) : ""),
		todoTags: (storage.todoTags ? JSON.parse(storage.todoTags) : ""),
		todos: (storage.todos ? JSON.parse(storage.todos) : []),
	}
}

export default function App(props) {
	const [state, dispatch] = useReducer(reducer, initialState());
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
	const inputOnChange = (e) => {
		dispatch({
			type: ON_INPUT_CHANGE,
			payload: { [e.target.name]: e.target.value }
		});
	}

	const { todos, todo, todoDue, search } = state;
	const searchedTodos = search ? todos.filter(_todo => _todo.item.includes(search)) : todos;

	return (
		<TodosContext.Provider value={{
			todos: searchedTodos,
			toggleComplete,
			search,
			todo,
			todoDue,
			inputOnChange,
			addTodo,
			removeTodos
		}}>
			<TodoList />
			<TodoForm />
		</TodosContext.Provider>
	);
}
