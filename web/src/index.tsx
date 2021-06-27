import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {JssProvider} from "react-jss";
import {create} from 'jss';
import preset from 'jss-preset-default';
import {AppThemeProvider} from "./components/AppTheme";
import {AppLocaleProvider} from "./containers/AppLocale";
import {Routes} from "./routes";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./auth/AuthProvider";
import {API_URI} from "./config";
import {ApolloProvider} from "react-apollo";
import ApolloClient from "apollo-client";
import {ApolloLink} from "apollo-link";
import {BatchHttpLink} from "apollo-link-batch-http";
import {defaultDataIdFromObject, InMemoryCache} from "apollo-cache-inmemory";

const jss = create(preset());

const linkOptions = {
    credentials: "include",
    uri: API_URI
};
const batchLink = new BatchHttpLink({
    batchInterval: 100,
    ...linkOptions
});

const link = ApolloLink.split(
    operation => operation.getContext().useBatching,
    batchLink,
);

const apolloClient = new ApolloClient({
    cache: new InMemoryCache({
        dataIdFromObject: obj => defaultDataIdFromObject(obj)
    }),
    link: link
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <JssProvider jss={jss}>
                <BrowserRouter>
                    <AppThemeProvider>
                        <AppLocaleProvider>
                            <AuthProvider>
                                <Routes/>
                            </AuthProvider>
                        </AppLocaleProvider>
                    </AppThemeProvider>
                </BrowserRouter>
            </JssProvider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
