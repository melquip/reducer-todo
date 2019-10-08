import React, { useContext } from 'react';
import TodosContext from '../contexts/TodosContext';

export default function Todo({ todo }) {
	const { toggleComplete } = useContext(TodosContext);
	return (
		<div
			className={`task task_${todo.id}${todo.completed && ' completed'}`}
			onClick={toggleComplete(todo.id)}
		>
			"<span>{todo.item}</span>" is {!todo.completed && 'not '}complete!
			</div>
	);
}