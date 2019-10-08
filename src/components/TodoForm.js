import React from 'react';

export default function TodoForm(props) {
	return (
		<div className="todoform">
			<form onSubmit={props.addTodo}>
				<input id="todo" name="todo" type="text" value={props.todo} onChange={props.todoOnChange} />
				<button type="submit">Add todo</button>
				<button onClick={props.removeTodos}>Clear completed</button>

				<label htmlFor="search">Search:</label>
				<input id="search" name="search" type="text" value={props.search} onChange={props.searchOnChange} />
			</form>
		</div>
	);
}