import React from 'react';
import PropTypes from 'prop-types';
import './modal.css';

const propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" title="Close" onClick={handleClose}>
          close
        </button>
      </section>
    </div>
  );
};

Modal.propTypes = propTypes;
export default Modal;
