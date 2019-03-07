import React from 'react';
import {render} from 'react-dom';
import superagent from 'superagent';
import Gallery from './Gallery';
import PropTypes from 'prop-types';

const propTypes = {
  gallery : PropTypes.shape({
    _id : PropTypes.string,
    images : PropTypes.arrayOf(PropTypes.shape({
      _id : PropTypes.string,
      format : PropTypes.oneOf(['png']),
      height: PropTypes.string,
      width : PropTypes.string,
      secure_url : PropTypes.string,
      url : PropTypes.string,
    })),
    key : PropTypes.string,
    name : PropTypes.string,
    // string formated date e.g. "2017-07-30T21:33:38.000Z"
    publishedDate : PropTypes.string,
  })
};

const defaultProps = {
  gallery : null
};

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      gallery : null
    };
  }

  componentWillMount(){
    const setState = this.setState;
    superagent
      .get('/api/home_gallery')
      .end(function (err, res) {
          if (!err && res.ok && res.body && res.body.data) {
            this.setState({gallery: res.body.data});
          }
      }.bind(this));

  }

  render() {
    const {gallery} = this.state;
		return (
			<div className="app__home home">
  			<div className="wrapper">
          {gallery && <Gallery images={gallery.images} />}
        </div>
      </div>
		);
  }
}

Home.defaultProps = defaultProps;
Home.propTypes = propTypes;
export default Home;
