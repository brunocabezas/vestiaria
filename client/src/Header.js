import React from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';

const propTypes = {
  links : PropTypes.array.isRequired,
  active : PropTypes.string
};

class Header extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    const {links} = this.props;

		return (
			<div className="app__header">
        <ul className="app__header-nav header__menu child vertical">
          {links.map((link,i)=>{
            const className = link.key===this.props.active ? 'active' : "";
            return (
              <li className="app__header-link" key={i+link.label}>
                {link.label==="Work" ?
                  <a data-featherlight="#mylightbox" href="#">work</a> :
                  <a className={className} title={link.label} href={link.href}>{link.label}</a>
                }
              </li>
            );
          })}
        </ul>
      </div>
		);
  }
}

Header.propTypes = propTypes;
export default Header;
