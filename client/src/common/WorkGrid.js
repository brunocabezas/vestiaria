import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import superagent from 'superagent';
import Image from 'react-shimmer';
import worksMock from '../../mocks/works-get-response.json';

import './workGrid.styl';

const propTypes = {
  show: PropTypes.bool
};

const defaultProps = {
  show: false
};

function WorkGrid(props) {
  const firstWork = useRef(null);
  const [works, setWorks] = useState([]);

  function handleAPIData(err, res) {
    if (!err && res.ok && res.body && res.body.data) {
      setWorks(worksMock.data);
    }
    // TODO remove this when using real api (production)
    setWorks(worksMock.data);
    firstWork.current.focus();
  }

  useEffect(() => {
    if (props.show && firstWork && firstWork.current) {
      // Focusing first element when opening
      firstWork.current.focus();
    }
  }, [props.show]); // eslint-disable-line
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Fetching data from API
    superagent.get('/api/home_gallery').end(handleAPIData);
  });

  return (
    <div className="workGrid">
      {works.length > 0 &&
        works.map((work, i) => {
          const url = work.heroImage && work.heroImage.url;
          return (
            <div className="workGrid__work" key={work.slug}>
              <a
                ref={i === 0 ? firstWork : null}
                title={work.name}
                className="workGrid__workLink"
                href={`/works/${work.slug}`}
              >
                <Image
                  src={url}
                  width="25%"
                  height={150}
                  style={{ objectFit: 'cover' }}
                  delay={25}
                  duration={0.9}
                />
              </a>
            </div>
          );
        })}
    </div>
  );
}
WorkGrid.defaultProps = defaultProps;
WorkGrid.propTypes = propTypes;
export default WorkGrid;
