//Global Libraries
import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { uniqBy } from 'lodash';
import moment from 'moment';

import strings from "@language";
import Global from "../../lib/common";
import expenceCategoryDataArray from "../../localization/categoryData";

//Components
import { Container, Card } from "../../components/common";
import { Icon, Text, Button, List, Scroll } from "../../components/controls";
import { LineChartView } from "../index";

//Styling
import { colors, bs, sizes } from "../../theme";
import styles from "./styles";

class OverView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      indexValue: moment().day() - 1,
      monthIndexValue: moment().month(),
      progressData: [],
      weekData: [],
      monthData: [],
      orientation: 'portrait'
    }
  }

  componentDidMount() {
    this._getProgressData(this.state.monthIndexValue);
    this._getWeekData();
    this._getMonthData();

    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: this.isPortrait() ? 'portrait' : 'landscape'
      })
    })

  }

  ///////////////////////
  //// FUNCTIONS ////////

  isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  }

  _onBackPress = () => {
    this.props.navigation.pop();
  }

  _toggleChange = () => {
    this.setState({
      active: !this.state.active
    })
  }

  _getColor = (name) => {
    let d = expenceCategoryDataArray;
    let color;
    for (let i = 0; i < d.length; i++) {
      if (d[i].name === name) {
        color = d[i].color
      }
    }
    return color;
  }

  _getAmount = (field, data, compareField, fieldValue, date) => {
    let sum = 0;
    let d = data.filter((item) => (item[compareField] === fieldValue && moment(item.date).format('MMM') === moment(date).format('MMM'))
    ).map((item) =>
      item.amount
    )
    for (let i = 0; i < d.length; i++) {
      sum += d[i]
    }

    if (field === 'progress') {
      let total = this._getMonthAmountData(data, date)
      return sum / total * 100;
    } else {
      return sum;
    }

  }

  _getMonthAmountData = (data, check) => {
    let sum = 0;
    let d = data.filter((item) => moment(item.date).format('MMM') === moment(check).format('MMM')
    ).map((item) =>
      item.amount
    )
    for (let i = 0; i < d.length; i++) {
      sum += d[i]
    }
    return sum;

  }

  _getProgressData = (index) => {

    const { expenceData } = this.props;
    let monthVal = moment().month(index).format('MMM')
    let newData = [];

    if (expenceData.length > 0) {
      for (let i = 0; i < expenceData.length; i++) {
        if (monthVal === moment(expenceData[i].date).format('MMM')) {
          newData.push({
            progress: this._getAmount('progress', expenceData, 'categoryName', expenceData[i].categoryName, expenceData[i].date),
            amount: this._getAmount('amount', expenceData, 'categoryName', expenceData[i].categoryName, expenceData[i].date),
            categoryName: expenceData[i].categoryName.toLowerCase(),
            color: this._getColor(expenceData[i].categoryName)
          })
        }
      }
    }

    let temp = uniqBy(newData, "categoryName");

    this.setState({
      progressData: temp
    })
  }

  _getWeekData = () => {
    const { expenceData } = this.props;
    let temp = [];
    let curr = new Date()
    let week = []

    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
      week.push(moment(day).format('DD-MMM-YYYY'))
    }

    week.forEach(w => temp.push({ date: w, amount: 0 }));

    for (let k = 0; k < expenceData.length; k++) {
      for (let j = 0; j < temp.length; j++) {
        if (temp[j].date === expenceData[k].date) {
          temp[j].amount = this._getAmount('weekData', expenceData, 'date', expenceData[k].date);
        }
      }
    }

    let newData = temp.map((item) => item.amount)

    this.setState({
      weekData: newData
    })
  }



  _getMonthData = () => {
    const { expenceData } = this.props;
    let temp = [];
    let month = [];

    for (let i = 0; i < 12; i++) {
      month.push(moment().month(i).format('MMM'))
    }

    month.forEach(w => temp.push({ month: w, amount: 0 }));

    for (let k = 0; k < expenceData.length; k++) {
      var check = moment(expenceData[k].date).format('MMM');

      for (let j = 0; j < temp.length; j++) {
        if (temp[j].month === check) {
          temp[j].amount = this._getMonthAmountData(expenceData, expenceData[k].date);
        }
      }
    }

    let newData = temp.map((item) => item.amount)

    this.setState({
      monthData: newData
    })
  }

  //// FUNCTIONS ////////
  ///////////////////////

  ////////////////////////
  ////// VIEW ////////////

  // Navigation Bar
  renderContent = () => (
    <Card linearGradient shadowStyle={styles.shadowStyle} style={styles.cardStyle} disabled={true}>
      <View style={styles.flexRow}>
        <Button theme="navbar.left" onPress={this._onBackPress}>
          <Icon name="io ios-arrow-round-back" size={35} color={colors.white} />
        </Button>
        <View style={styles.headerText}>
          <Text size={14} bold>{strings.overview.toUpperCase()} </Text>
        </View>
      </View>
      <View style={styles.switchUpperView}>
        {this._renderSwitch()}
      </View>
      <View style={styles.chartView}>
        {this.state.active ?
          this._renderWeekView() : this._renderMonthView()
        }
      </View>
    </Card>
  );

  _renderBottomItem = (item) => {

    return (
      <View style={styles.circleStyle}>
        <AnimatedCircularProgress
          size={150}
          width={18}
          backgroundWidth={10}
          rotation={0}
          fill={item.item.progress}
          lineCap='round'
          tintColor={item.item.color}
          backgroundColor={colors.greyLight}
          renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="20" fill="blue" />}
        >
          {
            () => (
              <View style={{ ...bs.center, width: sizes.em(70) }}>
                <Icon name={strings[item.item.categoryName]} size={25} color={item.item.color} />
                <View style={{ ...bs.flex_row, ...bs.center }}>
                  <Text size={10} color={colors.voilet}>{strings.rupeeSign + ' '}</Text>
                  <Text size={13} bold color={colors.voilet} numberOfLines={1}>
                    {Global.formatRupee(item.item.amount)}
                  </Text>
                </View>
              </View>
            )
          }

        </AnimatedCircularProgress>
      </View>
    )
  }

  renderBottomView = () => {
    return (
      <List
        numColumns={2}
        extraData={this.state}
        data={this.state.progressData}
        renderItem={this._renderBottomItem}
        keyExtractor={(item, index) => index.toString()}
      />
    )
  }

  // Switch view
  _renderSwitch = () => {
    const { active } = this.state;
    return (
      <View style={styles.switchView}>
        <Button style={active ? styles.activeView : styles.inActiveView} onPress={() => this._toggleChange()}>
          <Text size={14} color={active ? colors.voilet : colors.white} bold>{strings.week.toUpperCase()}</Text>
        </Button>
        <Button style={active ? styles.inActiveView : styles.activeView} onPress={() => this._toggleChange()}>
          <Text size={10} color={active ? colors.white : colors.voilet} bold >{strings.month.toUpperCase()}</Text>
        </Button>
      </View>
    )
  }

  _onPressItem = (item) => {
    this.setState({
      indexValue: item.index,
    })
  }

  _renderItem = (item) => {
    const { indexValue, orientation } = this.state;
    const activeText = item.index === indexValue
    const isPortrait = orientation === 'portrait'
    return (
      <View style={{ flex: 1 }}>
        <Button style={[styles.btnStyle, activeText ? styles.activeText : {}, !isPortrait ? { width: sizes.screen.height / 7 } : {}]} onPress={() => this._onPressItem(item)}>
          <Text size={12} color={colors.lightWhite}>{item.item.toUpperCase()}</Text>
        </Button>
      </View>
    )
  }

  _renderMonthItem = (item) => {
    const { monthIndexValue, orientation } = this.state;
    const activeText = item.index === monthIndexValue
    const isPortrait = orientation === 'portrait'
    return (
      <Button style={[styles.btnStyle, activeText ? styles.activeText : {},
      !isPortrait ? { width: sizes.screen.height / 7 } : {}]} onPress={() => this._onPressMonth(item)}>
        <Text size={12} color={colors.lightWhite}>{item.item.toUpperCase()}</Text>
      </Button>
    )
  }

  _renderWeekView = () => {
    const { indexValue, weekData, orientation } = this.state;
    const data = weekData;
    const subData = [strings.monday, strings.tuesday, strings.wednesday, strings.thursday, strings.friday, strings.saturday, strings.sunday]
    return (
      <View style={styles.chartView}>
        <Text size={14} color={colors.lightWhite} center >{strings.rupeeSign}<Text bold size={16}>{' ' + Global.formatRupee(data[indexValue])}</Text></Text>
        <LineChartView style={styles.chartStyle} data={data} subdata={subData} index={indexValue} animate={true} isToolTip={true} />
        <View style={styles.listView}>
          <List
            data={subData}
            extraData={this.state}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={this._renderItem}
          />
        </View>
      </View>
    )
  }

  _onPressMonth = (item) => {
    this.setState({
      monthIndexValue: item.index
    })
    this._getProgressData(item.index)
  }



  _renderMonthView = () => {
    const { monthIndexValue, monthData } = this.state;
    const data = monthData;
    const subData = [strings.january, strings.february, strings.march, strings.april, strings.may, strings.june, strings.july, strings.august, strings.september, strings.october, strings.november, strings.december]
    return (
      <View style={styles.chartView}>
        <Text size={14} color={colors.lightWhite} center >{strings.rupeeSign}<Text bold size={16}>{' ' + Global.formatRupee(data[monthIndexValue])}</Text></Text>
        <LineChartView style={styles.chartStyle} data={data} index={monthIndexValue} animate={true} isToolTip={true} />
        <View style={styles.listView}>
          <List
            data={subData}
            extraData={this.state}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={this._renderMonthItem}
          />
        </View>
      </View>
    )
  }

  render() {
    return (
      <Container>
        <Scroll>
          <View style={styles.container}>
            {this.renderContent()}
            {this.renderBottomView()}
          </View>
        </Scroll>
      </Container>
    );
  }
  ////// VIEW ////////////
  ////////////////////////
}

OverView.propTypes = {
  dispatch: PropTypes.func,
  theme: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

const mapStateToProps = state => ({
  theme: state.theme,
  incomeData: state.setIncomeDataReducer.incomeData,
  expenceData: state.setExpenceDataReducer.expenceData
});

export default connect(mapStateToProps)(OverView);
