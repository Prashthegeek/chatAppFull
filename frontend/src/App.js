import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route, Switch } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import EmailVerification from "./Pages/EmailVerification";
import NotSucEmail from './Pages/NotSucEmail';
import SuccessEmail from './Pages/SuccessEmail';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/chats" component={Chatpage} />
        <Route path="/email-verification" component={EmailVerification} />
        <Route path="/verify-email/:token" component={EmailVerification} />  {/* Link validation */}
        <Route path="/NotSucEmail" component={NotSucEmail} />
        <Route path="/SuccessEmail" component={SuccessEmail} />
      </Switch>
    </div>
  );
}

export default App;
