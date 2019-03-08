import React from "react";
import Header from "./common/Header";
import Home from "./Home";
import WorksOverlay from "./common/WorksOverlay";
import Work from "./Work";
import About from "./About";
import * as props from "./VestiariaApp.props";
import Contact from "./Contact";
import PropTypes from "prop-types";
import { render } from "react-dom";

const propTypes = {
  section: props.sections.isRequired,
  works: PropTypes.array,
  homeGallery: PropTypes.array,
  // slug of work route
  workActive: PropTypes.string
};

const defaultProps = {
  works: []
};

class VestiariaApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // not used right now
      workGalleryOpen: false
    };
    this.toggleGallery = this.toggleGallery.bind(this);
  }

  toggleGallery() {
    this.setState({ workGalleryOpen: !this.state.workGalleryOpen });
  }

  render() {
    const { section, works, workActive } = this.props;
    let content;
    // console.log(section);
    if (section === "home") content = <Home />;
    else if (section === "about") content = <About />;
    else if (section === "contact") content = <Contact />;
    else if (section === "work") content = <Work slug={workActive} />;
    else content = null;

    console.log(this.state.workGalleryOpen);
    return (
      <div className="app">
        <Header
          active={section}
          worksActive={this.state.workGalleryOpen}
          toggleWorks={this.toggleGallery}
        />
        <WorksOverlay />
        <div className="app__container" id="app__container">
          {content}
        </div>
      </div>
    );
  }
}

VestiariaApp.defaultProps = defaultProps;
VestiariaApp.propTypes = propTypes;

render(
  <VestiariaApp
    works={works}
    section={section}
    workActive={work}
    children={body}
    homeGallery={homeGallery}
  />,
  document.getElementById("app")
);
