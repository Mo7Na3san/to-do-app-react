import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToDoCard from "./ToDo";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext, useEffect } from "react";
import { ToDosContext } from "../contexts/toDosContext.js";

export default function SimpleContainer() {
	const { updateToDos, setTodos } = useContext(ToDosContext); // ✅ get from context
	const [currentTodoTitle, setCurrentTodoTitle] = useState("");
	gi;

	// handle display Tasks
	const [displayFilter, setDisplayFilter] = useState("all");

	function changeDisplayFilter(event, newFilter) {
		if (newFilter !== null) {
			// prevent null on deselect
			setDisplayFilter(newFilter);
		}
	}

	let filteredTodos = updateToDos;
	if (displayFilter === "completed") {
		filteredTodos = updateToDos.filter((todo) => todo.completed);
	} else if (displayFilter === "not_completed") {
		filteredTodos = updateToDos.filter((todo) => !todo.completed);
	}
	const todoCards = filteredTodos.map((todo) => (
		<ToDoCard
			id={todo.id}
			key={todo.id}
			props={todo}
			handleTaskDone={handleTaskDone}
		/>
	));
	function handleAddNewTask() {
		const newTask = {
			id: uuidv4(),
			title: currentTodoTitle,
			details: "details about New Task",
			completed: false,
		};
		const updatedTodos = [...updateToDos, newTask];
		setTodos(updatedTodos);
		localStorage.setItem("toDos", JSON.stringify(updatedTodos));
		setCurrentTodoTitle("");
	}

	// handle render the tasks if avaliable in local storage
	useEffect(() => {
		const storedTodos = localStorage.getItem("toDos") ?? "[]";
		if (storedTodos) {
			setTodos(JSON.parse(storedTodos));
		}
	}, []);
	function handleOnChangeTitle(event) {
		setCurrentTodoTitle(event.target.value);
	}
	function handleTaskDone(id) {
		const updatedTodos = updateToDos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(updatedTodos);
		localStorage.setItem("toDos", JSON.stringify(updatedTodos));
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="sm" style={{}}>
				<Card>
					<CardContent
						style={{ backgroundColor: "", padding: "0 !important" }}
						sx={{
							maxHeight: "90vh",
							overflow: "auto",
						}}
					>
						<div
							style={{
								paddingBottom: "25px",
							}}
						>
							<Typography
								variant="h2"
								gutterBottom
								sx={{ color: "text.primary", fontWeight: "bold" }}
							>
								My tasks
							</Typography>
							<Divider>FOLLOW YOUR TASKS</Divider>

							{/* Toggle button list */}
							<ToggleButtonGroup
								aria-label="text alignment"
								style={{ marginTop: "20px" }}
								onChange={changeDisplayFilter}
								value={displayFilter}
								exclusive
								sx={{ color: Text.primary }}
								color="primary"
							>
								<ToggleButton value="all">All</ToggleButton>
								<ToggleButton value="completed">Done</ToggleButton>
								<ToggleButton value="not_completed">Not done yet</ToggleButton>
								{/* <ToggleButton value="priority">Priority</ToggleButton> */}
							</ToggleButtonGroup>
							{/* ===== Toggle button list ===== */}
						</div>
						{/* To Do cards */}
						{displayFilter === "all" && filteredTodos.length === 0 && (
							<Typography variant="body2" color="text.secondary">
								No tasks to show
							</Typography>
						)}
						{displayFilter === "not_completed" &&
							filteredTodos.length === 0 &&
							updateToDos.length > 0 && (
								<Typography variant="body2" color="text.secondary">
									All tasks are done
								</Typography>
							)}
						<div
							style={{
								maxHeight: "40vh", // restrict height
								overflowY: "auto", // enable vertical scrolling
								overflowX: "hidden", // prevent horizontal scroll
								paddingRight: "8px",
								borderRadius: "5px",
								padding: "10px",
								zIndex: 1,
								backgroundColor: "#f2f2f2ff",
								border: "1px solid #cccccc",
								display: filteredTodos.length === 0 ? "none" : "block",
							}}
						>
							{todoCards}
						</div>
						{/* ====== To Do cards ====== */}
						<>
							<Card
								sx={{ minWidth: 275, boxShadow: 0 }}
								style={{
									padding: "16px",
									backgroundColor: "transparent",
									position: "relative",
								}}
							>
								<Grid container spacing={2}>
									<Grid
										size={8}
										sx={{ justifyContent: "center", alignContent: "center" }}
									>
										{" "}
										<TextField
											id="outlined-basic"
											label="Task Title"
											variant="outlined"
											size="8"
											sx={{ width: "100%" }}
											onChange={handleOnChangeTitle}
											value={currentTodoTitle}
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													e.preventDefault(); // prevent form submit/reload
													handleAddNewTask();
												}
											}}
										/>
									</Grid>
									<Grid size={4}>
										{" "}
										<Button
											sx={{ width: "100%", height: "100%" }}
											variant="contained"
											color="primary"
											type="submit"
											size="4"
											onClick={() => {
												handleAddNewTask();
											}}
											disabled={!currentTodoTitle.trim()}
										>
											Add Task
										</Button>
									</Grid>
								</Grid>
							</Card>
						</>
					</CardContent>
				</Card>
			</Container>
		</React.Fragment>
	);
}
