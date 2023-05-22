import { useState } from "react";

import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

const App = () => {
	const initialData = {
		score: 0,
		BestScore: 0,
	};

	const [state, setState] = useState(initialData);

	const onAddScore = () =>
		setState({
			...state,
			score: state.score + 1,
		});

	const onResetScore = () => {
		setState({
			score: 0,
			BestScore:
				state.BestScore < state.score ? state.score : state.BestScore,
		});
	};

	return (
		<>
			<Header state={state} />
			<Content onAddScore={onAddScore} onResetScore={onResetScore} />
			<Footer />
		</>
	);
};

export default App;
