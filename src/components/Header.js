import Icon from "@mdi/react";
import { mdiInformationSlabCircle } from "@mdi/js";

const Header = ({ state, onShowInfo }) => (
	<div className="header">
		<h1>Zodiac Memory</h1>
		<div className="scoreBoard">
			<button type="button">
				<Icon
					path={mdiInformationSlabCircle}
					title="User Profile"
					onClick={() => onShowInfo(true)}
				/>
			</button>
			<div>
				<h3>Score: {state.score}</h3>
				<h3>Best Score: {state.BestScore}</h3>
			</div>
		</div>
	</div>
);

export default Header;
