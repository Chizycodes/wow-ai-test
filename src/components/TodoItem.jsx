import { CiEdit } from 'react-icons/ci';
import { MdOutlineDeleteForever } from 'react-icons/md';

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

const TodoItem = ({ todo, setTodoToEdit, handleDelete }) => {
	return (
		<div className="collapse bg-transparent shadow-md">
			<input type="checkbox" className="w-full p-0" />
			<div className="collapse-title flex justify-between gap-2 w-full">
				<div>
					<p className="font-medium text-base">
						{todo?.title}{' '}
						<span className={`badge badge-outline badge-sm badge-${getStatusColor(todo?.status)}`}>{todo?.status}</span>
					</p>
				</div>
				<div className="flex gap-2 items-center z-20">
					<CiEdit className="text-primary cursor-pointer" size={20} onClick={() => setTodoToEdit(todo)} />
					<MdOutlineDeleteForever
						className="text-red-600 cursor-pointer"
						size={20}
						onClick={() => handleDelete(todo)}
					/>
				</div>
			</div>

			<div className="collapse-content">
				<p>{todo?.description}</p>
			</div>
		</div>
	);
};

export default TodoItem;
