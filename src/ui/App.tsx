import type { RootState } from "../core/store"
import { useSelector } from "react-redux"
//import { decrement, increment, incrementByAmount } from "../core/features/tasks/tasksSlice";
import { makeStyles } from "../theme";
import { Tasks } from "./Tasks";
import { CommandCell } from "./CommandCell";

export function App() {
	const tasks = useSelector((state: RootState) => state.todoList.value);


	const { classes } = useStyles();

	return <div className={classes.root}>
		<h1>Redux Toolkit Todo List</h1>
		<CommandCell />
		<Tasks tasks={tasks} />

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