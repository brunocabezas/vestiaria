import React from 'react';
import {render} from 'react-dom';
import superagent from 'superagent';
import PropTypes from 'prop-types';
import Gallery from './Gallery';
import Video from './Video';

const propTypes = {
  work : PropTypes.shape({
    _id: PropTypes.string,
    date: PropTypes.string,
    name: PropTypes.string,
    slug: PropTypes.string,
    video: PropTypes.string,
    heroImage : PropTypes.shape({
      url: PropTypes.string
    })
  }),
  id  : PropTypes.string
};

const defaultProps = {
  slug  : null
};

class Work extends React.Component{
  constructor(props){
    super(props);
    // console.log(props);
    this.state = {
      work : null,
      //  hold the current content state, could be 'video' or 'gallery'
      content : 'video'
    };
    this.showGallery=this.showGallery.bind(this);
    this.showVideo=this.showVideo.bind(this);
  }

  componentWillMount(){
    // console.log(nextProps);
    if(this.props.slug){
      superagent
        .get('/api/works/'+this.props.slug)
        .end(function (err, res) {
            if (!err && res.ok) {
              const work = res.body.data,
              content = work && work.video && work.video.length>0 ? 'video' :
                'gallery';

              this.setState({work,content});
            }
        }.bind(this));
    }
  }

  showGallery(){
    this.setState({content:'gallery'});
  }
  showVideo(){
    this.setState({content:'video'});
  }
  render() {
    const {work,content} = this.state,
      hasGallery = work && work.gallery && work.gallery.length>0,
      hasVideo = work && work.video && work.video.length>0,
      displayContent = work && (this.state.content==='video' ?
          <Video url={work.video}/> :
          <Gallery images={work.gallery} />
        ) || null;

    const videoButtonClass = this.state.content!=='video' ? "work-button":
      'work-button work-button--active',
      galleryButtonClass = this.state.content!=='gallery' ? "work-button":
            'work-button work-button--active';

		return !work ? null :
      <div className="app__work">
        <div className="app__work-info">
          <h1>{work.name}</h1>
          <p>{work.abstract}</p>
          {hasGallery && hasVideo &&
            <span className="work-text">
              <li className={videoButtonClass} onClick={this.showVideo}>video</li>
              <li className="separator">|</li>
              <li className={galleryButtonClass} onClick={this.showGallery}> photos</li>
            </span>
          }
        </div>

        <div className="app__work-display">
            {displayContent}
        </div>
      </div>;
  }
}

Work.defaultProps = defaultProps;
Work.propTypes = propTypes;
export default Work;
