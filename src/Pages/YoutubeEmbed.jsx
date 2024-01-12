import React from "react";
import "../styles/YoutubeEmbed.css";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId }) => (
    <div className="youtube_embed-container">
        <h1 className="youtube-embed-heading">SF 23 Aftermovie</h1>
        <div className="youtube-embed-video">
            <iframe
                height="850"
                width="480"
                src={`https://www.youtube.com/embed/${embedId}`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                title="SF 23 Aftermovie"
            ></iframe>
        </div>
    </div>
);

YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;