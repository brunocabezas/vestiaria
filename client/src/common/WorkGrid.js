import React, { useState, useEffect } from 'react';
import superagent from 'superagent';
import Image from 'react-shimmer';
import worksMock from '../../mocks/works-get-response.json';

import './workGrid.styl';

function WorkGrid() {
  const [works, setWorks] = useState([]);

  function handleAPIData(err, res) {
    if (!err && res.ok && res.body && res.body.data) {
      setWorks(worksMock.data);
    }
    // TODO remove this when using real api (production)
    setWorks(worksMock.data);
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Fetching data from API
    superagent.get('/api/home_gallery').end(handleAPIData);
  });

  return (
    <div className="workGrid">
      {works.length > 0 &&
        works.map(work => {
          const url = work.heroImage && work.heroImage.url;

          return (
            <div className="workGrid__work" key={work.slug}>
              <a
                title={work.name}
                className="workGrid__workLink"
                href={`/works/${work.slug}`}
              >
                <Image
                  src={url}
                  width="25%"
                  height={150}
                  style={{ objectFit: 'cover' }} // Style your <img>
                  delay={25}
                  duration={0.9} // Customize the animation duration (s).
                />
              </a>
            </div>
          );
        })}
    </div>
  );
}
export default WorkGrid;
