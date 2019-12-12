import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Alert } from "react-native";
import PropTypes from "prop-types";
import Firebase from 'react-native-firebase';
import { setExpenceData, updateExpenceData, deleteExpenceData, popupExpenceData } from "../../redux/actions/expence.actions";

//Local Libraries
import strings from "@language";
import Global from "../../lib/common";
import { database } from "../../app/config";
import { Button, List, Icon, Text, ModalView, Scroll } from "../../components/controls";

//Components
import { RenderRow, RenderForm } from "../../components/common";
import expenceCategoryDataArray from "../../localization/categoryData";

//Styling
import moment from "moment";
import styles from "./styles";
import { colors, bs } from "../../theme";

const date = Date.now();
const { currentUser } = Firebase.auth();

class Expence extends Component {

    constructor(Props) {
        super(Props);
        this.state = {
            loading: false,
            showModal: false,
            mode: '',
            keyId: '',
            date: moment(date).format('DD-MMM-YYYY'),
            data: [],
            categoryData: expenceCategoryDataArray
        }
    }

    componentDidMount() {
        this.props.onRef(this);
        this._getData();
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    componentDidUpdate(prevProps) {
        const { authData, expenceData } = this.props;
        let totalExpence = this._getTotal(expenceData);
        let incomeLimit = authData.incomeLimit;

        if (prevProps.expenceData !== this.props.expenceData) {
            this._getData();
            if (totalExpence < incomeLimit) {
                this._onNeverAskAgain(false)
            }
        }
    }

    _getData = async () => {
        let newData = [];
        const resData = this.props.expenceData;

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
            }
            let val = newData.sort((a, b) => {
                return new Date(a.date).getTime() -
                    new Date(b.date).getTime()
            })
            this.setState({
                data: newData.reverse()
            })
        }
    }

    _getTotal = (data) => {
        let currentMonth = moment().month()
        let sum = 0;
        let d = data.filter((item) => moment(item.date).format('MMM') === moment().month(currentMonth).format('MMM')
        ).map((item) =>
            item.amount
        )
        for (let i = 0; i < d.length; i++) {
            sum += d[i]
        }
        return sum;
    }

    _onNeverAskAgain = (value) => {
        const { dispatch } = this.props;
        database.ref(`userData/${currentUser.uid}/`).update({
            neverShowPopup: value
        }).then(() => {
            dispatch(popupExpenceData(value))
        }).catch((error) => Global.error(error.message));
    }

    _checkLimit = (data) => {
        const { authData, expenceData, neverShowPopup } = this.props;
        let totalExpence = this._getTotal(expenceData);
        let incomeLimit = authData.incomeLimit;

        if (totalExpence > incomeLimit) {
            if (!neverShowPopup === true) {
                Global.error('err', () => this._storeData(data), true, () => this._onNeverAskAgain(true))
            } else {
                this._storeData(data);
            }
        }
        else {
            this._storeData(data)
        }
    }

    _toggleModal = (value, keyId) => {
        this.setState({
            showModal: !this.state.showModal,
            mode: value === 'update' ? 'update' : 'add',
            keyId: value === 'update' ? keyId : ''
        })
    }

    _renderItem = (item) => {
        return (
            <RenderRow description={item.item.description} categoryName={item.item.categoryName} categoryType={item.item.categoryType} amount={item.item.amount} date={item.item.date} type={item.item.type} onPress={() => this._toggleModal('update', item.item.id)} />
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

    _storeData = (data) => {
        const { dispatch } = this.props;
        let expenceId = database.ref(`userData/${currentUser.uid}/expenceData`).push().key;
        const expenceData = {
            expenceId,
            ...data
        }
        database.ref(`userData/${currentUser.uid}/expenceData/${expenceId}`).update({
            ...expenceData
        }).then(() => {
            this.setState({
                loading: false
            })
            dispatch(setExpenceData(expenceData))
            this._toggleModal()
        }).catch((error) => Global.error(error.message));
    }

    _updateData = (keyID, data) => {
        database.ref(`userData/${currentUser.uid}/expenceData/${keyID}`).update({
            ...data
        }).then(() => {
            this._updateExpenceData(keyID, data)
        }).catch((error) => Global.error(error.message));
    }

    _updateExpenceData = (keyId, data) => {
        const index = this.props.expenceData.findIndex(obj => obj.expenceId === keyId)
        var tmpList = this.props.expenceData;
        var temp = tmpList[index];

        var temp = {
            expenceId: keyId,
            ...data
        }
        tmpList[index] = temp;
        this.setState({
            loading: false
        })
        this.props.dispatch(updateExpenceData(tmpList));
        this._toggleModal();
        this._getData();
        this.props.updateAmountData();
    }

    _onSubmit = (data) => {
        this.setState({
            loading: true
        })
        const expenceData = {
            description: data.description,
            categoryName: data.categoryName,
            categoryType: data.categoryType,
            amount: parseInt(data.amount),
            date: data.date,
            type: 'expence'
        }
        this._checkLimit(expenceData);

    }

    _onDelete = (keyId) => {
        database.ref(`userData/${currentUser.uid}/expenceData/${keyId}`).remove()
        this.props.dispatch(deleteExpenceData(keyId));

        this._toggleModal();
    }

    _onUpdate = (keyId, data) => {
        this.setState({
            loading: true
        })
        var temp = {
            description: data.description,
            categoryName: data.categoryName,
            categoryType: data.categoryType,
            amount: parseInt(data.amount),
            date: data.date,
            type: 'expence'
        }
        this._updateData(keyId, temp);
    }

    _renderModal = () => {
        const { categoryData, mode, keyId, data, loading } = this.state;

        const itemData = data.filter((item) => item.id === keyId)
        return (
            <ModalView visible={this.state.showModal} style={styles.modalParentView}>
                <View style={styles.modalView}>
                    <Button style={styles.closeBtn} onPress={() => this._toggleModal('close')}>
                        <Icon name={'mt close'} size={25} color={colors.voilet} />
                    </Button>
                    <Scroll>
                        <RenderForm
                            loading={loading}
                            keyId={keyId}
                            data={itemData}
                            categoryData={categoryData}
                            onPress={(value) => this._onSubmit(value)}
                            onUpdatePress={(keyId, data) => this._onUpdate(keyId, data)}
                            onDeletePress={(keyId) => this._onDelete(keyId)}
                            mode={mode} />
                    </Scroll>
                </View>
            </ModalView>
        );
    }


    render() {
        return (
            <View>
                <View style={styles.container}>
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
                {/* <Button linearGradient style={styles.buttonStyle} onPress={this._toggleModal}>
                    <Icon name={'mt add'} size={50} color={colors.white} />
                </Button> */}
                {this._renderModal()}
            </View>
        );
    }
}

Expence.propTypes = {
    dispatch: PropTypes.func,
    theme: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

const mapStateToProps = state => ({
    theme: state.theme,
    authData: state.setAuthDataReducer.authData,
    neverShowPopup: state.setExpenceDataReducer.neverShowPopup,
    expenceData: state.setExpenceDataReducer.expenceData
});

export default connect(mapStateToProps)(Expence);