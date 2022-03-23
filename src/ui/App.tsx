import { useState } from "react";
import type { RootState } from "../core/store"
import { useSelector, useDispatch } from "react-redux"
import { decrement, increment, incrementByAmount } from "../core/features/counter/counterSlice";
import { useConstCallback } from "powerhooks/useConstCallback";
import { useCallbackFactory } from "powerhooks/useCallbackFactory";

export function App() {
	const dispatch = useDispatch();
	const count = useSelector((state: RootState) => state.counter.value);
	const [numberInput, setNumberInput] = useState(0);

	const incrementFactory = useCallbackFactory((
		[value]: ["increment" | "decrement"]
	)=>{
		switch(value){
			case "increment": dispatch(increment()); break;
			case "decrement": dispatch(decrement()); 
		}
	})

	const onSubmit = useConstCallback((e: React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault();
		dispatch(incrementByAmount(numberInput));
	})

	const onChange = useConstCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
		setNumberInput(parseInt(e.target.value))
	})

	return <div>
		<p>{count}</p>

		<hr />

		<button onClick={incrementFactory("increment")}>
			increment
		</button>
		<button onClick={incrementFactory("decrement")}>
			decrement
		</button>
		<form onSubmit={onSubmit}>
			<input value={numberInput} onChange={onChange} type="number"/>
			<input type="submit" value="increment by amount" />
		</form>

	</div>

}