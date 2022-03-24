import { memo } from "react";
import type { TodoState } from "../core/features/tasks/tasksSlice";
import { Task } from "./Task";


export type TasksProps = {
	tasks: TodoState["value"];
};


export const Tasks = memo((props: TasksProps) => {
	const { tasks } = props;

	return <div>
		{
			tasks.map(task => <Task key={task.id} {...task}/>).reverse()
		}
	</div>

})