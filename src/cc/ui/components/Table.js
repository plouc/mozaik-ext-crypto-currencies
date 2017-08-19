import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetTable,
    WidgetTableCell as Cell,
    WidgetTableHeadCell as HeadCell,
} from '@mozaik/ui'
import DollarIcon from 'react-icons/lib/fa/dollar'

const VariationValue = ({ value, theme: { colors } }) => {
    let color = colors.unkown
    if (value < 0) {
        color = colors.failure
    } else if (value > 0) {
        color = colors.success
    }

    return (
        <span style={{ color }}>
            {value}
        </span>
    )
}

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
                <WidgetTable>
                    <thead>
                        <tr>
                            <HeadCell>name</HeadCell>
                            <HeadCell>value</HeadCell>
                            <HeadCell>1H</HeadCell>
                            <HeadCell>24H</HeadCell>
                            <HeadCell>7 days</HeadCell>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map(
                            ({
                                id,
                                name,
                                price_usd,
                                percent_change_1h,
                                percent_change_24h,
                                percent_change_7d,
                            }) =>
                                <tr key={id}>
                                    <Cell>
                                        <strong>
                                            {name}
                                        </strong>
                                    </Cell>
                                    <Cell>
                                        {price_usd.toLocaleString()}&nbsp;US$
                                    </Cell>
                                    <Cell>
                                        <VariationValue value={percent_change_1h} theme={theme} />
                                    </Cell>
                                    <Cell>
                                        <VariationValue value={percent_change_24h} theme={theme} />
                                    </Cell>
                                    <Cell>
                                        <VariationValue value={percent_change_7d} theme={theme} />
                                    </Cell>
                                </tr>
                        )}
                    </tbody>
                </WidgetTable>
            )
        }

        return (
            <Widget>
                <WidgetHeader title="Info" icon={DollarIcon} />
                <WidgetBody>
                    {body}
                </WidgetBody>
            </Widget>
        )
    }
}
