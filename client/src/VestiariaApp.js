import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
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
import './vestiariaApp.styl';

// App Title
const TITLE = 'Claudia Robles';

const propTypes = {
  section: p.sections.isRequired
};

const history = createBrowserHistory();

function VestiariaApp(props) {
  const [initialized, setInitialized] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function closeModal(avoidSet = false) {
    if (!avoidSet) setShowModal(false);
    history.push(`/`);
    document.title = TITLE;
  }

  function toggleModal() {
    setShowModal(!showModal);
    console.log('VestiariaApp#setShowModal()', !showModal);
    // Removing works from url when closing modal
    if (!showModal === false) {
      closeModal(true);
    } else {
      history.push(`/?works`);
      document.title = `${TITLE} - Works`;
    }
  }

  function getContentBySection() {
    const { section, workActive } = props;

    if (section === 'home') {
      return <Home />;
    }
    if (section === 'about') {
      return <About />;
    }
    if (section === 'contact') {
      return <Contact />;
    }
    if (section === 'work') {
      return <Work work={workActive} />;
    }
    return null;
  }

  // listen to history (e.g. browsers button) changes
  useEffect(() => {
    // returned function will be called on component unmount
    return history.listen((location) => {
      // location is an object like window.location
      if (location.search.includes('works')) {
        setShowModal(true);
        document.title = `${TITLE} - Works`;
      } else {
        document.title = TITLE;
        setShowModal(false);
      }
    });
  }, []);

  // Init
  useEffect(() => {
    const isWorksOnUrl = history.location.search.includes('works');
    if (isWorksOnUrl && !initialized) {
      console.log('VestiariaApp#init()');
      toggleModal();
      setInitialized(true);
      document.title = `${TITLE} - Works`;
    } else if (!initialized) {
      document.title = TITLE;
      setInitialized(true);
    }
  });

  const { section } = props;
  const content = getContentBySection();

  return (
    <div className="app">
      <Header
        active={section}
        worksActive={showModal}
        toggleWorks={toggleModal}
      />
      <Modal show={showModal} handleClose={closeModal}>
        <WorkGrid show={showModal} />
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
