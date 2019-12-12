import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';

//Local Libraries
import strings from "@language";

//Components
import { Text, Edit, Button, Scroll } from "../../controls";

//Styling
import { colors, bs, sizes } from "../../../theme";
import styles from "./styles";
import moment from "moment";

const date = Date.now();

class RenderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      categoryName: '',
      categoryType: '',
      amount: '',
      date: moment(date).format('DD-MMM-YYYY'),

    }
  }

  componentDidMount() {
    const { data, mode } = this.props;
    console.log("componentDidMount", this.props);
    if (mode === 'update') {
      this.setState({
        description: data[0].description,
        categoryName: data[0].categoryName,
        categoryType: data[0].categoryType,
        amount: data[0].amount,
        date: data[0].date
      })
    }
  }

  _onChangeText = (key, value) => {
    this.setState({
      [key]: value,
    })
  }

  _input = (field, keyboard) => {
    return (
      <View>
        <Text size={14} color={colors.black} bold>{strings[field]}</Text>
        <View style={styles.textInputView}>
          <Edit
            defaultValue={this.state[field].toString()}
            style={styles.textInput}
            keyboardType={keyboard ? keyboard : 'default'}
            onChangeText={text => this._onChangeText(field, text)}
          />
        </View>
      </View>
    );
  };

  _renderDatePicker = (field) => {
    const { date } = this.state
    return (
      <View>
        <Text size={14} color={colors.black} bold>{strings[field]}</Text>
        <DatePicker
          style={styles.textInputView}
          date={date}
          is24Hour={true}
          mode="date"
          placeholder="Select date"
          format="DD-MMM-YYYY"
          minDate="01-Jan-1970"
          maxDate={date}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: styles.dateIcon,
            dateInput: styles.dateInput
          }}
          onDateChange={(date, time) => {
            this._onChangeText(field, date)
          }}
        />
      </View>
    )
  }

  _renderCategoryNameDropDown = (field, data) => {
    return (
      <View>
        <Text size={14} color={colors.black} bold>{strings[field]}</Text>
        <View style={styles.textInputView}>
          <Dropdown
            value={this.state[field]}
            valueExtractor={(data) => data.name}
            data={data}
            placeholder={strings.selectName}
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            pickerStyle={styles.pickerStyle}
            textColor={colors.voilet}
            dropdownPosition={0}
            onChangeText={(text) => this._onChangeText(field, text)}
          />
        </View>
      </View>
    )
  }

  _renderCategoryTypeDropDown = (field, data) => {
    const cName = this.state.categoryName
    let newData = [];
    let result = data.filter((item) => (item.name === cName));
    let subData = result[0].subTypes;

    for (let i = 0; i < subData.length; i++) {
      newData.push({
        value: subData[i]
      })
    }

    return (
      <View>
        <Text size={14} color={colors.black} bold>{strings[field]}</Text>
        <View style={styles.textInputView}>
          <Dropdown
            value={this.state[field]}
            data={newData}
            placeholder={strings.selectType}
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            pickerStyle={styles.pickerStyle}
            textColor={colors.voilet}
            dropdownPosition={0}
            onChangeText={(text) => this._onChangeText(field, text)}
          />
        </View>
      </View>
    )
  }

  _renderSubmitButton = (onPress) => {
    const { description, categoryName, categoryType, amount } = this.state;
    const { loading } = this.props;
    const allowSubmit = description.length > 0 && categoryName.length > 0 && categoryType.length > 0 && amount.length > 0;

    return (
      <Button disabled={!allowSubmit} linearGradient style={styles.submitBtn} onPress={() => onPress(this.state)}>
        {!loading ? <Text bold size={18} color={colors.white}>{strings.submit.toUpperCase()}</Text>
          : <ActivityIndicator size="large" color={colors.white} />}
      </Button>
    )
  }

  _renderUpdateDeleteButton = (keyId, onUpdatePress, onDeletePress) => {
    const { loading } = this.props;
    return (
      <View style={styles.flexRow}>
        <Button linearGradient style={[styles.submitBtn, styles.widthStyle]} onPress={() => onDeletePress(keyId)}>
          <Text bold size={18} color={colors.white}>{strings.delete.toUpperCase()}</Text>
        </Button>
        <Button linearGradient style={[styles.submitBtn, styles.widthStyle]} onPress={() => onUpdatePress(keyId, this.state)}>
          {!loading ? <Text bold size={18} color={colors.white}>{strings.update.toUpperCase()}</Text>
            : <ActivityIndicator size="large" color={colors.white} />}
        </Button>
      </View>
    )
  }

  render() {
    const { keyId, categoryData, onPress, mode, onUpdatePress, onDeletePress } = this.props;

    return (
      <View style={styles.formView}>
        {this._input('description')}
        {this._renderCategoryNameDropDown('categoryName', categoryData)}
        {this.state.categoryName.length > 0 && this._renderCategoryTypeDropDown('categoryType', categoryData, mode)}
        {this._input('amount', 'number-pad')}
        {this._renderDatePicker('date')}
        {mode === 'update' ? this._renderUpdateDeleteButton(keyId, onUpdatePress, onDeletePress) : this._renderSubmitButton(onPress)}
      </View>
    );
  }
}

RenderForm.propTypes = {
  onChangeText: PropTypes.func
};


export default RenderForm;