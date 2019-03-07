
  import React from 'react';
  import Header from './Header';
  import Home from './Home';
  import WorkGrid from './WorkGrid';
  import Work from './Work';
  import About from './About';
  import Contact from './Contact';
  import PropTypes from 'prop-types';
  import {render} from 'react-dom';

  const navLinks = [
    { label: 'Home', key: 'home', href: '/' },
    { label: 'Work', key: 'work', href: '/work' },
    { label: 'About', key: 'about', href: '/about' },
    { label: 'Contact', key: 'contact', href: '/contact' }
  ];

  const propTypes = {
    section : PropTypes.oneOf([
      'home',
      'about',
      'contact',
      'work'
    ]).isRequired,
    works : PropTypes.array,
    homeGallery : PropTypes.array,
    // slug of work route
    workActive : PropTypes.string
  };

  const defaultProps = {
    works : []
  };

  class VestiariaApp extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        // not used right now
        workGalleryOpen : false
      };
      this.toggleGallery = this.toggleGallery.bind(this);
    }

    toggleGallery(){
      this.setState({workGalleryOpen: !this.state.workGalleryOpen});
    }

    render() {
      const {section,works,workActive} = this.props;
      let content;
      // console.log(section);
      if (section==='home')
        content = <Home />;
      else if (section==='about')
        content = <About />;
      else if (section==='contact')
        content = <Contact />;
      else if (section==='work')
        content = <Work slug={workActive} />;
      else
          content = null;

  		return (
  			<div className="app">
          <Header
            links={navLinks}
            active = {section}
            worksActive ={this.state.workGalleryOpen}
            openWorks = {this.toggleGallery}
          />
          <WorkGrid
            display={this.state.workGalleryOpen}
          />
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
      workActive = {work}

      children = {body}
      homeGallery={homeGallery}
    />,
  	document.getElementById('app')
  );
