import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import Header from './common/Header';
import WorkGrid from './common/WorkGrid';
import Modal from './common/Modal';
import Work from './pages/Work';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import * as p from './VestiariaApp.props';
import actions from './actions'; //eslint-disable-line
import './vestiariaApp.styl';

// App Title
const TITLE = 'Claudia Robles';

const propTypes = {
  section: p.sections.isRequired
};

const history = createBrowserHistory();

// App content, switches between page components depending env variables
const contentPropTypes = {
  section: PropTypes.string.isRequired,
  data: PropTypes.string
};

const contentDefaultProps = { data: null };
const AppContent = ({ section, data }) => {
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
    return <Work workSlug={data} />;
  }
  return null;
};
AppContent.propTypes = contentPropTypes;
AppContent.defaultProps = contentDefaultProps;

// Main app
function VestiariaApp(props) {
  const [showModal, setShowModal] = useState(false);

  function closeModal(avoidSet = false) {
    if (!avoidSet) setShowModal(false);
    history.push(`/`);
  }

  function toggleModal() {
    setShowModal(!showModal);
    console.log('VestiariaApp#setShowModal()', !showModal);
    // Removing works from url when closing modal
    if (!showModal === false) {
      closeModal(true);
    } else {
      history.push(`/?works`);
    }
  }

  // listen to history (e.g. browsers button) changes
  useEffect(() => {
    console.log('VestiariaApp#init()');
    const isWorksOnUrl = history.location.search.includes('works');
    document.title = isWorksOnUrl ? `${TITLE} - Works` : TITLE;
    if (isWorksOnUrl) {
      setShowModal(true);
      history.push(`/?works`);
    }
    // returned function will be called on component unmount
    return history.listen(location => {
      // location is an object like window.location
      if (location.search.includes('works')) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    });
  }, []);

  // Sets apps title if modal is opened
  useEffect(() => {
    if (showModal) {
      document.title = `${TITLE} - Works`;
    } else {
      document.title = TITLE;
    }
  }, [showModal]);

  const { section, workActive } = props;
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
        <AppContent section={section} data={workActive} />
      </div>
    </div>
  );
}
VestiariaApp.propTypes = propTypes;
export default VestiariaApp;
