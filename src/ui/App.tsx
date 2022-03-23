import { useState } from "react";
import type { RootState } from "../core/store"
import { useSelector, useDispatch } from "react-redux"
//import { decrement, increment, incrementByAmount } from "../core/features/tasks/tasksSlice";
import { useConstCallback } from "powerhooks/useConstCallback";
import { Task } from "./Task";
import { addTask, deleteAllTasks } from "../core/features/tasks/tasksSlice";
import { makeStyles } from "../theme";

export function App() {
	const dispatch = useDispatch();
	const tasks = useSelector((state: RootState) => state.todoList.value);
	const [textInput, setTextInput] = useState("");

	const handleChange = useConstCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
		setTextInput(e.target.value);
	});

	const handleSubmit = useConstCallback((e: React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault();

		dispatch(addTask(textInput));
		setTextInput("");
	});


	const handleDeleteAll = useConstCallback(()=>{
		dispatch(deleteAllTasks());
	});


	const { classes } = useStyles();

	return <div className={classes.root}>
		<h1>Redux Toolkit Todo List</h1>
		<form className={classes.form} onSubmit={handleSubmit}>
			<input onChange={handleChange} type="text" value={textInput} />
		</form>
		<button onClick={handleDeleteAll}>Delete All Tasks</button>

		<div>
			{
				tasks.map(task => <Task key={task.id} {...task} />).reverse()
			}
		</div>

	</div>

}

const useStyles = makeStyles()(
	theme => ({
		"root": {
			"display": "flex",
			"flexDirection": "column",
			"alignItems": "center"

		},
		"form": {
			"marginBottom": theme.spacing(3)

		}
	})

)