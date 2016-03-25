var React = require('react');

function Highlight(props) {
  console.log(props)
  return (
    <div>
      <h5>{props.title}</h5>
      <video width='100%' controls poster={'//cdn.streamable.com/image/' + props.shortCode + '.jpg'}>
        <source src={'//cdn.streamable.com/video/mp4-mobile/' + props.shortCode + '.mp4'} type='video/mp4' />
        <source src={'//cdn.streamable.com/video/webm-mobile/' + props.shortCode + '.webm'} type='video/webm' />
        Your browser doesn't support HTML5 video tag.
      </video>
    </div>
  )
}

function getShortCode(url) {
  return url.split('/')[3];
}

function Main(props) {
  return (
    <div>
      {props.children.map(function(highlight) {
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

module.exports = Main;
