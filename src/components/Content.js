	const initialData = {
		listItems: images.keys().map(key => ({
			name: key.match(/(?<=\.\/)[^.]+/g)[0],
			url: images(key),
		})),
		clickedSign: [],
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
