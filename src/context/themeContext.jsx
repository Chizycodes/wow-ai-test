import React, { useContext, createContext, useState } from 'react';

const ThemeContext = createContext('');

const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'light');

	const toggleTheme = (e) => {
		e.preventDefault();
		const newTheme = theme === 'light' ? 'dark' : 'light'; // Toggle between light and dark themes
		setTheme(newTheme);
		console.log(newTheme);
		localStorage.setItem('theme', newTheme);
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
