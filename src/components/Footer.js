import Icon from "@mdi/react";
import { mdiGithub } from "@mdi/js";

const Footer = () => {
	return (
		<div className="footer">
			© 2023
			<a href="https://github.com/whitesgr03" title="Author Profile">
				Weiss Bai
				<Icon path={mdiGithub} alt="Github Icon" />
			</a>
		</div>
	);
};

export default Footer;
