import React from 'react';
import { render } from 'react-dom';
import VestiariaApp from './VestiariaApp';
import '../assets/site.css';
import '../assets/fonts.css';

/* eslint-disable */
render(
  <VestiariaApp
    works={works}
    section={section}
    workActive={workSlug}
    children={body}
    homeGallery={homeGallery}
  />,
  document.getElementById('app')
  /* eslint-enable */
);
