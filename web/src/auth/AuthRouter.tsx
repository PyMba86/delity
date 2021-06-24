import {Layout} from "./components/Layout";
import {Route, Switch} from "react-router-dom";
import {LoginView} from "./views/Login";

export function AuthRouter() {
    return (
        <Layout>
            <Switch>
                <Route component={LoginView}/>
            </Switch>
        </Layout>
    )
}