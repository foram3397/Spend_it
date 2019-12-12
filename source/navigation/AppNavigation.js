import React, { Component } from "react";
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import { createDrawerNavigator } from 'react-navigation-drawer'

import {
    Landing,
    Home,
    Detail,
    Login,
    SignUp,
    RecentActivity,
    Income,
    Expence,
    DrawerMenu,
    Settings,
    ChangeLanguage,
    OverView,
    ForgotPwd,
    RenderDetail,
    ChangeIncomeLimit
} from "../screens";


import NavigationService from "./NavigationService";
import changeIncomeLimit from "../screens/changeIncomeLimit";

// drawer stack
const DrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: () => ({
                drawerLabel: "Home"
            })
        }
    },
    {
        contentComponent: DrawerMenu
    }
)

const AppNavigator = createStackNavigator(
    {
        drawer: DrawerNavigator,
        landing: { screen: Landing },
        login: { screen: Login },
        signup: { screen: SignUp },
        forgotPwd: { screen: ForgotPwd },
        detail: { screen: Detail },
        income: { screen: Income },
        recentActivity: { screen: RecentActivity },
        expence: { screen: Expence },
        setting: { screen: Settings },
        changeLanguage: { screen: ChangeLanguage },
        overView: { screen: OverView },
        renderDetail: { screen: RenderDetail },
        changeIncomeLimit: { screen: ChangeIncomeLimit }
    },
    {
        initialRouteName: "landing",
        headerMode: "none"
    }
)

const AppContainer = createAppContainer(AppNavigator);

const getCurrentRoute = state =>
    state.index !== undefined
        ? getCurrentRoute(state.routes[state.index])
        : state.routeName;

class AppNavigation extends Component {
    constructor() {
        super();
        this.state = {
            currentScreen: "landing"
        };
    }

    _handleNavigationStateChange = (prevState, newState) => {
        this.setState({
            currentScreen: getCurrentRoute(newState)
        })
    }

    render() {
        return (
            <React.Fragment>
                <AppContainer
                    onNavigationStateChange={this._handleNavigationStateChange}
                    ref={navigationRef => {
                        NavigationService.setTopLevelNavigator(navigationRef);
                    }}
                />
            </React.Fragment>
        )
    }
}

export default AppNavigation;


