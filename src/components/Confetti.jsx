import { useEffect, useRef } from 'react';
import './Confetti.css';

const Confetti = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const confettiPiecesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    class ConfettiPiece {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5 - 2.5;
        this.opacity = Math.random() * 0.6 + 0.4;
        
        // Romantic colors
        const colors = [
          '#FFB6C1', // Light pink
          '#FFD700', // Gold
          '#FFC0CB', // Pink
          '#FFE4E1', // Misty rose
          '#FFFFFF', // White
          '#FF69B4', // Hot pink
          '#FFDAB9', // Peach
        ];
        
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Shape types: circle, square, heart
        this.shape = Math.random();
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        
        // Slight wave motion
        this.x += Math.sin(this.y * 0.01) * 0.5;
        
        // Wrap around horizontally
        if (this.x < -20) this.x = canvas.width + 20;
        if (this.x > canvas.width + 20) this.x = -20;
        
        // Reset when off screen
        if (this.y > canvas.height + 20) {
          this.y = -20;
          this.x = Math.random() * canvas.width;
        }
      }

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);

        if (this.shape < 0.3) {
          // Heart shape (sparkle)
          this.drawHeart(ctx);
        } else if (this.shape < 0.6) {
          // Circle
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Add sparkle effect
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          // Square/rectangle
          ctx.fillStyle = this.color;
          ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
          
          // Add border
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.lineWidth = 1;
          ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size);
        }

        ctx.restore();
      }

      drawHeart(ctx) {
        const size = this.size * 0.8;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        
        // Heart shape using bezier curves
        const topCurveHeight = size * 0.3;
        ctx.moveTo(0, topCurveHeight);
        
        // Top left curve
        ctx.bezierCurveTo(
          -size / 2, -topCurveHeight,
          -size, topCurveHeight / 2,
          0, size
        );
        
        // Top right curve
        ctx.bezierCurveTo(
          size, topCurveHeight / 2,
          size / 2, -topCurveHeight,
          0, topCurveHeight
        );
        
        ctx.fill();
        
        // Add glow to hearts
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
      }
    }

    class Sparkle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.alpha = Math.random();
        this.fadeSpeed = Math.random() * 0.02 + 0.01;
        this.fadeDirection = Math.random() < 0.5 ? 1 : -1;
      }

      update() {
        this.alpha += this.fadeSpeed * this.fadeDirection;
        
        if (this.alpha <= 0 || this.alpha >= 1) {
          this.fadeDirection *= -1;
        }
      }

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        
        // Draw sparkle as a star
        ctx.fillStyle = '#FFD700';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#FFD700';
        
        // Simple cross shape for sparkle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add cross lines
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x - this.size * 2, this.y);
        ctx.lineTo(this.x + this.size * 2, this.y);
        ctx.moveTo(this.x, this.y - this.size * 2);
        ctx.lineTo(this.x, this.y + this.size * 2);
        ctx.stroke();
        
        ctx.restore();
      }
    }

    // Create initial confetti pieces
    for (let i = 0; i < 50; i++) {
      confettiPiecesRef.current.push(new ConfettiPiece());
    }

    // Create sparkles
    for (let i = 0; i < 30; i++) {
      confettiPiecesRef.current.push(new Sparkle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confettiPiecesRef.current.forEach(piece => {
        piece.update();
        piece.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="confetti-canvas" />;
};

export default Confetti;
