import React, { useContext } from 'react';
import TodosContext from '../contexts/TodosContext';
import Todo from './Todo';

export default function TodoList() {
	const { todos } = useContext(TodosContext)
	return (
		<div className="todolist">
			<h1>Todo List</h1>
			{
				todos.length > 0 ? todos.map(todo =>
					<Todo
						key={todo.id}
						todo={todo}
					/>) : null
			}
		</div>
	);
}