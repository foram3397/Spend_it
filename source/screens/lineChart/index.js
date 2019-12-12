import React from 'react'
import { View } from 'react-native'
import { Defs, LinearGradient, G, Stop, Circle } from 'react-native-svg'
import { LineChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { colors } from "../../theme";

class LineChartView extends React.PureComponent {

    render() {
        const { style, data, index, isToolTip } = this.props;
        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                    <Stop offset={'0%'} stopColor={'rgb(244, 200, 244)'} />
                    <Stop offset={'100%'} stopColor={'rgb(244, 210, 255)'} />
                </LinearGradient>
            </Defs>
        )

        const Tooltip = ({ x, y }) => {
            return (
                <G
                    x={x(index) - (75 / 2)}
                    key={'tooltip'}
                    onPress={() => { }}
                >

                    <G x={75 / 2}>
                        <Circle
                            cy={y(data[index])}
                            r={10}
                            stroke={colors.white}
                            strokeWidth={7}
                            fill={colors.voilet}
                            fillOpacity={1.0}
                        />
                    </G>
                </G>
            )
        }



        return (
            <View>
                <LineChart
                    style={style}
                    data={data}
                    showGrid={false}
                    curve={shape.curveNatural}
                    contentInset={{ top: 15, bottom: 25, left: 5, right: 5 }}
                    svg={{
                        strokeWidth: 5,
                        stroke: 'url(#gradient)',
                    }}
                    numberOfTicks={0}
                >
                    <Grid />
                    <Gradient />
                    {isToolTip && <Tooltip />}

                </LineChart>

            </View>
        )
    }

}

export default LineChartView