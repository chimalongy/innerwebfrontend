import React, { useEffect, useRef } from 'react';
import '../styles/videomodal.css'; // Ensure the correct CSS file path


const VideoModal = ({ show, onClose, videoSrc }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (show && videoRef.current) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className={`modal ${show ? 'modal-show' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <video ref={videoRef} width="100%" controls>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};


export default VideoModal;
