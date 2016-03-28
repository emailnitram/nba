var React = require('react');

var Highlight = React.createClass({
  getInitialState: function() {
    return {
      currentVideoPosition: 0
    }
  },
  componentWillUnmount: function() {
    document.getElementById('myVideo').removeEventListener('ended', function(e) {
      console.log('removed')
    });
  },
  componentDidMount: function() {
    // if(this.props.tag === 'myVideo') {
    //   console.log('video tag')
    //   var myVideo = document.getElementById('myVideo')
    //   myVideo.addEventListener('ended', function(e) {
    //     var shortCode = this.getNextShortCode();
    //     myVideo.src = '//cdn.streamable.com/video/mp4-mobile/' + shortCode + '.mp4'
    //     myVideo.load();
    //     myVideo.play();
    //     console.log('myVideo', shortCode)
    //   }.bind(this))
    // }
  },
  render: function() {
    return (
      <div>
        <h5>{this.props.title}</h5>
        <video width='100%' controls poster={'//cdn.streamable.com/image/' + this.props.shortCode + '.jpg'} id={this.props.tag} preload='none'>
          <source src={'//cdn.streamable.com/video/mp4-mobile/' + this.props.shortCode + '.mp4'} type='video/mp4' />
          <source src={'//cdn.streamable.com/video/webm-mobile/' + this.props.shortCode + '.webm'} type='video/webm' />
          Your browser doesn't support HTML5 video tag.
        </video>
      </div>
    )
  }
});

module.exports = Highlight;
