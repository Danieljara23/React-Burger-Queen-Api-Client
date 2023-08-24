import { IUser } from "../../Models/User.d";

interface NavBarProps {
	onLogout: () => void;
	user: IUser;
}

const NavBar : React.FC<NavBarProps> = ({ onLogout, user }) => {
	const userSignedIn = user.id > 0;

	return (userSignedIn &&
	<nav>
		<ul>
			<li>
				<button onClick={onLogout}>Sign out</button>
			</li>
		</ul>
	</nav>
	)
};

export default NavBar;