import { useState } from "react";

const Content = ({
	state,
	handleAddScore,
	handleSetBestScore,
	handleResetGame,
}) => {
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

	const onCheckClickedSigns = sign => {
		setActiveId(null);
		clickedSigns.find(item => item === sign)
			? onResetScore()
			: onAddScore(sign);
		setItems(shuffle(items));
	};

	const onAddScore = sign => {
		handleAddScore();
		setClickedSigns([...clickedSigns, sign]);
	};

	const onResetScore = () => {
		handleSetBestScore();
		setGameOver(true);
	};

	const onResetGame = () => {
		handleResetGame();
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

	const List = items.map(item => {
		return (
			<li className="list" key={item.id}>
				<button
					type="button"
					className={activeId === item.id ? "press" : ""}
					onAnimationEnd={() => onCheckClickedSigns(item.name)}
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
				isGameOver || state.BestScore === 12 ? "blur" : ""
			}`}
		>
			<div className="wrap">
				<div className="menu">
					<h4>
						{state.BestScore === 12
							? "You win the Game!"
							: "You click on the same card twice!"}
					</h4>
					<button
						type="button"
						className={activeId ? "press" : ""}
						onAnimationEnd={onResetGame}
						onClick={() => setActiveId(true)}
					>
						Play Again
					</button>
				</div>
			</div>
			<ul>{List}</ul>
		</div>
	);
};

export default Content;
