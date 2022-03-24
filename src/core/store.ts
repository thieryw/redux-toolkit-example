import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./features/tasks/tasksSlice";

export const store = configureStore({
	"reducer": {
		"todoList": reducer

	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;