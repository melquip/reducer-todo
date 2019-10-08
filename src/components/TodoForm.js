import React from 'react';

export default class TodoForm extends React.Component {
	render() {
		return (
			<div className="todoform">
				<form onSubmit={this.props.addTodo}>
					<input id="todo" name="todo" type="text" value={this.props.todo} onChange={this.props.todoOnChange} />
					<button type="submit">Add todo</button>
					<button onClick={this.props.removeTodos}>Clear completed</button>
					
					<label htmlFor="search">Search:</label>
					<input id="search" name="search" type="text" value={this.props.search} onChange={this.props.searchOnChange} />
				</form>
			</div>
		);
	}
}