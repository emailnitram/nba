var React = require('react');
var ReactDOM = require('react-dom');

var imgStyle = {
  maxHeight: '200px'
}

var HighLight = React.createClass({
  render: function() {
    return (
      <div>
        <video preload="none" controls poster={"https://cdn.streamable.com/image/" + this.props.h.shortCode + ".jpg"} width="100%">
          <source src={"https://cdn.streamable.com/video/mp4-mobile/" + this.props.h.shortCode + ".mp4"} />
        </video>
          <h1>{this.props.h.title}</h1>
      </div>
      );
  }
});

function filterStreamableLinks(allHighlights) {
  return allHighlights.filter(item => /streamable/.test(item.data.url))
}

function formatData(highlights) {
  return highlights.map(function(item) {

       return {
        title: item.data.title,
        shortCode: item.data.url.split('/')[3]
      }
  } 
    )
}

var UserGist = React.createClass({
  getInitialState: function() {
    return {
      after: '',
      highlights: [],
    };
  },

  componentDidMount: function() {
    fetch(this.props.source).then(function(response) {
      return response.json();
    }).then(function(result) {
      console.log('result', result)
      let streamableLinks = filterStreamableLinks(result.data.children);
      if (this.isMounted()) {
        this.setState({
          after: result.data.after,
          highlights: formatData(streamableLinks),
        });
      }
    }.bind(this));
  },

  render: function() {
    console.log(this.state.highlights);
    return (
      <div>
        {this.state.highlights.map((h, i) => <HighLight key={i} h={h} />)}
      </div>
    );
  }
});

ReactDOM.render(
  <UserGist source="https://www.reddit.com/r/nba/top.json" />,
  document.getElementById('nba')
);
