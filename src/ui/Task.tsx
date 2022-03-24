import { memo } from "react";
import type { TodoState } from "../core/features/tasks/tasksSlice"
import { makeStyles } from "../theme";
import { toggleTaskDone, deleteTask, toggleTaskSelected } from "../core/features/tasks/tasksSlice";
import { useDispatch } from "react-redux";
import { useConstCallback } from "powerhooks/useConstCallback";

type TaskProps = TodoState["value"][number];

export const Task = memo((props: TaskProps) => {
	const { description, id, isDone, isSelected } = props;
	const dispatch = useDispatch();

	const handleDeleteTask = useConstCallback((e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
		e.stopPropagation();
		dispatch(deleteTask(id));
	})

	const handleToggleTaskIsDone = useConstCallback((e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
		e.stopPropagation();
		dispatch(toggleTaskDone(id));
	})

	const handleToggleTaskSelected = useConstCallback(()=>{
		dispatch(toggleTaskSelected(id));
	})

	const { classes } = useStyles({ isDone, isSelected });

	return <div onClick={handleToggleTaskSelected} className={classes.root}>
		<input readOnly={true} checked={isDone} onClick={handleToggleTaskIsDone} type="checkbox" />
		<p className={classes.description}>{description}</p>
		<p onClick={handleDeleteTask} className={classes.deleteButton}>X</p>
	</div>

})

const useStyles = makeStyles<{ isDone: boolean; isSelected: boolean }>()(
	(theme, { isDone, isSelected }) => ({
		"root": {
			"backgroundColor": isSelected ? "red" : undefined,
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