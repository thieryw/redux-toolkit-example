import { memo, useState } from "react";
import { useConstCallback } from "powerhooks/useConstCallback";
import { useCallbackFactory } from "powerhooks/useCallbackFactory";
import { useDispatch } from "react-redux";
import { deleteAllTasks, deleteSelectedTasks, selectOrUnSelectAll, addTask, doneOrUndoneSelectedTasks } from "../core/features/tasks/tasksSlice";
import { makeStyles } from "../theme";

export const CommandCell = memo(() => {
	const [textInput, setTextInput] = useState("");
	const dispatch = useDispatch();

	const handleChange = useConstCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setTextInput(e.target.value);
	});

	const handleSubmit = useConstCallback((e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(addTask(textInput));
		setTextInput("");
	});

	const handleDeleteAll = useConstCallback(() => {
		dispatch(deleteAllTasks());
	});

	const handleTaskSelectOrUnSelectFactory = useCallbackFactory(
		(
			[action]: [Parameters<typeof selectOrUnSelectAll>[0]]
		)=> {
			dispatch(selectOrUnSelectAll(action));
		}
	)

	const handleDeleteSelectedTasks = useConstCallback(()=>{
		dispatch(deleteSelectedTasks());
	})

	const handleDoneOrUndoneSelectedTasksFactory = useCallbackFactory(
		(
			[action]: [Parameters<typeof doneOrUndoneSelectedTasks>[0]]
		) => {
			dispatch(doneOrUndoneSelectedTasks(action));
		}
	);

	const { classes } = useStyles();
	return <div className={classes.root}>
		<form className={classes.form} onSubmit={handleSubmit}>
			<input onChange={handleChange} type="text" value={textInput} />
		</form>
		<div>
			<button onClick={handleDeleteAll}>Delete All Tasks</button>
			<button onClick={handleTaskSelectOrUnSelectFactory("select")}>Select All</button>
			<button onClick={handleTaskSelectOrUnSelectFactory("unselect")}>Un Select All</button>
			<button onClick={handleDeleteSelectedTasks}>Delete Selected Tasks</button>
			<button onClick={handleDoneOrUndoneSelectedTasksFactory("done")}>Selected Tasks Done</button>
			<button onClick={handleDoneOrUndoneSelectedTasksFactory("undone")}>Selected Tasks Undone</button>
		</div>
	</div>
});

const useStyles = makeStyles()(
	theme => ({
		"root": {
			"display": "flex",
			"flexDirection": "column",
			"alignItems": "center"
		},
		"form": {
			"marginBottom": theme.spacing(3),

		}
	})
)