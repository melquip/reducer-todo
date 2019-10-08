export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';
export const CLEAR_COMPLETE = 'CLEAR_COMPLETE';
export const ON_INPUT_CHANGE = 'ON_INPUT_CHANGE';
export function reducer(state, action) {
	let finalState = state;
	switch (action.type) {
		case ADD_TODO:
			finalState = {
				...state,
				todos: [
					...state.todos,
					{
						id: Date.now(),
						item: state.todo,
						due: state.todoDue,
						completed: false,
						tags: state.todoTags ?
							state.todoTags.toLowerCase().replace(/[^a-z,]/g, '').split(',')
							: []
					}
				],
				todo: ""
			}
			break;
		case TOGGLE_COMPLETE:
			finalState = {
				...state,
				todos: state.todos.map(todo => {
					if (todo.id !== action.payload) return todo;
					return { ...todo, completed: !todo.completed }
				})
			};
			break;
		case CLEAR_COMPLETE:
			finalState = {
				...state,
				todos: state.todos.filter(todo => !todo.completed)
			};
			break;
		case ON_INPUT_CHANGE:
			finalState = {
				...state,
				...action.payload
			};
			break;
		default:
			finalState = state;
			break;
	}
	localStorage.setItem('app_todos_state', JSON.stringify(finalState));
	return finalState;
}
export const initialState = () => {
	const storage = localStorage.getItem('app_todos_state');
	return storage ? JSON.parse(storage) : {
		search: "",
		todo: "",
		todoDue: "",
		todoTags: "",
		todos: [],
	}
}