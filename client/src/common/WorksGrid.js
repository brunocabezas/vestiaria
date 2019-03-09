import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import superagent from 'superagent';
import PropTypes from 'prop-types';
import worksMock from '../../mocks/works-get-response.json';
//
// const propTypes = {
//   // works: PropTypes.arrayOf(
//   //   PropTypes.shape({
//   //     _id: PropTypes.string,
//   //     date: PropTypes.string,
//   //     name: PropTypes.string,
//   //     slug: PropTypes.string,
//   //     video: PropTypes.string,
//   //     heroImage: PropTypes.shape({
//   //       url: PropTypes.string
//   //     })
//   //   })
//   // ),
//   display: PropTypes.bool
// };
//
// const defaultProps = {
//   display: true
// };

function WorksGrid(props) {
  const [works, setWorks] = useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Fetching data from API
    superagent.get('/api/home_gallery').end(function(err, res) {
      if (!err && res.ok && res.body && res.body.data) {
        setWorks(worksMock.data);
      }
      setWorks(worksMock.data);
      console.log(worksMock.data);
    });
  });

  return (
    <div className="work-gallery" id="mylightbox">
      {works.length > 0 &&
        works.map((work, i) => {
          const url = work.heroImage && work.heroImage.url;
          const style = url
            ? {
                backgroundImage: `url(${url})`
              }
            : null;

          return (
            <div className="work" key={work.name + i}>
              <a
                title={work.name}
                className="image"
                style={style}
                href={`/works/${work.slug}`}
              />
            </div>
          );
        })}
    </div>
  );
}

// class WorkGrid extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       works : null
//     };
//   }
//
//   componentWillMount(){
//     const setState = this.setState;
//     superagent
//       .get('/api/works')
//       .end(function (err, res) {
//           if (!err && res.ok && res.body && res.body.data) {
//             this.setState({works: res.body.data});
//           }
//       }.bind(this));
//   }
//
//   render() {
//     const {works} = this.state;
//
// 		return (
//       <div className="work-gallery" id="mylightbox">
//         {works && works.length>0 &&
//           works.map((work,i)=>{
//             const url = work.heroImage && work.heroImage.url,
//               style = url && {
//                  backgroundImage : 'url('+url+')'
//               } || {};
//
//             return (
//               <div className="work" key={work.name+i}>
//                 <a title={work.name}
//                   className="image"
//                   style={style}
//                   href={"/works/"+work.slug}>
//                 </a>
//               </div>
//           );
//         })}
//       </div>
// 		);
//   }
// }

// WorksGrid.defaultProps = defaultProps;
// WorksGrid.p/ropTypes = propTypes;
export default WorksGrid;
