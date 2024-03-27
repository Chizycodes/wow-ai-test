import { useEffect, useState } from 'react';
import SearchFilter from './SearchFilter';
import ThemeSwitcher from './ThemeSwitcher';
import NoItemFound from '../assets/no-item-found.svg';
// import todolist from '../utils/data';
import TodoItem from './TodoItem';
import { IoIosAdd } from 'react-icons/io';
import AddUpdateModal from './AddUpdateModal';

const Todo = () => {
	const [todoList, setTodoList] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [todoToEdit, setTodoToEdit] = useState({});

	const handleAddTodo = (todo) => {
		console.log(todo);
	};

	const handleEdit = (todo) => {
		console.log(todo);
		setTodoToEdit(todo);
		setIsModalOpen(true);
	};

	const handleDelete = (todo) => {
		console.log(todo);
	};

	useEffect(() => {}, [todoList]);
	// useEffect(() => {
	//   setIsModalOpen(true);
	// }, [todoToEdit]);
	return (
		<div className="h-full">
			<div>
				<div className="flex justify-between items-center">
					<h1 className="font-bold text-xl uppercase text-primary">WOW Todo</h1>
					<ThemeSwitcher />
				</div>
				<SearchFilter />
			</div>
			<div className="h-[70%] mt-5 overflow-y-auto">
				{todoList.length > 0 ? (
					<div className="flex flex-col">
						{todoList.map((todo) => (
							<TodoItem key={todo.id} todo={todo} handleDelete={handleDelete} handleEdit={handleEdit} />
						))}
					</div>
				) : (
					<div className="flex justify-center mt-10">
						<img src={NoItemFound} />
					</div>
				)}
			</div>

			<div
				className="w-12 h-12 bg-primary rounded-full absolute bottom-4 right-4 z-10 text-white flex items-center justify-center font-2xl cursor-pointer"
				onClick={() => setIsModalOpen(true)}
			>
				<IoIosAdd size={120} />
			</div>

			{isModalOpen && (
				<AddUpdateModal
					isOpen={isModalOpen}
					setIsOpen={setIsModalOpen}
					handleAddTodo={handleAddTodo}
					handleEdit={handleEdit}
					isUpdate={isUpdate}
					todo={todoToEdit}
				/>
			)}
		</div>
	);
};

export default Todo;
