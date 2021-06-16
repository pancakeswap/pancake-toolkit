import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import observerOptions from "./options";
import Wrapper from "./Wrapper";
import { ImageProps } from "./types";

const StyledImage = styled.img`
  bottom: 0;
  height: auto;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
`;

const Placeholder = styled.div`
  bottom: 0;
  height: auto;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
`;

const Image: React.FC<ImageProps> = ({ responsive, src, alt, width, height, ...props }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver;

    if (imgRef.current) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const { isIntersecting } = entry;
          if (isIntersecting) {
            setIsLoaded(true);
            observer.disconnect();
          }
        });
      }, observerOptions);
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [src]);

  return (
    <Wrapper ref={imgRef} responsive={responsive} $height={height} $width={width} {...props}>
      {isLoaded ? <StyledImage src={src} alt={alt} /> : <Placeholder />}
    </Wrapper>
  );
};

export default Image;
