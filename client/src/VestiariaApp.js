import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import Header from './common/Header';
import Home from './Home';
import WorkGrid from './common/WorkGrid';
import Modal from './common/Modal';
import Work from './Work';
import About from './About';
import * as p from './VestiariaApp.props';
import Contact from './Contact';
import '../assets/site.css';
import '../assets/fonts.css';

// TODO check prop types def
const propTypes = {
  section: p.sections.isRequired,
  // works: PropTypes.array.isRequired,
  // homeGallery: PropTypes.array.isRequired,
  // slug of work route
  workActive: PropTypes.string.isRequired
};
//
// const defaultProps = {
//   works: []
// };

function VestiariaApp(props) {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    console.log('toggleModal', showModal);
    setShowModal(!showModal);
  }

  const { section, workActive, workGalleryOpen } = props;
  let content;
  // console.log(section);
  if (section === 'home') content = <Home />;
  else if (section === 'about') content = <About />;
  else if (section === 'contact') content = <Contact />;
  else if (section === 'work') content = <Work slug={workActive} />;
  else content = null;

  return (
    <div className="app">
      <Header
        active={section}
        worksActive={workGalleryOpen}
        toggleWorks={toggleModal}
      />
      <Modal show={showModal} handleClose={toggleModal}>
        <WorkGrid />
      </Modal>
      <div className="app__container" id="app__container">
        {content}
      </div>
    </div>
  );
}
VestiariaApp.propTypes = propTypes;

/* eslint-disable */
render(
  <VestiariaApp
    works={works}
    section={section}
    workActive={work}
    children={body}
    homeGallery={homeGallery}
  />,
  document.getElementById('app')
  /* eslint-enable */
);
