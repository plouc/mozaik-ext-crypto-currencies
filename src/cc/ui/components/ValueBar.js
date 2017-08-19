import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Widget, WidgetHeader, WidgetBody } from '@mozaik/ui'
import { ResponsiveBar } from 'nivo'
import DollarIcon from 'react-icons/lib/fa/dollar'
import { sortBy } from 'lodash'

export default class ValueBar extends Component {
    static propTypes = {
        apiData: PropTypes.object,
        theme: PropTypes.object.isRequired,
    }

    static getApiRequest() {
        return { id: 'cc.stats' }
    }

    render() {
        const { apiData, theme } = this.props

        let body = null
        if (apiData) {
            const { stats } = apiData

            body = (
                <ResponsiveBar
                    data={sortBy(
                        stats.map(entry => ({
                            name: entry.name,
                            value: Number(entry.price_usd),
                        })),
                        'value'
                    )}
                    indexBy="name"
                    margin={{ top: 10, right: 30, bottom: 70, left: 140 }}
                    xPadding={0.3}
                    theme={theme.charts}
                    colors={theme.charts.colors}
                    colorBy="symbol"
                    leavesOnly={true}
                    innerPadding={2}
                    enableLabels={false}
                    label="name"
                    layout="horizontal"
                    enableGridX={true}
                    enableGridY={false}
                    axisBottom={{
                        legend: 'US $',
                        legendPosition: 'center',
                        legendOffset: 40,
                    }}
                />
            )
        }

        return (
            <Widget>
                <WidgetHeader title="Value (US$)" icon={DollarIcon} />
                <WidgetBody>
                    {body}
                </WidgetBody>
            </Widget>
        )
    }
}
