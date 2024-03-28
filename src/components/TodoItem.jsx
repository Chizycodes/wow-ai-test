import moment from 'moment';
import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { AiOutlineDrag } from 'react-icons/ai';

const getStatusColor = (status) => {
	switch (status) {
		case 'in-progress':
			return 'warning';
		case 'completed':
			return 'success';
		default:
			return 'neutral';
	}
};

const TodoItem = ({ todo, setTodoToEdit, handleDelete, todoOpen, setTodoOpen }) => {
	return (
		<div className="collapse bg-transparent shadow-md transition duration-1000 transform hover:scale-y-110 hover:duration-300 ease-in-out ">
			<input
				type="radio"
				name="todo-item"
				readOnly
				checked={todoOpen === todo?.id}
				onClick={() => setTodoOpen(todo.id === todoOpen ? null : todo.id)}
			/>
			<div className="collapse-title flex justify-between gap-2 w-full pe-4">
				<div className="flex items-center gap-2">
					<div className='z-10'>
						<AiOutlineDrag size={20} title='Re-order' />
					</div>
					<p className="font-medium text-base">
						<span className={todo?.status === 'completed' ? 'line-through' : ''}>{todo?.title}</span>{' '}
						<span className={`badge badge-outline badge-sm badge-${getStatusColor(todo?.status)}`}>{todo?.status}</span>
					</p>
				</div>
				<div className="flex gap-2 items-center z-10">
					<CiEdit
						className="text-primary cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
						size={20}
						onClick={() => setTodoToEdit(todo)}
						title="Edit"
					/>
					<MdOutlineDeleteForever
						className="text-red-600 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
						size={20}
						onClick={() => handleDelete(todo)}
						title="Delete"
					/>
				</div>
			</div>

			<div className="collapse-content">
				<div className="flex items-center justify-between">
					<p className="text-sm">Priority: {todo?.priority}</p>
					<p className="text-sm">
						Due Date: {todo?.dueDate ? moment(todo?.dueDate).format('YYYY-MM-DD  h:mm a') : '-'}
					</p>
				</div>
				<p>{todo?.description}</p>
			</div>
		</div>
	);
};

export default TodoItem;
