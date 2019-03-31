import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Image from 'react-shimmer';
import * as actions from '../actions';

import './_workGrid.styl';

const propTypes = {
  show: PropTypes.bool
};

const defaultProps = {
  show: false
};

function WorkGrid({ show }) {
  const firstWork = useRef(null);
  const [works, setWorks] = useState([]);

  function handleAPIData(err, res) {
    if (!err && res.ok && res.body && res.body.data) {
      console.log('WorkGrid#setWorks', res.body.data);
      setWorks(res.body.data);
    }
    if (firstWork && firstWork.current) {
      firstWork.current.focus();
    }
  }

  useEffect(() => {
    if (show && firstWork && firstWork.current) {
      // Focusing first element when opening
      firstWork.current.focus();
    }
  }, [show]);

  // Fetching data from API on init
  useEffect(() => {
    console.log('WorkGrid#init()');
    actions.getWorks().end(handleAPIData);
  }, []);

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
