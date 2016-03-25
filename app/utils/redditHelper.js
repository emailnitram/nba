var axios = require('axios');

module.exports = {
  getNbaData: function(after) {
    var afterString = '';
    if(after !== '') {
      afterString =  '?after=' + after;
    }
    return axios.get('https://www.reddit.com/r/nba.json' + afterString)
  }
}
