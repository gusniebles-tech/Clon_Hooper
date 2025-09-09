'use client';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const slides = [
    {
        alt: 'Slide 1',
        defaultSrc: 'https://seo-cdn.hopper.com/bf5a5951-68c0-4596-8064-3b1c25e582aa.webp',
        sources: [
            {
                media: '(min-width: 992px)',
                srcSet:
                    'https://seo-cdn.hopper.com/0fb60d63-c2a7-43cf-a5c4-34748a07d805.webp 1x, https://seo-cdn.hopper.com/14432235-12d9-4fb3-bf36-ec4eb7f1cb15.webp 2x',
            },
            {
                media: '(min-width: 744px)',
                srcSet:
                    'https://seo-cdn.hopper.com/b1ed0cd2-19c3-4383-96cd-6e668fd5df84.webp 1x, https://seo-cdn.hopper.com/1d763470-41df-4c52-a6e7-49c1a17e68ed.webp 2x',
            },
            {
                media: '(min-width: 430px)',
                srcSet:
                    'https://seo-cdn.hopper.com/abb89ba1-c1b3-4167-bfcc-23305b5af5e6.webp 1x, https://seo-cdn.hopper.com/adea4f41-3ad9-4d99-a5f8-94c95fc29cc2.webp 2x',
            },  
        ],
    },
    {
        alt: 'Slide 2',
        defaultSrc: 'https://seo-cdn.hopper.com/b69d8783-671f-41d5-b0d8-a325034bd953.webp',
        sources: [
            {
                media: '(min-width: 992px)',
                srcSet:
                    'https://seo-cdn.hopper.com/e4926101-badb-4efd-bf6f-bc879752249f.webp 1x, https://seo-cdn.hopper.com/e9dc06fd-f824-4b8d-b5c1-8338f6d8f075.webp 2x',
            },
            {
                media: '(min-width: 744px)',
                srcSet:
                    'https://seo-cdn.hopper.com/2cdf15ed-60da-4b14-822b-8495bdafea96.webp 1x, https://seo-cdn.hopper.com/06962a26-776a-4711-8d9f-45b0b3eb6556.webp 2x',
            },
            {
                media: '(min-width: 430px)',
                srcSet:
                    'https://seo-cdn.hopper.com/3eeaa3b8-e07f-4b85-a0c6-5002acdd77c9.webp 1x, https://seo-cdn.hopper.com/b91aafc0-5521-4693-a630-424cecf39770.webp 2x',
            },
        ],
    },
    {
        alt: 'Slide 3',
        defaultSrc: 'https://seo-cdn.hopper.com/f5c0dc74-9949-46e8-bf5f-ec980e0731ab.webp',
        sources: [
            {
                media: '(min-width: 992px)',
                srcSet:
                    'https://seo-cdn.hopper.com/979d6922-9611-4250-88a6-8adca043aa7a.webp 1x, https://seo-cdn.hopper.com/3786960a-144d-474b-a7eb-10a3a75c34a1.webp 2x',
            },
            {
                media: '(min-width: 744px)',
                srcSet:
                    'https://seo-cdn.hopper.com/d99aa5b4-a780-4b16-a5ab-c5da9451d57c.webp 1x, https://seo-cdn.hopper.com/282cb858-93a7-4fc5-b5e7-090f79e49015.webp 2x',
            },
            {
                media: '(min-width: 430px)',
                srcSet:
                    'https://seo-cdn.hopper.com/dae75a30-3063-4795-b057-a82b9e36fa30.webp 1x, https://seo-cdn.hopper.com/fb57c3b8-0d98-458c-bb80-6d8d92aa614b.webp 2x',
            },
        ],
    },
    {
        alt: 'Slide 4',
        defaultSrc: 'https://seo-cdn.hopper.com/67b024b8-249c-49fe-bb77-605e1c6ceba2.webp',
        sources: [
            {
                media: '(min-width: 992px)',
                srcSet:
                    'https://seo-cdn.hopper.com/bae36c7c-eb75-4da3-9b14-25e684bd3160.webp 1x, https://seo-cdn.hopper.com/ab1e4cbb-24dd-40d4-b0c9-7602dc26fef0.webp 2x',
            },
            {
                media: '(min-width: 744px)',
                srcSet:
                    'https://seo-cdn.hopper.com/76294d32-05f6-43ec-9a4b-899c01187af6.webp 1x, https://seo-cdn.hopper.com/c9a257e4-f2b7-452e-86bb-d9c8301a6019.webp 2x',
            },
            {
                media: '(min-width: 430px)',
                srcSet:
                    'https://seo-cdn.hopper.com/cb7fd80f-3d31-4231-b32d-064e17f7d6c4.webp 1x, https://seo-cdn.hopper.com/771d5140-eae0-44c3-893c-699a6598359a.webp 2x',
            },
        ],
    },
];

export default function Carrusel() {
  return (
    <div className="absolute w-full flex items-center justify-center p-4 -z-1">
      <div className="w-full h-[600px] rounded-[3rem] overflow-hidden">
        <Carousel
          autoPlay
          infiniteLoop
          interval={5000}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          showIndicators={false}
          stopOnHover={false}
          swipeable={false}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full h-full">
              <picture>
                {slide.sources.map((source, i) => (
                  <source key={i} media={source.media} srcSet={source.srcSet} />
                ))}
                <img
                  src={slide.defaultSrc}
                  alt={slide.alt}
                  className="w-full h-[600px] object-cover"
                  decoding="async"
                  sizes="100vw"
                />
              </picture>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}