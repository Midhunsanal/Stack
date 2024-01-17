import React from 'react';
import CustomVideoPlayer from './Video'; // Update the import path
import Video from '../../assets/video.mp4'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';

const VideoPlayer = () => {
  // Provide the local video file path



  return (
    <div className='home-container-1'>
    <LeftSidebar />
    <div className="home-container-2">
      <h1>Custom Video Player</h1>
      

      <CustomVideoPlayer videoSource={Video} />
    </div>
    </div>
  );
};
export default VideoPlayer