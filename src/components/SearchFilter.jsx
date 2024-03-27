import { SearchIcon } from '../assets/SvgIcons';

const SearchFilter = () => {
	return (
		<div className="mt-4">
			<label className="input input-bordered input-sm flex items-center gap-2 border-primary outline-none bg-transparent rounded-full">
				<input type="text" className=" grow" placeholder="Search To-Do" />
				<SearchIcon />
			</label>
		</div>
	);
};

export default SearchFilter;
