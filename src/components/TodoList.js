import React from 'react';
import Todo from './Todo';
// your components will all go in this `component` directory.
// feel free to change this component.js into TodoList.js
export default function TodoList({ todos }) {
	return (
		<div className="todolist">
			<h1>Todo List</h1>
			{
				todos.length > 0 ? todos.map(todo =>
					<Todo
						key={todo.id}
						todo={todo}
						toggleComplete={this.props.toggleComplete}
					/>) : null
			}
		</div>
	);
}