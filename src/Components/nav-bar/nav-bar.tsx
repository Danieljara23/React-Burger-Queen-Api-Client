import { User } from "../../models/user";
import styles from "./nav-bar.module.css";

type NavBarProps = {
  onLogout: () => void;
  user: User;
};

const NavBar: React.FC<NavBarProps> = ({ onLogout, user }) => {
  const userSignedIn = user.id > 0;

  return (
    userSignedIn && (
      <nav className={styles.nav}>
        <ul className={styles.nav_ul}>
          <li>
            <button onClick={onLogout}>Sign out</button>
          </li>
        </ul>
      </nav>
    )
  );
};

export default NavBar;
