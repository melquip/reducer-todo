import React, { useContext } from 'react';
import TodosContext from '../contexts/TodosContext';

export default function TodoForm(props) {
	const {
		search,
		searchOnChange,
		todo,
		todoOnChange,
		addTodo,
		removeTodos
	} = useContext(TodosContext);
	return (
		<div className="todoform">
			<form onSubmit={addTodo}>
				<input id="todo" name="todo" type="text" value={todo} onChange={todoOnChange} />
				<button type="submit">Add todo</button>
				<button onClick={removeTodos}>Clear completed</button>

				<label htmlFor="search">Search:</label>
				<input id="search" name="search" type="text" value={search} onChange={searchOnChange} />
			</form>
		</div>
	);
}