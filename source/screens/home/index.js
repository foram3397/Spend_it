//Global Libraries
import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import PropTypes from "prop-types";
import { DrawerActions } from 'react-navigation-drawer';
//Local Libraries
import strings from "@language";
import Global from "../../lib/common";
import moment from "moment";

//Components
import { Container, Card } from "../../components/common";
import { Icon, Text, Button, Border, Scroll } from "../../components/controls";
import { LineChartView } from "../index";

//Styling
import { colors, bs, sizes } from "../../theme";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { RecentActivity, Income, Expence } from "../index";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      showActivity: true,
      showIncome: false,
      showExpences: false,
      incomeAmount: 0,
      expenceAmount: 0,
      showSearch: false,
    };
  }

  componentDidMount() {
    this._getData()
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.incomeData !== this.props.incomeData) || (prevProps.expenceData !== this.props.expenceData)) {
      this._getData();
    }
  }

  ///////////////////////
  //// FUNCTIONS ////////

  _getData = () => {
    const res = this.props.incomeData;
    const resData = this.props.expenceData;
    this._getTotal('incomeAmount', res);
    this._getTotal('expenceAmount', resData);

  }

  goToOverview = () => {
    this.props.navigation.navigate('overView');
  };

  _getTotal = (field, data) => {
    let currentMonth = moment().month()
    let sum = 0;
    let d = data.filter((item) => moment(item.date).format('MMM') === moment().month(currentMonth).format('MMM')
    ).map((item) =>
      item.amount
    )
    for (let i = 0; i < d.length; i++) {
      sum += d[i]
    }
    this.setState({
      [field]: sum
    })
  }

  _onToggleActivityChange = () => {
    this.setState({
      showActivity: true,
      showIncome: false,
      showExpences: false,
    })
  }

  _onToggleIncomeChange = () => {
    this.setState({
      showActivity: false,
      showIncome: true,
      showExpences: false,
    })
  }

  _onToggleExpencesChange = () => {
    this.setState({
      showActivity: false,
      showIncome: false,
      showExpences: true,
    })
  }

  _openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  }

  _toggleSearch = () => {
    this.setState({
      showSearch: !this.state.showSearch,
    })
  }



  //// FUNCTIONS ////////
  ///////////////////////

  ////////////////////////
  ////// VIEW ////////////

  // Navigation Bar
  renderNavbar = () => {
    const { showSearch, showIncome, showExpences } = this.state;
    const icon = !showSearch ? "mt search" : "mt close";
    const iconCondition = (!showIncome && !showExpences);
    return (
      <Border theme="navbar" bstyle={styles.header}>
        {!showSearch && <Button theme="navbar.left" onPress={() => this._openDrawer()}>
          <Icon color={colors.dimGrey} name="mt menu" size={30} />
        </Button>}
        {!showSearch && <Text bold color={colors.black} size={16}>
          {strings.dashboard.toUpperCase()}
        </Text>}
        {iconCondition &&
          <Button theme="navbar.right" onPress={() => this._toggleSearch()} >
            <Icon color={colors.dimGrey} name={icon} size={30} />
          </Button>}
      </Border>
    );
  }

  // Content
  renderContent = () => {
    const { showActivity, showIncome, showExpences, showSearch } = this.state;
    return (
      <View style={styles.container}>
        <Scroll>
          <View style={{ ...bs.ph_3x }}>
            {!showSearch && this._renderCard()}
            <View>
              {!showSearch && this._bottomView()}
              {showActivity && this._renderActivity()}
              {showIncome && this._renderIncome()}
              {showExpences && this._renderExpences()}
            </View>
          </View>
        </Scroll>
        {(showIncome || showExpences) && this.renderAddButton()}
      </View>
    );
  };

  _onAddClick = () => {
    const { showIncome } = this.state;
    if (showIncome) {
      this.incomeChild._toggleModal();

    } else {
      this.expenceChild._toggleModal();
    }
  }

  renderAddButton = () => {
    return (
      <Button linearGradient style={styles.buttonStyle} onPress={this._onAddClick}>
        <Icon name={'mt add'} size={50} color={colors.white} />
      </Button>
    )
  }

  // Card
  _renderCard = () => {
    const { incomeAmount, expenceAmount } = this.state;
    const data = [50, 300, -400, 905, -450, 500, 800, 1200, 1500];
    const monthName = moment().month();
    const currentMonth = moment().month(monthName).format('MMM').toUpperCase()

    return (
      <Card style={styles.card} linearGradient onPress={() => this.goToOverview()} shadowStyle={styles.shadowStyle}>
        <View style={styles.flexRow}>
          <View style={styles.cardInnerView}>
            <View style={styles.boxView}>
              <Text color={colors.lightWhite} size={10}>
                {strings.totalBalance.toUpperCase()}
              </Text>
              <Text color={colors.lightWhite} size={16}>{'\u20B9' + ' '}<Text bold color={colors.white} size={20}>{Global.formatRupee(incomeAmount + expenceAmount)}</Text></Text>
            </View>
            <View>
              <LineChartView style={styles.chartStyle} data={data} animate={true} />
            </View>
          </View>

          <View style={styles.boxView}>
            <View style={styles.rowFlex}>
              <Icon size={18} name={'mt call-made'} color={colors.green} style={styles.iconStyle} fontWeight={'900'} />
              <Text color={colors.lightWhite} size={10}>
                {strings.incomeText.toUpperCase() + ' ' + currentMonth}
              </Text>
            </View>

            <Text color={colors.lightWhite} size={12} style={styles.textStyle} numberOfLines={1}>{strings.rupeeSign + ' '}<Text bold color={colors.white} size={15} >{Global.formatRupee(incomeAmount)}</Text></Text>


            <View style={[styles.rowFlex, { ...bs.mt_3x }]}>
              <Icon size={18} name={'mt call-received'} color={colors.red} style={styles.iconStyle} fontWeight={'900'} />
              <Text color={colors.lightWhite} size={10}>
                {strings.expenceText.toUpperCase() + ' ' + currentMonth}
              </Text>
            </View>

            <Text color={colors.lightWhite} size={12} style={styles.textStyle} numberOfLines={1}>{strings.rupeeSign + ' '}<Text bold color={colors.white} size={15}>{Global.formatRupee(expenceAmount)}</Text></Text>
          </View>
        </View>
      </Card>
    );
  };

  _renderBottomHeader = (text, field, style, textStyle, callback) => {
    return (
      <View style={styles.rowFlex}>
        <View>
          <Text bold color={this.state[field] ? colors.grey : colors.voilet} size={10} onPress={callback} style={textStyle} center>{text.toUpperCase()}
          </Text>
          {this.state[field] &&
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              colors={[colors.voilet, colors.dark_pink]}
              style={[styles.activeView, style]} />
          }
        </View>
      </View>
    );
  }

  _bottomView = () => {
    return (
      <View style={styles.rowFlex}>
        {this._renderBottomHeader(strings.recentActivity, 'showActivity', undefined, styles.textHeight, () => { this._onToggleActivityChange() })}

        {this._renderBottomHeader(strings.incomeText, 'showIncome', styles.incomeStyle, [styles.textHeight, { ...bs.ph_3x }], () => { this._onToggleIncomeChange() })}

        {this._renderBottomHeader(strings.expenceText, 'showExpences', { width: sizes.em(65) }, styles.textHeight, () => { this._onToggleExpencesChange() })}
      </View>
    );
  }

  _renderActivity = () => {
    const { showSearch } = this.state;
    return (
      <View style={styles.recentView}>
        <RecentActivity navigation={this.props.navigation}
          showSearch={showSearch} />
      </View>
    );
  }

  _renderIncome = () => {
    return (
      <View style={styles.recentView}>
        <Income onRef={ref => this.incomeChild = ref} updateAmountData={() => this._getData()} />
      </View>
    );
  }

  _renderExpences = () => {
    return (
      <View style={styles.recentView}>
        <Expence onRef={ref => this.expenceChild = ref} updateAmountData={() => this._getData()} />
      </View>
    );
  }

  render() {
    return (
      <Container>
        {this.renderNavbar()}
        {this.renderContent()}
      </Container>
    );
  }
  ////// VIEW ////////////
  ////////////////////////
}

Home.propTypes = {
  dispatch: PropTypes.func,
  theme: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

const mapStateToProps = state => {
  return ({
    theme: state.theme,
    language: state.language,
    authData: state.setAuthDataReducer.authData,
    incomeData: state.setIncomeDataReducer.incomeData,
    expenceData: state.setExpenceDataReducer.expenceData
  });
}

export default connect(mapStateToProps)(Home);
