import { useContext } from 'react';
import './App.css';
import Todo from './pages/Home';
import { ThemeContext } from './context/themeContext';

function App() {
	const { theme } = useContext(ThemeContext);
	return (
		<div
			className={`w-screen h-screen flex justify-center md:py-5 text-zinc-500 ${
				theme === 'light' ? 'bg-slate-100' : 'bg-dark-bg'
			}`}
		>
			<div
				className={`h-full max-w-[600px] w-full shadow-md p-4 rounded-lg relative overflow-hidden ${
					theme === 'light' ? 'bg-white' : 'bg-dark-card'
				}`}
			>
				<Todo />
			</div>
		</div>
	);
}

export default App;
