import { SearchIcon } from '../assets/SvgIcons';
import { IoFilter } from 'react-icons/io5';

const statusOptions = ['pending', 'in-progress', 'completed', ''];
const priorityOptions = ['low', 'medium', 'high', ''];

const SearchFilter = ({
	searchQuery,
	setSearchQuery,
	setStatusFilter,
	statusFilter,
	setPriorityFilter,
	priorityFilter,
	handleFilter,
	resetFilters,
}) => {
	return (
		<div className="mt-4 flex gap-4 justify-end items-center">
			<label className="input input-bordered input-sm flex items-center gap-2 border-primary focus:outline-none bg-transparent rounded-full max-w-80 w-[80%]">
				<input
					type="text"
					className="grow text-xs"
					placeholder="Search Task"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<SearchIcon />
			</label>

			<div className="dropdown dropdown-hover dropdown-left">
				<div tabIndex={0} role="button" title="Filter" className=" m-1 cursor-pointer">
					<IoFilter size={20} />
				</div>
				<div tabIndex={0} className="dropdown-content z-[20] menu px-3 py-4 shadow-md bg-slate-50 rounded-box w-52">
					<p className="mb-1 font-medium text-xs">Filter by Status</p>
					{/* Status Filter */}
					<div className="flex flex-wrap gap-2">
						{statusOptions.map((status) => (
							<div key={status} className="flex items-center gap-1">
								<input
									type="radio"
									id={status || 'allStatus'}
									name="statusFilter"
									className="radio radio-primary radio-xs"
									checked={status === statusFilter}
									onChange={() => setStatusFilter(status)}
								/>

								<label htmlFor={status || 'allStatus'} className="text-xs">
									{status ? status : 'all'}
								</label>
							</div>
						))}
					</div>

					<p className="mt-3 mb-1 font-medium text-xs">Filter by Priority</p>
					{/* Priority Filter */}
					<div className="flex flex-wrap gap-2">
						{priorityOptions.map((priority) => (
							<div key={priority} className="flex items-center gap-1">
								<input
									type="radio"
									id={priority || 'allPriority'}
									name="priorityFilter"
									className="radio radio-primary radio-xs"
									checked={priority === priorityFilter}
									onChange={() => setPriorityFilter(priority)}
								/>
								<label htmlFor={priority || 'allPriority'} className="text-xs">
									{priority ? priority : 'all'}
								</label>
							</div>
						))}
					</div>

					<div className="mt-2 flex items-center justify-end gap-4">
						{/* Reset Filters Button */}
						<button onClick={resetFilters} className="text-primary hover:underline">
							Reset
						</button>
						{/* Reset Filters Button */}
						<button onClick={handleFilter} className="btn btn-xs btn-primary bg-primary text-white">
							Apply
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchFilter;
