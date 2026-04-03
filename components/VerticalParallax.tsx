"use client"

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    src: "/image_1.jpeg",
    alt: "Photo 1",
    speed: 0.3,
    x: "-10vw",
    zIndex: 1,
    initialY: "0vh",
    width: 480,
    height: 640,
  },
  {
    src: "/image_2.jpeg",
    alt: "Photo 2",
    speed: 0.2,
    x: "-30vw",
    zIndex: 200,
    initialY: "100vh",
    width: 400,
    height: 560,
  },
  {
    src: "/image_3.jpeg",
    alt: "Photo 3",
    speed: 0.7,
    x: "-17vw",
    zIndex: 3,
    initialY: "200vh",
    width: 520,
    height: 680,
  },
  {
    src: "/image_4.jpeg",
    alt: "Photo 4",
    speed: 0.1,
    x: "30vw",
    zIndex: 2,
    initialY: "94vh",
    width: 440,
    height: 600,
  },
  {
    src: "/image_5.jpeg",
    alt: "Photo 5",
    speed: 0.4,
    x: "-30vw",
    zIndex: 300,
    initialY: "380vh",
    width: 360,
    height: 500,
  },
  {
    src: "/image_6.jpeg",
    alt: "Photo 6",
    speed: 0.45,
    x: "10vw",
    zIndex: 3,
    initialY: "150vh",
    width: 480,
    height: 620,
  },
];

const SCROLL_LENGTH = 5;

export default function VerticalParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      SLIDES.forEach((slide, i) => {
        const el = imageRefs.current[i];
        if (!el) return;
        const yMovement = `-${(1 - slide.speed) * 100 * SCROLL_LENGTH}vh`;
        gsap.to(el, {
          y: yMovement,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert()
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: `${SCROLL_LENGTH * 100}vh`, width: "100vw", position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            ref={(el) => {
              if (el) imageRefs.current[i] = el
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) translateX(${slide.x}) translateY(${slide.initialY})`,
              zIndex: slide.zIndex,
              willChange: "transform",
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              width={slide.width}
              height={slide.height}
              style={{
                display: "block",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
