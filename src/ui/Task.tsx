import { memo } from "react";
import type { TodoState } from "../core/features/tasks/tasksSlice"
import { makeStyles } from "../theme";
import {toggleTaskDone, deleteTask} from "../core/features/tasks/tasksSlice";
import { useDispatch } from "react-redux";
import { useConstCallback } from "powerhooks/useConstCallback";

type TaskProps = TodoState["value"][number];

export const Task = memo((props: TaskProps) => {
	const { description, id, isDone } = props;
	const dispatch = useDispatch();

	const handleDeleteTask = useConstCallback(()=>{
		dispatch(deleteTask(id));
	})

	const handleToggleTaskIsDone = useConstCallback(()=>{
		dispatch(toggleTaskDone(id));
	})

	const { classes } = useStyles({isDone});

	return <div className={classes.root}>
		<input checked={isDone} onClick={handleToggleTaskIsDone} type="checkbox" />
		<p className={classes.description}>{description}</p>
		<p onClick={handleDeleteTask} className={classes.deleteButton}>X</p>
	</div>

})

const useStyles = makeStyles<{isDone: boolean}>()(
	(theme, {isDone}) => ({
		"root": {
			"minWidth": 600,
			"display": "flex",
			"justifyContent": "space-between",
			"border": "solid white 1px",
			"alignItems": "center",
			"padding": theme.spacing({
				"rightLeft": `${theme.spacing(3)}px`,
				"topBottom": `${theme.spacing(2)}px`
			}),
			...theme.spacing.topBottom("margin", `${theme.spacing(3)}px`)

		},
		"description": {
			"textDecoration": isDone ? "line-through" : undefined

		},
		"deleteButton": {
			"cursor": "pointer"

		}

	})
)