import { CiEdit } from 'react-icons/ci';
import { MdOutlineDeleteForever } from 'react-icons/md';

const getStatusColor = (status) => {
	switch (status) {
		case 'In Progress':
			return 'warning';
		case 'Completed':
			return 'success';
		default:
			return 'neutral';
	}
};

const TodoItem = ({ todo, handleEdit, handleDelete }) => {
	return (
		<div className="collapse bg-transparent shadow-md">
			<input type="checkbox" className="w-full p-0" />
			<div className="collapse-title flex justify-between gap-2 w-full">
				<div>
					<p className="font-medium text-base">
						{todo?.title}{' '}
						<div className={`badge badge-outline badge-sm badge-${getStatusColor(todo?.status)}`}>{todo?.status}</div>
					</p>
				</div>
				<div className="flex gap-2 items-center">
					<CiEdit className="text-primary" size={20} onClick={() => handleEdit(todo)} />
					<MdOutlineDeleteForever className="text-red-600" size={20} onClick={() => handleDelete(todo)} />
				</div>
			</div>

			<div className="collapse-content">
				<p>{todo?.description}</p>
			</div>
		</div>
	);
};

export default TodoItem;
