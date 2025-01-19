import React from 'react'

function FrameClip({src, title}) {
  return (
      <div className="absolute w-full h-full opacity-50 -z-10">
          <iframe
              className="absolute top-0 left-0 w-full h-full iframe"
              src={`https://www.youtube.com/embed/${src}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1`}
              title={title}
              frameborder="0"
              allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen="allowfullscreen"
          ></iframe>
      </div>
  );
}

export default FrameClip