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
import { useContext } from "react";
import { ToDosContext } from "../contexts/toDosContext.js";

export default function SimpleContainer() {
	const { updateToDos, setTodos } = useContext(ToDosContext); // ✅ get from context
	const [currentTodoTitle, setCurrentTodoTitle] = useState("");
	const todoCards = updateToDos.map((todo) => (
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
		setTodos([...updateToDos, newTask]);
		setCurrentTodoTitle("");
	}
	function handleOnChangeTitle(event) {
		setCurrentTodoTitle(event.target.value);
	}
	function handleTaskDone(id) {
		const updatedTodos = updateToDos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(updatedTodos);
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
								paddingBottom: "36px",
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

							<>
								<Card
									sx={{ minWidth: 275, boxShadow: 0 }}
									style={{
										marginTop: "5px",
										padding: "16px",
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
											>
												Add Task
											</Button>
										</Grid>
									</Grid>
								</Card>
							</>
							{/* Toggle button list */}
							<ToggleButtonGroup
								aria-label="text alignment"
								style={{ marginTop: "20px" }}
							>
								<ToggleButton value="">All</ToggleButton>
								<ToggleButton value="">Done</ToggleButton>
								<ToggleButton value="">Not done yet</ToggleButton>
							</ToggleButtonGroup>
							{/* ===== Toggle button list ===== */}
						</div>
						{/* To Do cards */}
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
								display: updateToDos.length === 0 ? "none" : "block",
							}}
						>
							{todoCards}
						</div>
						{/* ====== To Do cards ====== */}
					</CardContent>
				</Card>
			</Container>
		</React.Fragment>
	);
}
