// import { useMemo, useCallback, useEffect } from "react";

const Content = ({ onAddScore, onReSetScore }) => {
	const images = require.context("../image/zodiac", false, /.jpg$/);

	const List = images.keys().map(key => {
		const name = key.match(/(?<=\.\/)[^.]+/g)[0];
		return (
			<li key={name}>
				<button type="button">
					<img src={images(key)} alt={name} />
					<p>{name}</p>
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

// const ListItems = () => {
// 	const images = require.context("../image/zodiac", false, /.jpg$/);

// 	const List = images.keys().map(key => {
// 		const name = key.match(/(?<=\.\/)[^.]+/g)[0];
// 		return (
// 			<li className="item" key={name}>
// 				<img src={images(key)} alt={name} />
// 				<p>{name}</p>
// 			</li>
// 		);
// 	});

// 	return <ul>{List}</ul>;
// };

export default Content;
