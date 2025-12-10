import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import "./VideoGallery.css"; // Use updated CSS below

const VideoGallery = () => {
  const location = useLocation();
  const paperData = location.state?.paperData || [];

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  if (paperData.length === 0) {
    return <h2>No video data available.</h2>;
  }

  const currentSection = paperData[currentSectionIndex];
  const currentVideo = currentSection?.videos[currentVideoIndex];

  if (!currentSection || !currentVideo) {
    return <h2>Invalid data format</h2>;
  }

  const handleVideoClick = (index) => {
    setIsLoading(true);
    setCurrentVideoIndex(index);
    setTimeout(() => setIsLoading(false), 900); // fake loading
  };

  const goToNextSection = () => {
    setCurrentSectionIndex((prevIndex) => (prevIndex + 1) % paperData.length);
    setCurrentVideoIndex(0);
  };

  const goToPreviousSection = () => {
    setCurrentSectionIndex((prevIndex) =>
      prevIndex === 0 ? paperData.length - 1 : prevIndex - 1
    );
    setCurrentVideoIndex(0);
  };

  const extractYouTubeID = (url) => {
    const regex = /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([^\s?&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="video-gallery-container">
      {/* Main Video Player */}
      <div className="video-player-container">
        <div className="video-player-container-top">
          <h2 className="video-main-title">{currentSection.topic}</h2>
          {/* <h4 className="video-title">{currentVideo.title}</h4> */}
        </div>

        <div className="video-frame-holder">
          {isLoading && <div className="video-loading-overlay">Loading...</div>}
          <iframe
            width="100%"
            height="100%"
            src={currentVideo.url}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Video Player"
            style={{ borderRadius: 14 }}
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </div>
        <div className="video-action-buttons">
  <h4 className="video-title">{currentVideo.title}</h4>
  <button>👍 Like</button>
  <button>👎 Dislike</button>
  <button>💬 Comment</button>
  <button>📄 Download PDF</button>
</div>

      </div>

      {/* Playlist and Navigation */}
      <div className="vid">
        <div className="video-list-container">
          <h5 className="playlist-title">Playlist</h5>
          <div className="video-list">
            {currentSection.videos.map((video, index) => (
              <motion.div
                key={video.id}
                className={`video-card ${index === currentVideoIndex ? "active-video" : ""}`}
                onClick={() => handleVideoClick(index)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={`https://img.youtube.com/vi/${extractYouTubeID(video.url)}/hqdefault.jpg`}
                  alt={video.title}
                  className="thumbnail"
                />
                <p className="video-title">{video.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Navigation Buttons */}
        <div className="video-actions">
          <button onClick={goToPreviousSection}>⏮ Prev Chapter</button>
          <button onClick={goToNextSection}>Next Chapter ⏭</button>
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
