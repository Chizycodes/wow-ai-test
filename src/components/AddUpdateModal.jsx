import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ThemeContext } from '../context/themeContext';

const schema = yup.object().shape({
	title: yup.string().required('Title is required').min(3),
	description: yup.string().required('Description is required').min(3),
	priority: yup.string().required('Priority is required'),
	dueDate: yup.date(),
});

const AddUpdateModal = ({ handleAddTodo, handleEditTodo, loading = false, isOpen, handleClose, todoToEdit = {} }) => {
	const { theme } = useContext(ThemeContext);
	const {
		register,
		handleSubmit,
		reset,
		control,
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
			reset({ ...todoToEdit });
		}
	}, []);

	return (
		<dialog id="todo-modal" className={`modal ${isOpen ? 'modal-open' : ''}`}>
			<div className={`modal-box ${theme === 'light' ? 'bg-white text-zinc-600' : 'bg-dark-card text-zinc-400'}`}>
				<form method="dialog">
					<button className="btn btn-sm btn-ghost absolute right-2 top-2" onClick={handleClose}>
						✕
					</button>
				</form>
				<h3 className="font-bold text-base text-center">{todoToEdit ? 'EDIT' : 'NEW'} TASK</h3>
				<div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mt-3 flex flex-col gap-2">
							<div className="flex flex-col">
								<label className="font-medium text-sm mb-1">Title</label>
								<input
									type="text"
									{...register('title')}
									className={`input border-primary focus:border-primary focus:outline-none outline-none bg-transparent h-10 text-sm ${
										errors.title ? 'border-red-500' : ''
									}`}
								/>
								{errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
							</div>

							<div className="flex flex-col">
								<label className="font-medium text-sm mb-1">Description</label>
								<textarea
									{...register('description')}
									className={`textarea textarea-bordered border-primary focus:border-primary focus:outline-none outline-none bg-transparent h-16 text-sm ${
										errors.description ? 'border-red-500' : ''
									}`}
								/>
								{errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
							</div>

							<div className="flex flex-col">
								<label className="font-medium text-sm mb-1">Priority</label>
								<select
									{...register('priority')}
									className={`select select-sm focus:border-primary focus:outline-none outline-none border-primary bg-transparent h-10 text-sm ${
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
								<label className="font-medium text-sm mb-1">Due Date</label>
								<Controller
									control={control}
									name="dueDate"
									render={({ field: { onChange, onBlur, value } }) => (
										<DatePicker
											dateFormat="d MMM yyyy h:mm aa"
											minDate={new Date()}
											selected={value}
											showTimeSelect
											todayButton="Today"
											dropdownMode="select"
											isClearable
											placeholderText="Select date"
											shouldCloseOnSelect
											onChange={onChange}
											onBlur={onBlur}
											className={`input border-primary focus:border-primary focus:outline-none outline-none bg-transparent h-10 text-sm w-full ${
												errors.dueDate ? 'border-red-500' : ''
											}`}
										/>
									)}
								/>

								{errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate.message}</p>}
							</div>

							{todoToEdit && (
								<div className="flex flex-col">
									<label className="font-medium text-sm mb-1">Status</label>
									<select
										{...register('status')}
										className={`select select-sm focus:border-primary focus:outline-none outline-none border-primary bg-transparent h-10 text-sm ${
											errors.status ? 'border-red-500' : ''
										}`}
									>
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
