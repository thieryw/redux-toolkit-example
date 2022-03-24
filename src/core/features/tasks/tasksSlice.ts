import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createId } from "../../../tools/createId";
import { flip } from "tsafe/flip";

export type TodoState = {
	value: {
		description: string;
		isDone: boolean;
		id: string;
		isSelected: boolean;
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
			"id": createId(),
			"isSelected": false
		},
		{
			"description": "cook food",
			"isDone": false,
			"id": createId(),
			"isSelected": false
		},
		{
			"description": "eat food",
			"isDone": false,
			"id": createId(),
			"isSelected": false
		},

	]
};

export const {name, actions, reducer} = createSlice({
	"name": "todoList",
	initialState,
	"reducers": {
		"addTask": (state, action: PayloadAction<TodoState["value"][number]["description"]>) => {
			state.value.push({
				"description": action.payload,
				"id": createId(),
				"isDone": false,
				"isSelected": false
			});
		},
		"toggleTaskDone": (state, action: PayloadAction<string>) => {
			flip(state.value[getTaskIndexById(state.value, action.payload )], "isDone");
		},

		"toggleTaskSelected": (state, action: PayloadAction<string>) => {
			flip(state.value[getTaskIndexById(state.value, action.payload)], "isSelected");
		},

		"deleteTask": (state, action: PayloadAction<string>) => {
			state.value.splice(getTaskIndexById(state.value, action.payload), 1);

		},
		"selectOrUnSelectAll": (state, action : PayloadAction<"select" | "unselect">) => {
			state.value.forEach(task => {
				switch(action.payload){
					case "select": 
						if(task.isSelected) return;
						task.isSelected = true;
						return;
					case "unselect": 
						if(!task.isSelected) return;
						task.isSelected = false;
				}
			})
		},
		"deleteSelectedTasks": (state) => {
			state.value = state.value.filter(
				({ isSelected }) => !isSelected
			);
		},
		"doneOrUndoneSelectedTasks": (state, action: PayloadAction<"done" | "undone">) => {
			state.value.forEach(task => {
				if (!task.isSelected) {
					return;
				};
				switch (action.payload) {
					case "done": task.isDone = true; return;
					case "undone": task.isDone = false;
				}
			});
		},
		"deleteAllTasks": (state) => {
			state.value = [];
		}
	}
});



export const {
	addTask,
	deleteAllTasks,
	deleteTask,
	toggleTaskDone,
	deleteSelectedTasks,
	selectOrUnSelectAll,
	toggleTaskSelected,
	doneOrUndoneSelectedTasks
} = actions;