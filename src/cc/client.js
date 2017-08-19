'use strict'

const request = require('request-promise-native')
const chalk = require('chalk')

const API_BASE_URL = 'https://api.coinmarketcap.com'

/**
 * @param {Mozaik} mozaik
 */
module.exports = mozaik => {
    const buildApiRequest = (path, params) => {
        const options = {
            uri: `${API_BASE_URL}${path}`,
            qs: {},
            json: true,
            resolveWithFullResponse: true,
        }

        const paramsDebug = params ? ` ${JSON.stringify(params)}` : ''
        mozaik.logger.info(
            chalk.yellow(`[crypto-currencies] calling ${API_BASE_URL}${path}${paramsDebug}`)
        )

        if (params) {
            options.qs = params
        }

        return request(options)
    }

    const operations = {
        stats({ limit = 10 } = {}) {
            return buildApiRequest(`/v1/ticker/?limit=${limit}`).then(res => ({ stats: res.body }))
        },
    }

    return operations
}
