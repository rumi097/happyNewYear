import { useEffect, useRef } from 'react';
import './Fireworks.css';

const Fireworks = ({ trigger, bigCelebration }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const fireworksRef = useRef([]);
  const particlesRef = useRef([]);

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

    class Particle {
      constructor(x, y, color, velocity) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
        this.gravity = 0.05;
        this.friction = 0.98;
        this.size = Math.random() * 3 + 2;
      }

      update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
      }

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    class Firework {
      constructor(x, y, targetX, targetY, isBig = false) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.isBig = isBig;
        this.speed = isBig ? 5 : 3;
        this.angle = Math.atan2(targetY - y, targetX - x);
        this.exploded = false;
        this.trailParticles = [];
        
        // Romantic colors: pink, gold, rose gold, white
        this.colors = [
          '#FFB6C1', // Light pink
          '#FF69B4', // Hot pink
          '#FFD700', // Gold
          '#FFC0CB', // Pink
          '#FFE4E1', // Misty rose
          '#FFFFFF', // White
          '#FF1493', // Deep pink
          '#FFDAB9', // Peach
        ];
      }

      update() {
        if (!this.exploded) {
          const dx = this.targetX - this.x;
          const dy = this.targetY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.speed) {
            this.exploded = true;
            this.createExplosion();
          } else {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;

            // Create trail
            this.trailParticles.push({
              x: this.x,
              y: this.y,
              alpha: 1,
              size: this.isBig ? 3 : 2,
            });

            if (this.trailParticles.length > 10) {
              this.trailParticles.shift();
            }
          }
        }

        // Update trail particles
        this.trailParticles.forEach(p => {
          p.alpha -= 0.05;
        });
        this.trailParticles = this.trailParticles.filter(p => p.alpha > 0);
      }

      createExplosion() {
        const particleCount = this.isBig ? 150 : 80;
        
        for (let i = 0; i < particleCount; i++) {
          const angle = (Math.PI * 2 * i) / particleCount;
          const velocity = {
            x: Math.cos(angle) * (Math.random() * (this.isBig ? 8 : 5) + 2),
            y: Math.sin(angle) * (Math.random() * (this.isBig ? 8 : 5) + 2),
          };
          
          const color = this.colors[Math.floor(Math.random() * this.colors.length)];
          particlesRef.current.push(new Particle(this.x, this.y, color, velocity));
          
          // Add some heart-shaped particles for romantic effect
          if (Math.random() < 0.1) {
            this.createHeartParticle(angle, velocity);
          }
        }
      }

      createHeartParticle(angle, velocity) {
        // Hearts with special color
        const heartColor = '#FF1493';
        particlesRef.current.push(
          new Particle(this.x, this.y, heartColor, {
            x: velocity.x * 1.2,
            y: velocity.y * 1.2,
          })
        );
      }

      draw(ctx) {
        if (!this.exploded) {
          // Draw rocket
          ctx.save();
          ctx.fillStyle = '#FFD700';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#FFD700';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.isBig ? 4 : 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Draw trail
          this.trailParticles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = '#FFC0CB';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
        }
      }
    }

    const createRandomFirework = () => {
      const startX = Math.random() * canvas.width;
      const startY = canvas.height;
      const targetX = Math.random() * canvas.width;
      const targetY = Math.random() * canvas.height * 0.5;
      
      fireworksRef.current.push(new Firework(startX, startY, targetX, targetY));
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw fireworks
      fireworksRef.current.forEach((firework, index) => {
        firework.update();
        firework.draw(ctx);
        
        if (firework.exploded && firework.trailParticles.length === 0) {
          fireworksRef.current.splice(index, 1);
        }
      });

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        particle.update();
        particle.draw(ctx);
        
        if (particle.alpha <= 0) {
          particlesRef.current.splice(index, 1);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Auto-launch fireworks periodically
    const autoLaunchInterval = setInterval(() => {
      if (Math.random() < 0.7) {
        createRandomFirework();
      }
    }, 1000);

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(autoLaunchInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Trigger firework on click
  useEffect(() => {
    if (trigger > 0) {
      const canvas = canvasRef.current;
      const handleClick = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        fireworksRef.current.push(
          new Firework(
            Math.random() * canvas.width,
            canvas.height,
            x,
            y
          )
        );
      };
      
      // Get click position from last event
      canvas.addEventListener('click', handleClick);
      return () => canvas.removeEventListener('click', handleClick);
    }
  }, [trigger]);

  // Big celebration effect
  useEffect(() => {
    if (bigCelebration) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Launch multiple big fireworks
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          const startX = Math.random() * canvas.width;
          const targetX = canvas.width * (0.2 + Math.random() * 0.6);
          const targetY = canvas.height * (0.2 + Math.random() * 0.3);
          
          fireworksRef.current.push(
            new Firework(startX, canvas.height, targetX, targetY, true)
          );
        }, i * 200);
      }
    }
  }, [bigCelebration]);

  return <canvas ref={canvasRef} className="fireworks-canvas" />;
};

export default Fireworks;
