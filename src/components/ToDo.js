import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
// importing icons
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import ChangeCircleTwoToneIcon from "@mui/icons-material/ChangeCircleTwoTone";
import LowPriorityTwoToneIcon from "@mui/icons-material/LowPriorityTwoTone";
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
		// Update the todos
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === props.id ? { ...todo, ...editedTask } : todo
			)
		);
		setOpenEditDialog(false);
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
					backgroundColor: "#02245eff",
					borderBottom: props.completed
						? "#4caf50 5px solid"
						: "#b20000ff 5px solid",
					transition: "all 0.3s ease",
					zIndex: 2,
					color: "#ffffffff",
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
							{" "}
							{props.completed ? (
								<LowPriorityTwoToneIcon
									sx={{
										fontSize: 30,
										color: "#4caf50",
										margin: "auto",
										borderRadius: "50%",
										height: "40px",
										width: "40px",
										cursor: "pointer",
									}}
									onClick={() => handleTaskDone(props.id)}
								/>
							) : (
								<CheckCircleTwoToneIcon
									sx={{
										fontSize: 30,
										color: "#ffffff",
										backgroundColor: "#4caf50",
										margin: "auto",
										borderRadius: "50%",
										height: "40px",
										width: "40px",
										cursor: "pointer",
									}}
									onClick={() => handleTaskDone(props.id)}
								/>
							)}
							<ChangeCircleTwoToneIcon
								sx={{
									fontSize: 30,
									color: "#ffffff",
									margin: "auto ",
									backgroundColor: "#0066ffff",
									borderRadius: "50%",
									height: "40px",
									width: "40px",
									cursor: "pointer",
								}}
								onClick={handleEditTaskDetailsClick}
							/>
							<HighlightOffTwoToneIcon
								sx={{
									fontSize: 30,
									color: "#ffffff",
									margin: "auto ",
									backgroundColor: "#b20000ff",
									borderRadius: "50%",
									height: "40px",
									width: "40px",
									cursor: "pointer",
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
