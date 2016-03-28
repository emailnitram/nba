var React = require('react');
var Highlight = require('../components/Highlight');
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

function getShortCode(url) {
  return url.split('/')[3];
}

var MainContainer = React.createClass({
  getInitialState: function() {
    return {
      after: '',
      children: [],
      currentVideoPosition: 1,
      videoListenerSet: false
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
      if(this.state.children.length < 25 && data.after !== '') {
        this.getNextListOfData();
      }
    }.bind(this));
  },
  getNextShortCode: function() {
    console.log('this.state', this.state)
    var url = this.state.children[this.state.currentVideoPosition].data.url;
    var next = this.state.currentVideoPosition + 1;
    this.setState({
      currentVideoPosition: next
    });
    return getShortCode(url);
  },
  componentDidMount: function() {
    this.getNextListOfData();
  },
  componentDidUpdate: function() {
    console.log('component update')
    var myVideo = document.getElementById('myVideo');
    if(!this.state.videoListenerSet && !!myVideo){

      this.setState({
        videoListenerSet: true
      })

      myVideo.addEventListener('play', function(e) {
        var shortCode = this.getNextShortCode();
        myVideo.src = '//cdn.streamable.com/video/mp4-mobile/' + shortCode + '.mp4'
        myVideo.load();
        myVideo.play();
        console.log('myVideo', shortCode)
      }.bind(this))

      myVideo.addEventListener('ended', function(e) {
        var shortCode = this.getNextShortCode();
        myVideo.src = '//cdn.streamable.com/video/mp4-mobile/' + shortCode + '.mp4'
        myVideo.load();
        myVideo.play();
        console.log('myVideo', shortCode)
      }.bind(this))
    }
  },
  render: function() {
    if(this.state.children.length === 0) {
      return <div>Loading</div>
    }
    return (
      <div>
        <Highlight
          title='Play All'
          shortCode={getShortCode(this.state.children[0].data.url)}
          tag='myVideo'
        />
        {this.state.children.map(function(highlight) {
          return (
            <Highlight
              key={highlight.data.id}
              title={highlight.data.title}
              shortCode={getShortCode(highlight.data.url)}
            />
          )
        })}
      </div>
    )
  }
});

module.exports = MainContainer;
