import "./App.css";
import SimpleContainer from "./components/ToDoList.js";
import { createTheme, ThemeProvider } from "@mui/material";
import { ToDosContext } from "./contexts/toDosContext.js";
import { useState } from "react";
const theme = createTheme({
	typography: {
		fontFamily: "Oswald",
	},
});

function App() {
	const [updateToDos, setTodos] = useState([]);
	return (
		<ThemeProvider theme={theme}>
			<div
				className="App"
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					minHeight: "100vh",
					backgroundColor: "#02245eff",
					padding: "50px 0",
				}}
			>
				<header className=""></header>
				<ToDosContext.Provider value={{ updateToDos, setTodos }}>
					<SimpleContainer />
				</ToDosContext.Provider>
			</div>
		</ThemeProvider>
	);
}

export default App;
