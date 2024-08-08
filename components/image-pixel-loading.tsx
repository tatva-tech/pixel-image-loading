"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import imagesLoaded from 'imagesloaded';

gsap.registerPlugin(ScrollTrigger);

interface PixelImageLoaderProps {
    imageSrc: string;
}

const PixelImageLoader: React.FC<PixelImageLoaderProps> = ({ imageSrc }) => {
    const canvasWrapRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const canvasWrap = canvasWrapRef.current;
        const canvas = canvasRef.current;
        if (!canvasWrap || !canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.src = imageSrc;

        const setCanvasSize = () => {
            const canvasWrap = canvasWrapRef.current;
            const canvas = canvasRef.current;
            if (!canvasWrap || !canvas) return;

            canvas.width = canvasWrap.clientWidth;
            canvas.height = canvasWrap.clientHeight;
        };

        const render = (pxFactor: number) => {
            if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
                ctx.drawImage(
                    img,
                    0, 0, img.naturalWidth, img.naturalHeight,
                    0, 0, canvas.width / pxFactor, canvas.height / pxFactor
                );
                ctx.drawImage(
                    canvas,
                    0, 0, canvas.width / pxFactor, canvas.height / pxFactor,
                    0, 0, canvas.width, canvas.height
                );
            } else {
                console.error('Image not loaded or dimensions are invalid');
            }
        };

        const handleResize = () => {
            setCanvasSize();
            render(100);
        };

        img.onload = () => {
            setCanvasSize();
            render(100); // Initial render with high pixelation

            window.addEventListener('resize', handleResize);

            ScrollTrigger.create({
                trigger: canvasWrap,
                start: 'top+=20% bottom',
                onEnter: () => {
                    const pxFactorValues = [100, 50, 25, 12, 6, 3, 1];
                    pxFactorValues.forEach((pxFactor, i) => {
                        setTimeout(() => {
                            render(pxFactor);
                        }, i * 100);
                    });
                },
                once: true
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: 'top bottom',
                },
            });
        };

        img.onerror = () => {
            console.error('Failed to load image');
        };

        // Check if canvasWrap dimensions are available before setting canvas size
        const checkCanvasWrapLoaded = () => {
            if (canvasWrap) {
                imagesLoaded(canvasWrap, () => {
                    setCanvasSize();
                    render(100);
                });
            }
        };

        checkCanvasWrapLoaded();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [imageSrc]);

    return (
        <div ref={canvasWrapRef} className="canvas-wrap w-full h-full">
            <canvas ref={canvasRef} />
        </div>
    );
};

export default PixelImageLoader;