	const initialData = {
		listItems: images.keys().map(key => ({
			name: key.match(/(?<=\.\/)[^.]+/g)[0],
			url: images(key),
		})),
		clickedSign: [],
	};
