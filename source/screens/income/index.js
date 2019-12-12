import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import PropTypes from "prop-types";
import { setIncomeData, updateIncomeData, deleteIncomeData } from "../../redux/actions/income.actions";
import Firebase from 'react-native-firebase';

//Local Libraries
import strings from "@language";
import { Global } from "../../lib/common";
import { Button, List, Icon, Text, ModalView, Scroll } from "../../components/controls";
import { database } from "../../app/config";

//Components
import { RenderRow, RenderForm } from "../../components/common";
import incomeCategoryDataArray from "../../localization/incomeCategoryData";

//Styling
import moment from "moment";
import styles from "./styles";
import { colors, bs, sizes } from "../../theme";

const date = Date.now();
const { currentUser } = Firebase.auth();

class Income extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            showModal: false,
            mode: '',
            keyId: '',
            date: moment(date).format('DD-MMM-YYYY'),
            data: [],
            categoryData: incomeCategoryDataArray
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
        if (prevProps.incomeData !== this.props.incomeData) {
            this._getData()
        }
    }

    _getData = async () => {
        let newData = [];
        const res = this.props.incomeData;
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
            }
        }

        let val = newData.sort((a, b) => {
            return new Date(a.date).getTime() -
                new Date(b.date).getTime()
        })
        this.setState({
            data: newData.reverse()
        })
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
        let incomeId = database.ref(`userData/${currentUser.uid}/incomeData`).push().key;
        const incomeData = {
            incomeId,
            ...data
        }
        database.ref(`userData/${currentUser.uid}/incomeData/${incomeId}`).update({
            ...incomeData
        }).then(() => {
            this.setState({
                loading: false,
            });
            dispatch(setIncomeData(incomeData))
            this._toggleModal()
        }).catch((error) => Global.error(error.message));
    }

    _updateData = (keyID, data) => {

        database.ref(`userData/${currentUser.uid}/incomeData/${keyID}`).update({
            ...data
        }).then(() => {
            this._updateIncomeData(keyID, data)
        }).catch((error) => Global.error(error.message));
    }

    _updateIncomeData = (keyId, data) => {
        const index = this.props.incomeData.findIndex(obj => obj.incomeId === keyId)
        var tmpList = this.props.incomeData;
        var temp = tmpList[index];

        var temp = {
            incomeId: keyId,
            ...data
        }
        tmpList[index] = temp;
        this.setState({
            loading: false,
        });
        this.props.dispatch(updateIncomeData(tmpList))
        this._toggleModal();
        this._getData();
        this.props.updateAmountData();
    }

    _onSubmit = async (data) => {
        this.setState({
            loading: true,
        });
        const incomeData = {
            description: data.description,
            categoryName: data.categoryName,
            categoryType: data.categoryType,
            amount: parseInt(data.amount),
            date: data.date,
            type: 'income'
        }
        this._storeData(incomeData);
    }

    _onDelete = (keyId) => {
        database.ref(`userData/${currentUser.uid}/incomeData/${keyId}`).remove()
        this.props.dispatch(deleteIncomeData(keyId))
        this._toggleModal();
    }

    _onUpdate = (keyId, data) => {
        this.setState({
            loading: true,
        });
        var temp = {
            description: data.description,
            categoryName: data.categoryName,
            categoryType: data.categoryType,
            amount: parseInt(data.amount),
            date: data.date,
            type: 'income'
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
                {this._renderModal()}
            </View>
        );
    }
}

Income.propTypes = {
    dispatch: PropTypes.func,
    theme: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

const mapStateToProps = state => ({
    theme: state.theme,
    incomeData: state.setIncomeDataReducer.incomeData
});

export default connect(mapStateToProps)(Income);