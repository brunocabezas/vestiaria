import React from 'react';
import PropTypes from 'prop-types';
import * as props from '../VestiariaApp.props';
import { navLinks } from '../VestiariaApp.static';

const propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      key: PropTypes.string,
      href: PropTypes.string
    }).isRequired
  ),
  active: props.sections,
  toggleWorks: PropTypes.func.isRequired
};

const defaultProps = {
  links: navLinks,
  active: 'home'
};

const Header = ({ links, active, toggleWorks }) => {
  return (
    <div className="app__header">
      <ul className="app__header-nav header__menu child vertical">
        {links.map(link => {
          const className = link.key === active ? 'active' : '';
          return (
            <li className="app__header-link" key={link.label}>
              {link.label === 'Work' ? (
                <button type="button" title="Show reel" onClick={toggleWorks}>
                  work
                </button>
              ) : (
                <a className={className} title={link.label} href={link.href}>
                  {link.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
export default Header;
