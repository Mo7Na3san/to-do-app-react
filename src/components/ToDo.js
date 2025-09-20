import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
// importing icons
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineSharpIcon from "@mui/icons-material/ModeEditOutlineSharp";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useContext } from "react";
import { ToDosContext } from "../contexts/toDosContext.js";
import { TextField } from "@mui/material";

export default function ToDoCard({ props, handleTaskDone }) {
	const { updateToDos, setTodos } = useContext(ToDosContext); // ✅ get from context

	// functions to delete the task
	const [openDialog, setOpenDialog] = useState(false);
	function handleTaskDeleteBtn() {
		setOpenDialog(true);
	}
	function handleCloseDialog() {
		setOpenDialog(false);
	}

	function handleConfirmTaskDelete() {
		const filteredTodos = updateToDos.filter((todo) => todo.id !== props.id);
		setTodos(filteredTodos);
		setOpenDialog(false);
		localStorage.setItem("toDos", JSON.stringify(filteredTodos));
	}
	// functions to edit the task
	const [openEditDialog, setOpenEditDialog] = useState(false);
	function handleEditTaskDetailsClick() {
		setOpenEditDialog(true);
	}
	function handleCloseEditDialog() {
		setOpenEditDialog(false);
	}
	const [editedTask, setEditedTask] = useState({
		title: props.title,
		details: props.details,
	});
	function handleOnChangeTask(event) {
		const { name, value } = event.target;
		setEditedTask((prevTask) => ({
			...prevTask,
			[name]: value,
		}));
	}
	function handleSubmitChangesEditTask() {
		const updatedTodos = updateToDos.map((todo) =>
			todo.id === props.id ? { ...todo, ...editedTask } : todo
		);
		// Update the todos
		setTodos(updatedTodos);
		setOpenEditDialog(false);
		localStorage.setItem("toDos", JSON.stringify(updatedTodos));
	}
	return (
		<>
			{/** Delete task Dialog */}
			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Are you sure you want to delete this task? "}{" "}
					<span style={{ fontWeight: "bold" }}>{props.title}</span>
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						If you delete this task, you will not be able to recover it.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog}>Disagree</Button>
					<Button
						autoFocus
						onClick={handleConfirmTaskDelete}
						style={{ color: "#b20000ff" }}
					>
						Agree
					</Button>
				</DialogActions>
			</Dialog>
			{/** ========== Delete task Dialog ==========*/}
			{/** Edit task Dialog */}
			<Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
				<DialogTitle>Edit Task</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To edit this task, please make your changes here.
					</DialogContentText>
					<form id="subscription-form">
						<TextField
							autoFocus
							required
							margin="dense"
							id="name"
							name="title"
							label="Title"
							type="text"
							fullWidth
							variant="standard"
							value={editedTask.title}
							onChange={handleOnChangeTask}
						/>
					</form>
					<form id="subscription-form">
						<TextField
							autoFocus
							required
							margin="dense"
							id="name"
							name="details"
							label="Description"
							type="text"
							fullWidth
							variant="standard"
							value={editedTask.details}
							onChange={handleOnChangeTask}
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseEditDialog}>Cancel</Button>
					<Button
						type="submit"
						form="edit-task-form"
						onClick={handleSubmitChangesEditTask}
					>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
			{/** ========== Edit task Dialog ==========*/}
			<Card
				className="card"
				sx={{ minWidth: 275 }}
				style={{
					marginTop: "20px",
					borderBottom: props.completed
						? "#4caf50 5px solid"
						: "#b20000ff 5px solid",
					transition: "all 0.3s ease",
					zIndex: 2,
					color: "#ffffffff",
					backgroundColor: "#311b92",
				}}
			>
				<Grid container spacing={2}>
					<Grid size={6}>
						<CardContent>
							<Typography
								variant="h4"
								gutterBottom
								sx={{
									color: "text.primary",
									textAlign: "left",
									marginBottom: "0px",
									// eslint-disable-next-line no-dupe-keys
									color: "#ffffffff",
									textDecoration: props.completed ? "line-through" : "none",
								}}
							>
								{props.title}
							</Typography>{" "}
							<Typography
								variant="h6x"
								gutterBottom
								sx={{
									color: "text.primary",
									display: "block",
									textAlign: "left",
									marginBottom: "0px",
									width: "100%",
									color: "#ffffffff",
								}}
							>
								{props.details}
							</Typography>
						</CardContent>{" "}
					</Grid>
					<Grid size={6}>
						{" "}
						<CardContent
							sx={{
								textAlign: "center",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "space-between",
								margin: "auto",
								padding: "auto",
								height: "100%",
							}}
						>
							<CheckSharpIcon
								sx={{
									fontSize: 30,
									color: props.completed ? "#ffffff" : "#ffffff",
									backgroundColor: props.completed ? "#4caf50" : "#ffffff",
									border: "3px solid #4caf50",
									margin: "auto",
									height: "40px",
									width: "40px",
									cursor: "pointer",
									borderRadius: "50%",
									padding: "3px",
									transition: "all 0.1s ease",
								}}
								onClick={() => handleTaskDone(props.id)}
							/>
							<ModeEditOutlineSharpIcon
								sx={{
									fontSize: 30,
									color: "#4caf50",
									margin: "auto ",
									backgroundColor: "#ffffff",
									borderRadius: "50%",
									border: "3px solid #4caf50",
									height: "40px",
									width: "40px",
									cursor: "pointer",
									padding: "5px",
								}}
								onClick={handleEditTaskDetailsClick}
							/>
							<DeleteForeverIcon
								sx={{
									fontSize: 30,
									color: "#b20000ff",
									border: "3px solid #b20000ff",
									margin: "auto ",
									backgroundColor: "#ffffffff",
									borderRadius: "50%",
									height: "40px",
									width: "40px",
									cursor: "pointer",
									padding: "4px",
								}}
								onClick={handleTaskDeleteBtn}
							/>
						</CardContent>{" "}
					</Grid>
				</Grid>
			</Card>
		</>
	);
}
