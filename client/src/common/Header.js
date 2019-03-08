import React from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import * as props from "../VestiariaApp.props";
import { navLinks } from "../VestiariaApp.static";

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
  active: "home"
};

const Header = ({ links, active, toggleWorks }) => {
  return (
    <div className="app__header">
      <ul className="app__header-nav header__menu child vertical">
        {links.map((link, i) => {
          const className = link.key === active ? "active" : "";
          return (
            <li className="app__header-link" key={i + link.label}>
              {link.label === "Work" ? (
                <a
                  data-featherlight="#mylightbox"
                  title="Show reel"
									href="#works"
                  onClick={toggleWorks}
                >
                  work
                </a>
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
