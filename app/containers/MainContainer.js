var React = require('react');
var Main = require('../components/Main');
var redditHelper = require('../utils/redditHelper');

function filterVideoClips(response) {
  var filteredChildren = response.data.data.children.filter(function(item){
    var url = item.data.url;
    return /streamable/.test(url)
  })
  return {
    children: filteredChildren,
    after: response.data.data.after
  }
}

var MainContainer = React.createClass({
  getInitialState: function() {
    return {
      after: '',
      children: []
    }
  },
  getNextListOfData: function() {
    redditHelper.getNbaData(this.state.after)
    .then(filterVideoClips)
    .then(function(data) {
      this.setState({
        after: data.after,
        children: this.state.children.concat(data.children)
      })
      console.log('data.after', this.state.children.length)
      if(this.state.children.length < 30 && data.after !== '') {
        this.getNextListOfData();
      }
    }.bind(this))
  },
  componentDidMount: function() {
    this.getNextListOfData();
  },
  render: function() {
    return (
      <Main children={this.state.children} />
    )
  }
});

module.exports = MainContainer;
