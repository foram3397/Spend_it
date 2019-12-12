import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import PropTypes from "prop-types";

//Local Libraries
import strings from "@language";
import { List, Text, Edit, Icon } from "../../components/controls";

//Components
import { RenderRow } from "../../components/common";

//Styling
import styles from "./styles";
import { colors, bs } from "../../theme";

class RecentActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      categoryName: '',
      categoryType: '',
      amount: '',
      date: '',
      data: [],
      searchText: ''
    }
    this.dataHolder = [];
  }

  componentDidMount() {
    this._getData();
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.incomeData !== this.props.incomeData) || (prevProps.expenceData !== this.props.expenceData)) {
      this._getData();
    }
  }



  _getData = async () => {
    const { getIncomeTotal, getExpenceTotal } = this.props;
    let newData = [];
    // let getIncomeAmount = [];
    // let getExpenceAmount = [];
    const res = this.props.incomeData;
    const resData = this.props.expenceData;

    if (res.length > 0) {
      for (let i = 0; i < res.length; i++) {
        newData.push({
          id: res[i].incomeId,
          description: res[i].description,
          categoryName: res[i].categoryName,
          categoryType: res[i].categoryType,
          amount: res[i].amount,
          date: res[i].date,
          type: res[i].type
        })
        //   getIncomeAmount.push(res[i].amount)
      }
    }

    if (resData.length > 0) {
      for (let i = 0; i < resData.length; i++) {
        newData.push({
          id: resData[i].expenceId,
          description: resData[i].description,
          categoryName: resData[i].categoryName,
          categoryType: resData[i].categoryType,
          amount: resData[i].amount,
          date: resData[i].date,
          type: resData[i].type
        })
        //   getExpenceAmount.push(resData[i].amount)
      }
    }

    // getIncomeTotal(getIncomeAmount);
    //getExpenceTotal(getExpenceAmount);

    let val = newData.sort((a, b) => {
      return new Date(a.date).getTime() -
        new Date(b.date).getTime()
    })

    this.setState({
      data: newData.reverse()
    })
    this.dataHolder = newData
  }

  _renderDetail = (item) => {
    return (
      this.props.navigation.navigate('renderDetail', { data: item })
    )
  }

  _renderItem = (item) => {
    return (
      <RenderRow description={item.item.description} categoryName={item.item.categoryName} categoryType={item.item.categoryType} amount={item.item.amount} date={item.item.date} type={item.item.type} onPress={() => this._renderDetail(item.item)} />
    );
  }

  _itemSeparator = () => {
    return (
      <View style={styles.separatorStyle} />
    );
  }

  _listEmptyComponent = () => {
    return (
      <View>
        <Text bold size={18} color={colors.voilet} center>{strings.noRecords}</Text>
      </View>
    );
  }

  _onSearchFilter = (text) => {
    const newData = this.dataHolder.filter(item => {
      const itemData = item.description.toLowerCase();
      const textData = text.toLowerCase();

      return itemData.includes(textData);
    });

    this.setState({
      data: text === '' ? this.dataHolder : newData,
      searchText: text
    });
  }

  _toggleSearch = () => {
    this.setState({
      searchText: '',
      data: this.dataHolder
    })
  }

  _renderSearch = () => {
    return (
      <View style={styles.textInputContainer}>
        <Edit
          defaultValue={this.state.searchText}
          placeholder={strings.search}
          placeholderTextColor={colors.dimGrey}
          style={styles.textInput}
          onChangeText={text => this._onSearchFilter(text)}
        />
        <Icon name={'mt close'} size={20} color={colors.dimGrey} onPress={() => this._toggleSearch()} />
      </View>
    )
  }

  render() {
    const { styles, showSearch } = this.props;
    return (
      <View>
        {showSearch && this._renderSearch()}
        <View style={styles}>
          <List
            style={{ ...bs.pb_2x }}
            data={this.state.data}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this._itemSeparator}
            ListEmptyComponent={this._listEmptyComponent}
          />
        </View>
      </View>
    );
  }
}

RecentActivity.propTypes = {
  dispatch: PropTypes.func,
  theme: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

const mapStateToProps = state => ({
  theme: state.theme,
  incomeData: state.setIncomeDataReducer.incomeData,
  expenceData: state.setExpenceDataReducer.expenceData
});

export default connect(mapStateToProps)(RecentActivity);