import { useState } from "react";

const Content = ({ onAddScore, onResetScore }) => {
	const images = require.context("../image/zodiac", false, /.jpg$/);

	const initialData = {
		listItems: images.keys().map(key => ({
			name: key.match(/(?<=\.\/)[^.]+/g)[0],
			url: images(key),
		})),
		clickedSign: [],
	};

	const [listItems, setListItems] = useState(initialData.listItems);
	const [clickedSign, setClickedSign] = useState(initialData.clickedSign);

	const handleClick = sign => {
		clickedSign.find(item => item === sign)
			? handleResetScore()
			: handleAddScore(sign);
		setListItems(shuffle(listItems));
	};

	const handleAddScore = sign => {
		onAddScore();
		setClickedSign([...clickedSign, sign]);
	};

	const handleResetScore = () => {
		onResetScore();
		setClickedSign(initialData.clickedSign);
	};

	const shuffle = array => {
		const newArray = array.slice();

		for (let i = 0; i < array.length - 2; i++) {
			let j = Math.floor(i + Math.random() * (array.length - 1 - i + 1));
			[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
		}

		return newArray;
	};

	const List = listItems.map(item => {
		return (
			<li key={item.name}>
				<button type="button" onClick={() => handleClick(item.name)}>
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
