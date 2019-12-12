import { NavigationActions, StackActions } from "react-navigation";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    );
}

function pop() {
    _navigator.dispatch(NavigationActions.back());
}

function reset(routeName, params) {
    const resetAction = StackActions.reset({
        index: 1,
        actions: [
            NavigationActions.navigate({ routeName: "drawer" }),
            NavigationActions.navigate({ routeName: routeName, params: params })
        ]
    });
    _navigator.dispatch(resetAction);
}

function popBackByScreen(numberOfScreen) {
    const popAction = StackActions.pop({ n: numberOfScreen });
    _navigator.dispatch(popAction);
}

function popToTop() {
    _navigator.dispatch(StackActions.popToTop());
}

// add other navigation functions that you need and export them

export default {
    navigate,
    pop,
    reset,
    popToTop,
    setTopLevelNavigator,
    popBackByScreen
};