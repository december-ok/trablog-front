import { HashRouter as Router, Route, Switch } from "react-router-dom";
import useMe from "./hooks/useMe";
import Auth from "./pages/Auth";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Info from "./pages/Info";
import Logout from "./pages/Logout";
import Post from "./pages/Post";
import Search from "./pages/Search";
import UserHome from "./pages/UserHome";
import Write from "./pages/Write";

function App() {
  useMe();
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/write" exact component={Write} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/search" exact component={Search} />
          <Route path="/info" exact component={Info} />
          <Route path="/error" component={Error} />
          <Route path="/post/:postId" exact component={Post} />
          <Route path="/:userId" exact component={UserHome} />
          <Route component={Error} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
