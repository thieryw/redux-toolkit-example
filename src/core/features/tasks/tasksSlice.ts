import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createId } from "../../../tools/createId";
import { flip } from "tsafe/flip";

export type TodoState = {
	value: {
		description: string;
		isDone: boolean;
		id: string;
	}[];
}

function getTaskIndexById(
	tasks: TodoState["value"], id: string
): number{

	const out = tasks.findIndex(task => task.id === id);
	if (out === -1) {
		throw new Error("in adequate id value");
	}
	return out;
}

const initialState: TodoState = {
	"value": [
		{
			"description": "feed the cat",
			"isDone": true,
			"id": createId()
		},
		{
			"description": "cook food",
			"isDone": false,
			"id": createId()
		},
		{
			"description": "eat food",
			"isDone": false,
			"id": createId()
		},

	]
};

export const todoSlice = createSlice({
	"name": "counter",
	initialState,
	"reducers": {
		"addTask": (state, action: PayloadAction<TodoState["value"][number]["description"]>) => {
			state.value.push({
				"description": action.payload,
				"id": createId(),
				"isDone": false
			});
		},
		"toggleTaskDone": (state, action: PayloadAction<string>) => {
			flip(state.value[getTaskIndexById(state.value, action.payload )], "isDone");
		},

		"deleteTask": (state, action: PayloadAction<string>) => {
			state.value.splice(getTaskIndexById(state.value, action.payload), 1);

		},
		"deleteAllTasks": (state) => {
			state.value = [];
		}
	}
});


export const { addTask, deleteAllTasks, deleteTask, toggleTaskDone } = todoSlice.actions;
export const { reducer: todoReducer } = todoSlice;