import React from 'react';
import {render} from 'react-dom';
import superagent from 'superagent';
import PropTypes from 'prop-types';

const propTypes = {
  works : PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    date: PropTypes.string,
    name: PropTypes.string,
    slug: PropTypes.string,
    video: PropTypes.string,
    heroImage : PropTypes.shape({
      url: PropTypes.string
    })
  })),
  display : PropTypes.bool
};

const defaultProps = {
  works : null,
  display : true
};

class WorkGrid extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      works : null
    }
  }

  componentWillMount(){
    const setState = this.setState;
    superagent
      .get('/api/works')
      .end(function (err, res) {
          if (!err && res.ok) {
            this.setState({works: res.body.data});
          }
      }.bind(this))
  }

  render() {
    const {works} = this.state;

		return (
      <div className="work-gallery" id="mylightbox">
        {works && works.length>0 &&
          works.map((work,i)=>{
            const url = work.heroImage && work.heroImage.url,
              style = url && {
                 backgroundImage : 'url('+url+')'
              } || {};

            return (
              <div className="work" key={work.name+i}>
                <a title={work.name}
                  className="image"
                  style={style}
                  href={"/works/"+work.slug}>
                </a>
              </div>
          )
        })}
      </div>
		);
  };
}

WorkGrid.defaultProps = defaultProps;
WorkGrid.propTypes = propTypes;
export default WorkGrid;
