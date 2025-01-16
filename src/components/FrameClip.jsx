import React from 'react'

function FrameClip({src, title}) {
  return (
      <div className="absolute w-full h-full bg-[#00000090]">
          <iframe
              className="absolute top-0 left-0 w-full h-full -z-10 iframe"
              src={src}
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