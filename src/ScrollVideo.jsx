import React, { useEffect, useRef, useState } from 'react';

const ScrollVideo = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef([]);

  const frameCount = 118;

  // Preload images for buttery smooth scrubbing
  useEffect(() => {
    let loadedCount = 0;
    const images = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, '0');
      img.src = `/dna-video/${frameNum}_f10_q05.jpg`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImagesLoaded(true);
        }
      };
      
      images.push(img);
    }
    
    imagesRef.current = images;
  }, []);

  // Handle scroll and smooth interpolation
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const images = imagesRef.current;

    // Set canvas dimensions
    canvas.width = images[0].width || 1920;
    canvas.height = images[0].height || 1080;

    let currentFrame = 0;
    let targetFrame = 0;
    let animationFrameId;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const maxScroll = container.scrollHeight - window.innerHeight;
      
      let scrollProgress = -rect.top / maxScroll;
      scrollProgress = Math.max(0, Math.min(1, scrollProgress));

      targetFrame = scrollProgress * (frameCount - 1);
    };

    const renderLoop = () => {
      // Linear Interpolation (LERP) for buttery smooth transition
      currentFrame += (targetFrame - currentFrame) * 0.08;
      
      const frameIndex = Math.max(0, Math.min(frameCount - 1, Math.round(currentFrame)));

      if (images[frameIndex]) {
        context.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call
    handleScroll();
    renderLoop();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [imagesLoaded]);

  return (
    <div ref={containerRef} className="scroll-video-container">
      <div className="sticky-canvas-wrapper">
        {!imagesLoaded && (
          <div className="loading-overlay">
            <div className="loader">Loading DNA Sequence...</div>
          </div>
        )}
        <canvas ref={canvasRef} className="video-canvas" />
        <div className="overlay-content" style={{ pointerEvents: 'auto' }}>
          <h1>DNA Data Storage</h1>
          <p className="subtitle">Scroll to synthesize. The future of biological memory.</p>
          <a href="/lab.html" target="_blank" style={{ display: 'inline-block', marginTop: '20px', padding: '12px 24px', background: 'rgba(0, 240, 255, 0.1)', color: '#00F0FF', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', border: '1px solid #00F0FF', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease', cursor: 'pointer' }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(0, 240, 255, 0.3)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.3)'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)'; e.currentTarget.style.boxShadow = 'none'; }}>
            Enter Advanced 3D Lab
          </a>
        </div>
      </div>
    </div>
  );
};

export default ScrollVideo;
