import { SearchIcon } from '../assets/SvgIcons';
import { IoFilter } from 'react-icons/io5';

const SearchFilter = ({ searchQuery, setSearchQuery }) => {
	return (
		<div className="mt-4 flex gap-4 justify-end items-center">
			<label className="input input-bordered input-sm flex items-center gap-2 border-primary focus:outline-none bg-transparent rounded-full max-w-80 w-[80%]">
				<input
					type="text"
					className="grow"
					placeholder="Search Task"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<SearchIcon />
			</label>
			<div className="cursor-pointer" title="Filter">
				<IoFilter size={20} />
			</div>
		</div>
	);
};

export default SearchFilter;
