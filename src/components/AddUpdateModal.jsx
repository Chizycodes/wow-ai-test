import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import moment from 'moment';

const schema = yup.object().shape({
	title: yup.string().required('Title is required'),
	description: yup.string().required('Description is required'),
	priority: yup.string().required('Priority is required'),
	dueDate: yup.date(),
});

const AddUpdateModal = ({ handleAddTodo, handleEditTodo, loading = false, isOpen, handleClose, todoToEdit = {} }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		if (todoToEdit?.id) {
			handleEditTodo(data);
		} else {
			handleAddTodo(data);
		}
		reset();
		handleClose();
	};

	useEffect(() => {
		if (todoToEdit?.id) {
			reset({ ...todoToEdit, dueDate: moment(todoToEdit?.deadline).format('YYYY-MM-DD') });
		}
	}, []);

	return (
		<dialog id="todo-modal" className={`modal ${isOpen ? 'modal-open' : ''}`}>
			<div className="modal-box bg-white text-gray-700">
				<form method="dialog">
					<button className="btn btn-sm btn-ghost absolute right-2 top-2" onClick={handleClose}>
						✕
					</button>
				</form>
				<h3 className="font-bold text-lg">{todoToEdit ? 'EDIT' : 'NEW'} TASK</h3>
				<div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mt-3 flex flex-col gap-2">
							<div className="flex flex-col">
								<label className="font-medium">Title</label>
								<input
									type="text"
									{...register('title')}
									className={`grow input input-md border-primary focus:border-primary focus:outline-none outline-none bg-transparent ${
										errors.title ? 'border-red-500' : ''
									}`}
								/>
								{errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
							</div>

							<div className="flex flex-col">
								<label className="font-medium">Description</label>
								<textarea
									{...register('description')}
									className={`grow input input-md border-primary focus:border-primary focus:outline-none outline-none bg-transparent ${
										errors.description ? 'border-red-500' : ''
									}`}
								/>
								{errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
							</div>

							<div className="flex flex-col">
								<label className="font-medium">Priority</label>
								<select
									{...register('priority')}
									className={`select focus:border-primary focus:outline-none outline-none input-md border-primary bg-transparent ${
										errors.priority ? 'border-red-500' : ''
									}`}
								>
									<option value="">Select Priority</option>
									<option value="low">Low</option>
									<option value="medium">Medium</option>
									<option value="high">High</option>
								</select>
								{errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority.message}</p>}
							</div>

							<div className="flex flex-col">
								<label className="font-medium">Due Date</label>
								<input
									type="date"
									{...register('dueDate')}
									className={`input input-md border-primary focus:border-primary focus:outline-none outline-none bg-transparent ${
										errors.deadline ? 'border-red-500' : ''
									}`}
								/>
								{errors.deadline && <p className="text-red-500 text-xs mt-1">{errors.deadline.message}</p>}
							</div>

							{todoToEdit && (
								<div className="flex flex-col">
									<label className="font-medium">Status</label>
									<select
										{...register('status')}
										className={`select focus:border-primary focus:outline-none outline-none input-md border-primary bg-transparent ${
											errors.status ? 'border-red-500' : ''
										}`}
									>
										<option value="">Select Status</option>
										<option value="pending">Pending</option>
										<option value="in-progress">In Progress</option>
										<option value="completed">Completed</option>
									</select>
									{errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
								</div>
							)}

							<div className="modal-action">
								<button
									type="submit"
									className="btn btn-primary bg-primary text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
								>
									Submit {loading && <span className="loading loading-spinner loading-md"></span>}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</dialog>
	);
};

export default AddUpdateModal;
