import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {JssProvider} from "react-jss";
import {create} from 'jss';
import preset from 'jss-preset-default';
import {AppLayout} from "./components/AppLayout";
import {AppThemeProvider} from "./components/AppTheme";
import {AppLocaleProvider} from "./containers/AppLocale";

const jss = create(preset());

ReactDOM.render(
    <React.StrictMode>
        <JssProvider jss={jss}>
            <AppThemeProvider>
                <AppLocaleProvider>
                    <AppLayout/>
                </AppLocaleProvider>
            </AppThemeProvider>
        </JssProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
