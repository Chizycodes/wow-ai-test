import { useEffect, useState, useId } from 'react';
import SearchFilter from './SearchFilter';
import ThemeSwitcher from './ThemeSwitcher';
import NoItemFound from '../assets/no-item-found.svg';
// import todolist from '../utils/data';
import TodoItem from './TodoItem';
import { IoIosAdd } from 'react-icons/io';
import AddUpdateModal from './AddUpdateModal';
import { v4 as uuid } from 'uuid';

const Todo = () => {
	const id = uuid();
	const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('wowTodos')) ?? []);
	const [filteredList, setFilteredList] = useState(todoList);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isUpdate, setIsUpdate] = useState({});
	const [todoToEdit, setTodoToEdit] = useState(null);

	// Search Logic
	const [searchQuery, setSearchQuery] = useState('');

	const handleAddTodo = (todo) => {
		setTodoList((prev) => [...prev, { ...todo, status: 'pending', id, dateCreated: new Date() }]);
		setIsModalOpen(false);
	};

	const handleEdit = (todo) => {
		const updatedTodo = todoList.map((t) => {
			if (t.id === todo.id) {
				return { ...todo, lastUpdated: new Date() };
			}
			return t;
		});
		setTodoList(updatedTodo);
		setTodoToEdit(null);
	};

	const handleDelete = (todo) => {
		const updatedTodo = todoList.filter((t) => t.id !== todo.id);
		setTodoList(updatedTodo);
	};

	const handleClose = () => {
		setIsModalOpen(false);
		setTodoToEdit(null);
	};

	useEffect(() => {
		const filteredTodoList = todoList.filter((todo) => todo.title.toLowerCase().includes(searchQuery.toLowerCase()));
		setFilteredList(filteredTodoList);
	}, [searchQuery]);

	useEffect(() => {
		setFilteredList(todoList);
		localStorage.setItem('wowTodos', JSON.stringify(todoList));
	}, [todoList]);

	return (
		<div className="h-full">
			<div>
				<div className="flex justify-between items-center">
					<h1 className="font-bold text-xl uppercase text-primary">WOW Todo</h1>
					<ThemeSwitcher />
				</div>
				<SearchFilter todoList={todoList} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			</div>
			<div className="h-[70%] mt-5 overflow-y-auto">
				{filteredList.length > 0 ? (
					<div className="flex flex-col">
						{filteredList.map((todo) => (
							<TodoItem key={todo.id} todo={todo} handleDelete={handleDelete} setTodoToEdit={setTodoToEdit} />
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

			{(isModalOpen || todoToEdit) && (
				<AddUpdateModal
					isOpen={isModalOpen || todoToEdit}
					handleClose={handleClose}
					handleAddTodo={handleAddTodo}
					handleEditTodo={handleEdit}
					isUpdate={isUpdate}
					todoToEdit={todoToEdit}
				/>
			)}
		</div>
	);
};

export default Todo;
