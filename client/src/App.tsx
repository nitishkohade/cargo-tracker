import { Redirect, Route, Switch } from "react-router";
import TruckCreateOrGet from "./screens/TruckCreateOrGet.screen";
import TruckLocation from "./screens/TruckLocation.screen";

const App = () => {
    return (
            <Switch>
                <Route exact path="/" render={() => <Redirect to={{pathname: '/truck/create'}} />} />
                <Route exact path="/truck/create" render={() => <TruckCreateOrGet />} />
                <Route exact path="/truck/location" render={() => <TruckLocation />} />
                <Route path="**" render={() => <Redirect to={{pathname: '/truck/create'}} />} />
            </Switch>
      );
}

export default App;
