import React, { useReducer } from 'react';
import './components/Todo.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodosContext from './contexts/TodosContext';

import * as types from './reducers';

export default function App(props) {
	const [state, dispatch] = useReducer(types.reducer, types.initialState());
	const toggleComplete = (id) => {
		return (event => {
			dispatch({
				type: types.TOGGLE_COMPLETE,
				payload: id
			});
		});
	}
	const removeTodos = () => {
		dispatch({
			type: types.CLEAR_COMPLETE
		});
	}
	const addTodo = (e) => {
		e.preventDefault();
		if (!state.todo) return false;
		dispatch({
			type: types.ADD_TODO
		});
	}
	const inputOnChange = (e) => {
		dispatch({
			type: types.ON_INPUT_CHANGE,
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
