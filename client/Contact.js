import React from 'react';

class Contact extends React.Component{
  render() {
  	return (
  		<div className="app__contact">
        <div>
          <a className="mail" href="mailto:vestiaria@gmail.com">
            vestiaria@gmail.com
          </a>
        </div>
        <span className="dash">-</span>
        <div>
          <a className="instagram" target="_blank" href="https://www.instagram.com/cluda.roblins">instagram</a>
        </div>
        <span className="dash">-</span>
      </div>
  	);
  };
}

export default Contact;
