import React, { useContext } from 'react';
import TodosContext from '../contexts/TodosContext';
import moment from 'moment';
moment.locale('en');
export default function Todo({ todo }) {
	const { toggleComplete } = useContext(TodosContext);
	const isOverdue = Date.now() > (new Date(todo.due));
	return (
		<div
			className={`task task_${todo.id}${todo.completed && ' completed'}`}
			onClick={toggleComplete(todo.id)}
		>
			"<span>{todo.item}</span>" is {!todo.completed && 'not '}complete!
			<br />Due by {moment(todo.due).format('MMMM Do YYYY')}
			{isOverdue ? <>
				<br /><span>This task is overdue!</span>
			</> : null}
			{
				todo.tags.length > 0 ? <>
					<br />
					<br />
					{todo.tags.reduce((result, tag) => <>
						{result}, {tag}
					</>)}
				</> : null
			}
		</div>
	);
}