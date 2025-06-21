import video from "../video/Vidéo présentation du Clinique Le Grand Tanger.mp4";

const VideoBackground = () => {
  return (
    <div className="video-background">
      <video autoPlay muted loop playsInline id="bg-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;