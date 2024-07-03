import {Fragment,useContext} from "react";
import {Outlet,Link} from "react-router-dom";
import {ReactComponent as HomeLogo} from "../../assets/logo-home.svg";
import {UserContext} from "../../contexts/user.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import "./navigation.styles.scss";

const Navigation = () => {
  const {currentUser} = useContext(UserContext);

  return (
    <Fragment>
      <div className = "navigation">
      	<Link className = "logo-container" to = "/">
      		<HomeLogo className = "logo"/>
      	</Link>
        <div className = "nav-links-container">
        	<Link className = "nav-link" to = "/publications">Publikacie</Link>
          <Link className = "nav-link" to = "/encounter">Encounter</Link>
          <Link className = "nav-link" to = "/blog">Blog</Link>
          <Link className = "nav-link" to = "/kontakt">Kontakt</Link>
          {
            currentUser ? (
              <span className = "nav-link" onClick = {signOutUser}>Sing Out</span>)
              : (<Link className = "nav-link" to = "/auth">Sign In</Link>)
          }
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;