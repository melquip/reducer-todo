import React, { useContext } from 'react';
import TodosContext from '../contexts/TodosContext';

export default function TodoForm(props) {
	const {
		inputOnChange,
		search,
		todo,
		todoDue,
		todoTags,
		addTodo,
		removeTodos
	} = useContext(TodosContext);
	return (
		<div className="todoform">
			<form onSubmit={addTodo}>
				<label htmlFor="search">Add Todo:</label>
				<input id="todo" name="todo" type="text" value={todo} onChange={inputOnChange} />
				<label htmlFor="todoDue">Date due:</label>
				<input id="todoDue" name="todoDue" type="date" value={todoDue} onChange={inputOnChange} />
				<label htmlFor="todoTags">Tags: (separated by comma ',')</label>
				<input id="todoTags" name="todoTags" type="text" value={todoTags} onChange={inputOnChange} />
				<br/>
				<br/>
				<button type="submit">Add todo</button>
				<button onClick={removeTodos}>Clear completed</button>

				<label htmlFor="search">Search:</label>
				<input id="search" name="search" type="text" value={search} onChange={inputOnChange} />
			</form>
		</div>
	);
}