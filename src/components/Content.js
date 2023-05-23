import { useState, useRef, useEffect } from "react";

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
	const [height, setHeight] = useState(null);

	const ref = useRef(null);

	useEffect(() => {
		window.addEventListener("resize", onChangeHeight);

		return () => {
			window.removeEventListener("resize", onChangeHeight);
		};
	}, []);

	const onCheckClickedSigns = sign => {
		setActiveId(null);
		clickedSigns.find(item => item === sign)
			? setGameOver(true)
			: onAddScore(sign);
		setItems(shuffle(items));
	};

	const onAddScore = sign => {
		handleAddScore();
		setClickedSigns([...clickedSigns, sign]);
	};

	const onResetScore = () => {
		handleSetBestScore();
		onReset();
	};

	const onResetGame = () => {
		handleResetGame();
		onReset();
	};

	const onReset = () => {
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

	const onChangeHeight = () => setHeight(ref.current.scrollHeight);

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
				isGameOver || state.score === 12 ? "blur" : ""
			}`}
			onScroll={onChangeHeight}
		>
			<div>
				<div className="wrap" style={{ height: height }}></div>
				<div className="menu">
					{state.score === 12 ? (
						<>
							<h4>You win the Game!</h4>
							<button
								type="button"
								className={activeId ? "press" : ""}
								onAnimationEnd={onResetGame}
								onClick={() => setActiveId(true)}
							>
								Play Again
							</button>
						</>
					) : (
						<>
							<h4>You cannot tap twice on the same card!</h4>
							<button
								type="button"
								className={activeId ? "press" : ""}
								onAnimationEnd={onResetScore}
								onClick={() => setActiveId(true)}
							>
								Try Again
							</button>
						</>
					)}
				</div>
				<ul ref={ref}>{List}</ul>
			</div>
		</div>
	);
};

export default Content;
