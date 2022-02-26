import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";
import Typography from "@mui/material/Typography";
import { db } from "./Firebase";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function TodoListItem({ todo, inprogress, id }) {
	function toggleInProgress() {
		db.collection("todos").doc(id).update({
			inprogress: !inprogress,
		});
	}

	function deleteTodo() {
		db.collection("todos").doc(id).delete();
	}
	return (
		<div style={{ display: "flex" }}>
			<div style={{ wordWrap: "break-word", width: 230 }}>
				<ListItem sx={{ color: "#2c3e50" }}>
					<ListItemText
						primary={
							<Typography variant="h1" color ="text.primary" sx={{ fontSize: "18px" }}>
								{inprogress ? <>{todo}</> : <s>{todo}</s> 
								
								}
							</Typography>
						}
						secondary={
							inprogress ? (
								<Typography
									sx={{ color: "#e74c3c", fontSize: "14px" }}
								>
									In Progress
								</Typography>
							) : (
								<Typography
									sx={{ color: "#27ae60", fontSize: "14px" }}
								>
									Completed
								</Typography>
							)
						}
					/>
				</ListItem>
			</div>
			<IconButton
				onClick={toggleInProgress}
				variant="contained"
				color="success"
				size="small"
				sx={{ width: 60, height: 30, mt: 2, ml: -1 }}
			>
				{inprogress ? (
					<DoneIcon sx={{ color: "#e74c3c" }} />
				) : (
					<DoneAllIcon />
				)}
			</IconButton>
			<IconButton
				onClick={deleteTodo}
				variant="contained"
				color="error"
				size="small"
				sx={{ height: 30, mt: 2, ml: 0.5 }}
			>
				<DeleteForeverIcon />
			</IconButton>
		</div>
	);
}
