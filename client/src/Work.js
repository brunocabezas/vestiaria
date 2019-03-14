/* eslint-disable */
import React from 'react';
import superagent from 'superagent';
import PropTypes from 'prop-types';
import Gallery from './common/Gallery';
import Video from './common/Video';
import './work.styl';

const propTypes = {
  work: PropTypes.shape({
    _id: PropTypes.string,
    date: PropTypes.string,
    name: PropTypes.string,
    slug: PropTypes.string,
    video: PropTypes.string,
    heroImage: PropTypes.shape({
      url: PropTypes.string
    })
  }).isRequired,
};

class Work extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      //  hold the current content state, could be 'video' or 'gallery'
      content: 'video'
    };
    this.showGallery = this.showGallery.bind(this);
    this.showVideo = this.showVideo.bind(this);
  }

  componentWillMount() {
    // console.log(nextProps);
    if (this.props.slug) {
      superagent.get(`/api/works/${this.props.slug}`).end(
        function(err, res) {
          if (!err && res.ok) {
            const work = res.body.data;
            const content =
              work && work.video && work.video.length > 0 ? 'video' : 'gallery';

            this.setState({ work, content });
          }
        }.bind(this)
      );
    }
  }

  showGallery() {
    this.setState({ content: 'gallery' });
  }

  showVideo() {
    this.setState({ content: 'video' });
  }

  render() {
    const { work } = this.props;
    const hasGallery = work && work.gallery && work.gallery.length > 0;
    const hasVideo = work && work.video && work.video.length > 0;
    const displayContent =
      (work &&
        (this.state.content === 'video' ? (
          <Video url={work.video} />
        ) : (
          <Gallery images={work.gallery} />
        ))) ||
      null;

    const videoButtonClass =
      this.state.content !== 'video'
        ? 'work-button'
        : 'work-button work-button--active';
    const galleryButtonClass =
      this.state.content !== 'gallery'
        ? 'work-button'
        : 'work-button work-button--active';

		console.log(this.props, this.state);
    return (
      <div className="work">
        <div className="work__info">
          <h1>{work.name}</h1>
          <p>{work.abstract}</p>
          {hasGallery && hasVideo && (
            <span className="work-text">
              <li className={videoButtonClass} onClick={this.showVideo}>
                video
              </li>
              <li className="separator">|</li>
              <li className={galleryButtonClass} onClick={this.showGallery}>
                {' '}
                photos
              </li>
            </span>
          )}
        </div>

        <div className="work__media">{displayContent}</div>
				<div className="work__emptySpace"></div>
      </div>
    )
  }
}

Work.propTypes = propTypes;
export default Work;
