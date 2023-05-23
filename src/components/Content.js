import { useState } from "react";

	const imagesData = require.context("../image/zodiac", false, /.jpg$/);

	const images = imagesData.keys().map((key, i) => ({
		id: i,
		name: key.match(/(?<=\.\/)[^.]+/g)[0],
		url: imagesData(key),
	}));

	const [clickedSigns, setClickedSigns] = useState([]);
	const [items, setItems] = useState(images);

	const onCheckClickedSigns = sign => {
		clickedSigns.find(item => item === sign)
			? onResetScore()
			: onAddScore(sign);
	};

	const onAddScore = sign => {
		handleAddScore();
		setClickedSigns([...clickedSigns, sign]);
	};

	const onResetScore = () => {
		handleResetScore();
		setClickedSigns(clickedSigns);
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
			<li key={item.name}>
				<button
					type="button"
					onClick={() => onCheckClickedSigns(item.name)}
				>
					<img src={item.url} alt={item.name} />
					<p>{item.name}</p>
				</button>
			</li>
		);
	});

	return (
		<div className="content">
			<ul>{List}</ul>
		</div>
	);
};

export default Content;
