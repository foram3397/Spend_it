import React from "react";
import { Actions, Scene, ActionConst, Drawer } from "react-native-router-flux";
import { Landing, Home, Detail, Login, SignUp, RecentActivity, Income, Expence, DrawerMenu, Settings, ChangeLanguage, OverView } from "../screens";
import { transitionCustomConfig } from "./config/transitionConfig";
import { sizes } from "../theme";

const interpolator = {
  screenInterpolator: props => transitionCustomConfig(props)
};
const routes = Actions.create(
  <Scene key="app" hideNavBar transitionConfig={() => interpolator}>
    <Scene key="landing" component={Landing} initial />
    <Scene key="login" component={Login} type={ActionConst.REPLACE} />
    <Scene key="signUp" component={SignUp} />
    {/* <Scene drawer key="drawerView" contentComponent={DrawerMenu} hideNavBar={true} hideDrawerButton={true} drawerPosition="left" open={false}> */}
    {/* <Drawer hideNavBar key="drawerMenu" contentComponent={DrawerMenu} drawerWidth={300} type={'overlay'}>
      <Scene key="drawerViewNormal" hideNavBar> */}
    <Scene key="home" component={Home} />
    <Scene key="settings" component={Settings} hideNavBar={true} />
    <Scene key="detail" component={Detail} />
    <Scene key="recentActivity" component={RecentActivity} />
    <Scene key="income" component={Income} />
    <Scene key="expence" component={Expence} />
    <Scene key="changeLanguage" component={ChangeLanguage} />
    <Scene key="overview" component={OverView} />
    {/* </Scene>
    </Drawer> */}
    {/* </Scene> */}
  </Scene>
);

export default routes;
