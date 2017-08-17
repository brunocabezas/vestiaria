import React from 'react';
import {render} from 'react-dom';
import superagent from 'superagent';
import PropTypes from 'prop-types';

const propTypes = {
  images : PropTypes.arrayOf(PropTypes.shape({
    _id : PropTypes.string,
    format : PropTypes.oneOf(['png','jpg']),
    height: PropTypes.number,
    width : PropTypes.number,
    secure_url : PropTypes.string,
    url : PropTypes.string,
  }))
};

const defaultProps = {
  images : null
}

class Gallery extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      images : props.images,
      // active index to select current photo of the gallery
      active : 0
    };

    this.changePhoto = this.changePhoto.bind(this);
  }

  changePhoto(){
    const {active,images} = this.state;
    if (active>=images.length)
      return;

    this.setState({active:active+1})
  }

  render() {
    const {images,active} = this.state,
      currentImage = images && images[active] && images[active].url,
      style = {
         backgroundImage : 'url('+currentImage+')'
      };

		return (
			<div className="gallery">
        {images && images.length>0 &&
          <div id="imageButton" onClick={this.changePhoto} style={style} />
        }
        <div className="progress-bar">
            <span className="progress-bar-fill"></span>
        </div>
      </div>
		);
  };
}

Gallery.defaultProps = defaultProps;
Gallery.propTypes = propTypes;
export default Gallery;
