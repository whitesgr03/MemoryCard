import Icon from "@mdi/react";
import { mdiGithub } from "@mdi/js";

const Footer = () => {
	return (
		<div className="footer">
			© 2023
			<span>
				<a href="https://github.com/whitesgr03" title="Author Profile">
					Weiss Bai
				</a>
				<a href="https://github.com/whitesgr03">
					<Icon path={mdiGithub} size={1} alt="Github Icon" />
				</a>
			</span>
		</div>
	);
};

export default Footer;
