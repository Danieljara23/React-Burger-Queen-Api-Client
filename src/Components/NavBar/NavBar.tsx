import { IUser } from "../../Models/User.d";

interface NavBarProps {
	onLogout: () => void;
	user: IUser;
}

const NavBar = ({ onLogout, user }: NavBarProps) => {
	const userSignedIn = user.id > 0;

	return (userSignedIn &&
	<nav>
		<ul>
			<li>
				<a href='#' onClick={onLogout}>Sign out</a>
			</li>
		</ul>
	</nav>
	)
};

export default NavBar;