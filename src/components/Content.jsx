import { useState, useRef, useEffect } from "react";

const Content = ({ state, onAddScore, onSetBestScore, onResetGame }) => {
	const imagesData = require.context("../image/zodiac", false, /.jpg$/);

	const images = imagesData.keys().map((key, i) => ({
		id: i,
		name: key.match(/(?<=\.\/)[^.]+/g)[0],
		url: imagesData(key),
	}));

	const [isGameOver, setGameOver] = useState(false);
	const [activeId, setActiveId] = useState(null);
	const [clickedSigns, setClickedSigns] = useState([]);
	const [items, setItems] = useState(images);
	const [height, setHeight] = useState(null);

	const ref = useRef(null);

	useEffect(() => {
		window.addEventListener("resize", handleChangeHeight);

		return () => {
			window.removeEventListener("resize", handleChangeHeight);
		};
	}, []);

	const handleReset = () => {
		setGameOver(false);
		setActiveId(false);
		setClickedSigns([]);
		setItems(images);
	};

	const shuffle = array => {
		const newArray = array.slice();

		for (let i = 0; i < array.length - 2; i++) {
			let j = Math.floor(i + Math.random() * (array.length - 1 - i + 1));
			[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
		}

		return newArray;
	};

	const handleChangeHeight = () => setHeight(ref.current.scrollHeight);

	const handleCheckClickedSigns = sign => {
		setActiveId(null);
		clickedSigns.find(item => item === sign)
			? setGameOver(true)
			: handleAddScore(sign);
		setItems(shuffle(items));
	};

	const handleAddScore = sign => {
		onAddScore();
		setClickedSigns([...clickedSigns, sign]);
	};

	const handleResetScore = () => {
		onSetBestScore();
		handleReset();
		console.log("123");
	};

	const handleResetGame = () => {
		onResetGame();
		handleReset();
		console.log("123");
	};

	const List = items.map(item => {
		return (
			<li className="list" key={item.id}>
				<button
					type="button"
					className={activeId === item.id ? "press" : ""}
					onAnimationEnd={() => handleCheckClickedSigns(item.name)}
					onClick={() => setActiveId(item.id)}
				>
					<img src={item.url} alt={item.name} />
					<p>{item.name}</p>
				</button>
			</li>
		);
	});

	return (
		<div
			className={`content ${
				isGameOver || state.score === 12 ? "blur" : ""
			}`}
			onScroll={handleChangeHeight}
		>
			<div>
				<div className="wrap" style={{ height: height }}></div>
				<Menu
					state={state}
					activeId={activeId}
					handleResetGame={handleResetGame}
					handleResetScore={handleResetScore}
					setActiveId={setActiveId}
				/>
				<ul ref={ref}>{List}</ul>
			</div>
		</div>
	);
};

const Menu = ({
	state,
	activeId,
	handleResetGame,
	handleResetScore,
	setActiveId,
}) => {
	return (
		<div className="menu">
			<h4>
				{state.score === 12
					? " You win the Game!"
					: "You cannot click twice on the same card!"}
			</h4>
			<button
				type="button"
				className={activeId ? "press" : ""}
				onAnimationEnd={
					state.score === 12 ? handleResetGame : handleResetScore
				}
				onClick={() => {
					setActiveId(true);
				}}
			>
				{state.score === 12 ? "Play Again" : "Try Again"}
			</button>
		</div>
	);
};

export default Content;
