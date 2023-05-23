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

	const handleAddScore = () =>
		setState({
			...state,
			score: state.score + 1,
		});

	const handleSetBestScore = () =>
		setState({
			score: 0,
			BestScore:
				state.BestScore < state.score ? state.score : state.BestScore,
		});

	const handleResetGame = () => setState(initialData);

	return (
		<>
			<Header state={state} />
			<Content
				state={state}
				handleResetGame={handleResetGame}
				handleSetBestScore={handleSetBestScore}
				handleAddScore={handleAddScore}
			/>
			<Footer />
		</>
	);
};

export default App;
