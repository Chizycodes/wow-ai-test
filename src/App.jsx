import './App.css';
import Todo from './components/Todo';

function App() {
	return (
		<div className="w-screen min-h-screen flex justify-center bg-slate-100 py-5">
			<div className="min-h-full max-w-[600px] w-full shadow-md p-4 bg-white rounded-lg">
				<Todo />
			</div>
		</div>
	);
}

export default App;
