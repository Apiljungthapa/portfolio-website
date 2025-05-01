document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('cosmic-nebula');
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas to full screen
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create cosmic dust particles
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5,
        speed: Math.random() * 0.2 + 0.1
      });
    }
    
    // Create nebula effect
    function createNebula() {
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      
      gradient.addColorStop(0, "rgba(75, 0, 130, 0.2)");
      gradient.addColorStop(0.5, "rgba(138, 43, 226, 0.1)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      createNebula();
      
      // Draw and update cosmic dust
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
        
        // Move particles
        particle.y += particle.speed;
        if (particle.y > canvas.height) {
          particle.y = 0;
          particle.x = Math.random() * canvas.width;
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
      cancelAnimationFrame(animationFrameId);
    });
  });