import { useEffect, useState } from 'react';
import SearchFilter from './SearchFilter';
import ThemeSwitcher from './ThemeSwitcher';
import NoItemFound from '../assets/no-item-found.svg';
import todolist from '../utils/data';
import TodoItem from './TodoItem';
import { IoIosAdd } from 'react-icons/io';

const Todo = () => {
	const [todoList, setTodoList] = useState([]);

	useEffect(() => {
		setTodoList(todolist);
	}, []);
	return (
		<div>
			<div className="flex justify-between items-center">
				<h1 className="font-bold text-xl uppercase text-primary">WOW Todo</h1>
				<ThemeSwitcher />
			</div>
			<SearchFilter />
			<div>
				{todoList.length > 0 ? (
					<div className="flex flex-col gap-4 mt-5">
						{todoList.map((todo) => (
							<div key={todo.id} className="border border-transparent border-b-primary p-2">
								<TodoItem todo={todo} />
							</div>
						))}
					</div>
				) : (
					<div className="flex justify-center mt-10">
						<img src={NoItemFound} />
					</div>
				)}
			</div>

			<div className="w-12 h-12 bg-primary rounded-full absolute bottom-4 right-4 z-10 text-white flex items-center justify-center font-2xl cursor-pointer">
				<IoIosAdd size={120} />
			</div>
		</div>
	);
};

export default Todo;
