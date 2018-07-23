module.exports = {

  changeFormat (date) {
    const converted = []
    const splitted = date.slice(0, 10).split('-')
    converted.push(splitted[2])
    switch (splitted[1]) {
      case '01': { converted.push('Jan') ; break }
      case '02': { converted.push('Feb') ; break }
      case '03': { converted.push('Mar') ; break }
      case '04': { converted.push('Apr') ; break }
      case '05': { converted.push('May') ; break }
      case '06': { converted.push('Jun') ; break }
      case '07': { converted.push('Jul') ; break }
      case '08': { converted.push('Aug') ; break }
      case '09': { converted.push('Sep') ; break }
      case '10': { converted.push('Oct') ; break }
      case '11': { converted.push('Nov') ; break }
      case '12': { converted.push('Dec') ; break }
    }
    converted.push(splitted[0])
    return converted.join('-')
  },

  changeFormatForToday (date) {

  }

};
