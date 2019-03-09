import React from 'react';
import PropTypes from 'prop-types';
import './modal.styl';

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
      <section className="modal__main">
        {children}
        <button
          type="button"
          title="Close"
          className="close"
          onClick={handleClose}
        />
      </section>
    </div>
  );
};

Modal.propTypes = propTypes;
export default Modal;
