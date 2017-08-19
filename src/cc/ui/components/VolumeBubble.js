import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Widget, WidgetHeader, WidgetBody } from '@mozaik/ui'
import { ResponsiveBubble } from 'nivo'
import DollarIcon from 'react-icons/lib/fa/dollar'

export default class Table extends Component {
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
                <ResponsiveBubble
                    root={{
                        id: 'volumes',
                        children: stats.map(entry => ({
                            id: entry.symbol,
                            value: entry['24h_volume_usd'],
                        })),
                    }}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    theme={theme}
                    colors={theme.charts.colors}
                    colorBy="id"
                    leavesOnly={true}
                />
            )
        }

        return (
            <Widget>
                <WidgetHeader title="Volume" icon={DollarIcon} />
                <WidgetBody>
                    {body}
                </WidgetBody>
            </Widget>
        )
    }
}
