const Header = ({ state }) => (
	<div className="header">
		<h1>Zodiac Memory</h1>
		<div className="scoreBoard">
			<h3>Score: {state.score}</h3>
			<h3>Best Score: {state.BestScore}</h3>
		</div>
	</div>
);

export default Header;
