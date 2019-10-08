import React, { useReducer } from 'react';
import './components/Todo.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodosContext from './contexts/TodosContext';

import {
	ADD_TODO,
	TOGGLE_COMPLETE,
	CLEAR_COMPLETE,
	ON_INPUT_CHANGE,
	reducer,
	initialState
} from './reducers';

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
