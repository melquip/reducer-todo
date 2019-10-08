import React from 'react';

export default function Todo({ todo }) {
	return (
		<div
			className={`task task_${todo.id}${todo.completed && ' completed'}`}
			onClick={this.props.toggleComplete(todo.id)}
		>
			"<span>{todo.item}</span>" is {!todo.completed && 'not '}complete!
			</div>
	);
}