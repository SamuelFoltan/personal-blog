import {Routes,Route} from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Publications from "./components/publications/publications.component";
import Encounter from "./components/encounter/encounter.component";
import Blog from "./components/blog/blog.component";
import Kontakt from "./components/kontakt/kontakt.component";

const App = () => {
  return (
    <Routes>
      <Route path = "/" element = {<Navigation/>}>
        <Route index element = {<Home />}/>
        <Route path = "auth" element = {<Authentication/>}/>
        <Route path = "publications" element = {<Publications/>}/>
        <Route path = "encounter" element = {<Encounter/>}/>
        <Route path = "blog" element = {<Blog/>}/>
        <Route path = "kontakt" element = {<Kontakt/>}/>
      </Route>
    </Routes>
  );
}

export default App;