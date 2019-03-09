import React from "react";
import PropTypes from "prop-types";

const propTypes = {
	url: PropTypes.string
};

const defaultProps = {
	url: null
};

class Video extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { url } = this.props;
		let parsedUrl = "";

		if (url.indexOf("vimeo") >= 0) {
			var splitted = url.split("/");
			var id = splitted[splitted.length - 1];
			parsedUrl = `https://player.vimeo.com/video/${id}`;
		} else if (url.indexOf("youtube") >= 0) {
			var splitted = url.split("/watch?v=");
			var id = splitted[splitted.length - 1];
			parsedUrl = `https://www.youtube.com/embed/${id}`;
		}

		return !url ? null : (
			<iframe
    width="100%" height="360" frameBorder="0" allowFullScreen
    src={parsedUrl}
  />
		);
	}
}

Video.defaultProps = defaultProps;
Video.propTypes = propTypes;
export default Video;
