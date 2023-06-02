import { useState } from "react";

import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

const App = () => {
	const initialData = {
		score: 0,
		BestScore: 0,
	};

	const [state, setState] = useState(initialData);
	const [showInfo, setShowInfo] = useState(true);
	const [isActive, setActive] = useState(false);

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

	const handleHideInfo = () => {
		setShowInfo(false);
		setActive(false);
	};

	return (
		<div
			className={`app
		 ${showInfo ? "blur" : ""}
		 `}
		>
			<div className="wrap"></div>
			<Info
				activeAnimation={isActive}
				handleHideInfo={handleHideInfo}
				onActiveAnimation={setActive}
			/>

			<Header state={state} onShowInfo={setShowInfo} />
			<Content
				state={state}
				handleResetGame={handleResetGame}
				handleSetBestScore={handleSetBestScore}
				handleAddScore={handleAddScore}
			/>
			<Footer />
		</div>
	);
};

const Info = ({ activeAnimation, handleHideInfo, onActiveAnimation }) => (
	<div className="info">
		<h2>Zodiac Memory</h2>
		<h3>How to Play</h3>
		<p>
			There are 12 cards in total, the goal of the game is to click on
			different cards in each round to get points
		</p>

		<h3>Rules</h3>
		<ul>
			<li>Shuffle after each click</li>
			<li>Don't tap the same card twice</li>
		</ul>
		<button
			type="button"
			className={activeAnimation ? "press" : ""}
			onAnimationEnd={handleHideInfo}
			onClick={() => onActiveAnimation(true)}
		>
			Let's Play
		</button>
	</div>
);

export default App;
