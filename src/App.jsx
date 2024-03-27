import './App.css';
import Todo from './components/Todo';

function App() {
	return (
		<div className="w-screen h-screen flex justify-center bg-slate-100 py-5">
			<div className="h-full max-w-[600px] w-full shadow-md p-4 bg-white rounded-lg relative">
				<Todo />
			</div>
		</div>
	);
}

export default App;
