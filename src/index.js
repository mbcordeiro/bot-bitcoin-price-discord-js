const Discord = require('discord.js')
const btcValue = require('btc-Value')
const getToken = require('./token')
const getKey = require('./key')

const token = getToken.token()
const apiKeyBtcValue = getKey.key()

const bot = new Discord.Client();

bot.login(token)

bot.on('ready', () => console.log('ok'))

btcValue.setApiKey(apiKeyBtcValue)

bot.on('message', () => {
    if (message.author.equal(bot.user)) return
    if(message.content == '!btc') {
        btcValue().then(value => {
            btcValue.getPercentageChangeLastDay().then(percentage => {
                let perc = percentage
                if (perc > 0) {
                    message.channel.send(`O preço do bitcoin é ${value} $ \nSubiu (ultimo dia): ${perc}% :hugging:`)
                } else if(perc < 0) {
                    message.channel.send(`O preço do bitcoin é ${value} $ \nDesceu (ultimo dia): ${perc}% :sob:`)
                } else {
                    message.channel.send(`O preço do bitcoin é ${value} $ \nManteve (ultimo dia): ${perc}% :rolling_eyes:`)
                }
            })
        })
    }
})