'use strict'

const Alexa = require('alexa-sdk')
const Hebcal = new require('hebcal')()
const APP_ID = 'SOME_APPID_HERE'

const NO_HOLIDAY = 'Today is not a Jewish holiday'
const YES_HOLIDAY = 'Today is the Jewish holiday of '
const YES_HOLIDAYS = 'Today are the Jewish holidays of '

const getHoliday = function (curDate) {
  let today = Hebcal.find(curDate)
  let holidays = Hebcal.holidays[today]
  if (!holidays) {
    return NO_HOLIDAY
  } else if (holidays.length === 1) {
    return YES_HOLIDAY + holidays[0].desc[0]
  } else if (holidays.length > 1) {
    return YES_HOLIDAYS + listify(holidays)
  }
  return NO_HOLIDAY
}

const listify = function (items) {
  if (items.length === 1) {
    return items[0]
  } else if (items.length === 2) {
    return items[0].desc[0] + ' and ' + items[1].desc[0]
  } else if (items.length > 2) {
    let result = ''
    for (var i = 0; i < items.length - 1; i++) {
      result += items[i].desc[0] + ', '
    }
    result += 'and ' + items[items.length - 1].desc[0]
    return result
  }
  return null
}

const handlers = {
  'IsTodayIntent': function () {
    let response = getHoliday(new Date())
    this.emit(':tell', response)
  },
  'AMAZON.HelpIntent': function () {
    var message = 'I can tell you if today is a holiday. Try asking: \'Is today a Hebrew holiday?\''
    this.emit(':ask', message, message)
  },
  'Unhandled': function () {
    this.emit('AMAZON.HelpIntent')
  }
}

exports.handler = (event, context) => {
  const alexa = Alexa.handler(event, context)
  alexa.APP_ID = APP_ID
  alexa.registerHandlers(handlers)
  alexa.execute()
}
