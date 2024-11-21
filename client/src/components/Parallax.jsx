import React, { useEffect, useState } from 'react';

const Parallax = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="w-full h-[400px] bg-cover bg-center bg-no-repeat m-0 p-0"
      style={{
        backgroundImage: `url(/ParralaxBG.jpeg)`,
        backgroundPosition: `center ${scroll * 0.5}px`,
        transition: "background-position 0.1s ease-out",
      }}
    >
    </div>
  );
};

export default Parallax;
