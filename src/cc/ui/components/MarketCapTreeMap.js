import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Widget, WidgetHeader, WidgetBody } from '@mozaik/ui'
import { ResponsiveTreeMap } from 'nivo'
import DollarIcon from 'react-icons/lib/fa/dollar'

export default class MarketCapTreeMap extends Component {
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
                <ResponsiveTreeMap
                    root={{
                        name: 'volumes',
                        children: stats.map(entry => ({
                            name: entry.name,
                            value: Number(entry.market_cap_usd),
                            symbol: entry.symbol,
                        })),
                    }}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    theme={theme}
                    colors={theme.charts.colors}
                    colorBy="symbol"
                    leavesOnly={true}
                    innerPadding={2}
                    enableLabels={true}
                    label="name"
                />
            )
        }

        return (
            <Widget>
                <WidgetHeader title="Market cap (US$)" icon={DollarIcon} />
                <WidgetBody>
                    {body}
                </WidgetBody>
            </Widget>
        )
    }
}
