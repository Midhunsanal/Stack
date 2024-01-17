import React, { useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Hammer from 'hammerjs';
//import './CustomVideoPlayer.css';

const CustomVideoPlayer = ({ videoSource }) => {
  const playerRef = useRef(null);
  const wrapperRef = useRef(null);
  const hammerManagerRef = useRef(null);

  useEffect(() => {
    const player = playerRef.current;

    if (player) {
      // Initialize Hammer.js for touch gestures on the wrapper
      const hammerManager = new Hammer(wrapperRef.current);
      hammerManager.on('doubletap', handleDoubleTap);
      hammerManager.on('press', handlePress);
      hammerManagerRef.current = hammerManager;

      // Cleanup when the component unmounts
      return () => {
        hammerManager.off('doubletap');
        hammerManager.off('press');
      };
    }
  }, []);

  const handleDoubleTap = (event) => {
    const player = playerRef.current;
    if (player) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const tapX = event.center.x - rect.left;
      const playerCenterX = rect.width / 2;

      if (tapX < playerCenterX) {
        player.seekTo(player.getCurrentTime() - 5);
      } else {
        player.seekTo(player.getCurrentTime() + 10);
      }
    }
  };

  const handlePress = (event) => {
    const player = playerRef.current;
    if (player) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const pressX = event.center.x - rect.left;
      const playerCenterX = rect.width / 2;

      if (pressX < playerCenterX) {
        const backwardInterval = setInterval(() => {
          player.seekTo(player.getCurrentTime() - 1, 'seconds');
        }, 1000);

        hammerManagerRef.current.on('pressup', () => {
          clearInterval(backwardInterval);
        });
      } else {
        const forwardInterval = setInterval(() => {
          player.seekTo(player.getCurrentTime() + 2, 'seconds');
        }, 500);

        hammerManagerRef.current.on('pressup', () => {
          clearInterval(forwardInterval);
        });
      }
    }
  };

  return (
    <div className="video-container" ref={wrapperRef}>
      <ReactPlayer
        ref={playerRef}
        url={videoSource}
        className="react-player"
        width="100%"
        height="100%"
        controls={true}  // Enable controls to show play/pause button
        playing={false}
      />
    </div>
  );
};

export default CustomVideoPlayer;