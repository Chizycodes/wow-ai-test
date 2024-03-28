import { useEffect, useState } from 'react';
import SearchFilter from '../components/SearchFilter';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { Draggable, DragDropContext, Droppable } from '@hello-pangea/dnd';
import NoItemFound from '../assets/no-item-found.svg';
import TodoItem from '../components/TodoItem';
import { IoIosAdd } from 'react-icons/io';
import AddUpdateModal from '../components/AddUpdateModal';
import { v4 as uuid } from 'uuid';

const Todo = () => {
	const id = uuid();
	const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('wowTodos')) ?? []);
	const [filteredList, setFilteredList] = useState(todoList);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [todoToEdit, setTodoToEdit] = useState(null);
	const [todoOpen, setTodoOpen] = useState(null);

	// Search and Filter Logic
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState('');
	const [priorityFilter, setPriorityFilter] = useState('');

	// Function to apply filter
	const handleFilter = () => {
		const filtered = todoList.filter((todo) => todo.status === statusFilter || todo.priority === priorityFilter);
		setFilteredList(filtered);
	};

	// Function to reset filters
	const resetFilters = () => {
		setStatusFilter('');
		setPriorityFilter('');
		setFilteredList(todoList);
	};

	// Function to add a task to the list
	const handleAddTodo = (todo) => {
		setTodoList((prev) => [...prev, { ...todo, status: 'pending', id, dateCreated: new Date() }]);
		setIsModalOpen(false);
	};

	// Function to update an existing task
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

	// Function to delete an existing task
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
		// Update task list and save updated list to local storage
		setFilteredList(todoList);
		localStorage.setItem('wowTodos', JSON.stringify(todoList));
	}, [todoList]);

	const onDragEnd = (result) => {
		console.log(result);
		if (!result.destination) return;
		const items = Array.from(todoList);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setTodoList(items);
	};

	return (
		<div className="h-full">
			<div>
				<div className="flex justify-between items-center">
					<h1 className="font-bold text-xl uppercase text-primary">WOW Todo</h1>
					{/* <ThemeSwitcher /> */}
				</div>
				<SearchFilter
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					setStatusFilter={setStatusFilter}
					setPriorityFilter={setPriorityFilter}
					statusFilter={statusFilter}
					priorityFilter={priorityFilter}
					handleFilter={handleFilter}
					resetFilters={resetFilters}
				/>
			</div>
			<div className="h-[70%] mt-5 overflow-y-auto">
				{filteredList.length > 0 ? (
					<div className="flex flex-col">
						<DragDropContext onDragEnd={onDragEnd}>
							<Droppable droppableId="todo-list">
								{(provided) => (
									<div ref={provided.innerRef} {...provided.droppableProps}>
										{filteredList.map((todo, index) => (
											<Draggable key={todo.id} draggableId={todo.id} index={index}>
												{(provided) => (
													<div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
														<TodoItem
															index={index}
															todo={todo}
															handleDelete={handleDelete}
															setTodoToEdit={setTodoToEdit}
															todoOpen={todoOpen}
															setTodoOpen={setTodoOpen}
														/>
													</div>
												)}
											</Draggable>
										))}
									</div>
								)}
							</Droppable>
						</DragDropContext>
					</div>
				) : (
					<div className="flex justify-center mt-10">
						<img src={NoItemFound} />
					</div>
				)}
			</div>

			<div
				className="w-12 h-12 bg-primary rounded-full absolute bottom-4 right-4 z-10 text-white flex items-center justify-center font-2xl cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
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
					todoToEdit={todoToEdit}
				/>
			)}
		</div>
	);
};

export default Todo;
