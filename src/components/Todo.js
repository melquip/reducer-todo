import React from 'react';

export default class Todo extends React.Component {
	render() {
		const todo = this.props.data;
		return (
			<div 
				className={`task task_${todo.id}${todo.completed && ' completed'}`}
				onClick={this.props.toggleComplete(todo.id)}
			>
				"<span>{todo.item}</span>" is {!todo.completed && 'not '}complete!
			</div>
		);
	}
}