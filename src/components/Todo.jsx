import SearchFilter from './SearchFilter';
import ThemeSwitcher from './ThemeSwitcher';

const Todo = () => {
	return (
		<div>
			<div className="flex justify-between items-center">
				<h1 className="font-bold text-xl uppercase text-primary">WOW Todo</h1>
				<ThemeSwitcher />
			</div>
			<SearchFilter />
		</div>
	);
};

export default Todo;
