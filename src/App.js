import { useState } from "react";

import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

const App = () => {
	const initialData = {
		score: 0,
		BastScore: 0,
	};

	const [state, setState] = useState(initialData);

	const onAddScore = () =>
		setState({
			...state,
			score: state.score + 1,
		});

	const onReSetScore = () =>
		setState({
			score: 0,
			BastScore:
				state.BastScore < state.score ? state.score : state.BastScore,
		});

	return (
		<>
			<Header state={state} />
			<Content onAddScore={onAddScore} reSetScore={onReSetScore} />
			<Footer />
		</>
	);
};

export default App;
