/* eslint-disable no-undef */
import React from 'react';
import { render } from 'react-dom';
import VestiariaApp from './VestiariaApp';
import '../assets/site.css';
import '../assets/fonts.css';

render(
  <VestiariaApp
    works={works}
    section={section}
    workActive={workSlug}
    homeGallery={homeGallery}
  />,
  document.getElementById('app')
);
