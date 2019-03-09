import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import Header from './common/Header';
import Home from './Home';
import WorksGrid from './common/WorksGrid';
import Modal from './common/Modal';
import Work from './Work';
import About from './About';
import * as p from './VestiariaApp.props';
import Contact from './Contact';
import '../assets/site.css';
import '../assets/fonts.css';

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

class VestiariaApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // not used right now
      // workGalleryOpen: false,
      showModal: false
    };
    this.toggleGallery = this.toggleGallery.bind(this);
  }

  toggleGallery() {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }

  render() {
    const { section, workActive } = this.props;
    const { showModal, workGalleryOpen } = this.props;
    let content;
    // console.log(section);
    if (section === 'home') content = <Home />;
    else if (section === 'about') content = <About />;
    else if (section === 'contact') content = <Contact />;
    else if (section === 'work') content = <Work slug={workActive} />;
    else content = null;

    console.log(showModal);
    return (
      <div className="app">
        <Header
          active={section}
          worksActive={workGalleryOpen}
          toggleWorks={this.toggleGallery}
        />
        <Modal show={showModal} handleClose={this.toggleGallery}>
          <WorksGrid />
        </Modal>
        <div className="app__container" id="app__container">
          {content}
        </div>
      </div>
    );
  }
}

// VestiariaApp.defaultProps = defaultProps;
VestiariaApp.propTypes = propTypes;

/* eslint-disable no-undef */
render(
  <VestiariaApp
    works={works}
    section={section}
    workActive={work}
    // children={body}
    homeGallery={homeGallery}
  />,
  document.getElementById('app')
  /* eslint-enable no-undef */
);
