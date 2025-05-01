document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('space-background');
    const ctx = canvas.getContext('2d');
    
    // Particles array
    let particles = [];
    
    // Set canvas to full screen
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Particle class
    class Particle {
      constructor(type) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.type = type;
        
        // Common properties
        this.size = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.color = '';
        this.rotation = 0;
        this.rotationSpeed = 0;
        
        // Initialize based on type
        if (type === 'star') {
          this.size = Math.random() * 2 + 0.5;
          this.speedX = 0;
          this.speedY = 0;
          this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`;
        } 
        else if (type === 'asteroid') {
          this.size = Math.random() * 6 + 2;
          this.speedX = (Math.random() - 0.5) * 1.5;
          this.speedY = (Math.random() - 0.5) * 1.5;
          this.color = `rgba(${150 + Math.random() * 50}, ${100 + Math.random() * 50}, ${50 + Math.random() * 50}, 0.7)`;
          this.rotation = Math.random() * Math.PI * 2;
          this.rotationSpeed = (Math.random() - 0.5) * 0.05;
          this.vertices = Math.floor(Math.random() * 3) + 5; // 5-7 vertices
          this.radiusVariance = [];
          
          // Create random radius variance for each vertex
          for (let i = 0; i < this.vertices; i++) {
            this.radiusVariance.push(0.7 + Math.random() * 0.3);
          }
        } 
        else if (type === 'comet') {
          this.size = Math.random() * 3 + 1;
          this.speedX = (Math.random() - 0.5) * 4;
          this.speedY = (Math.random() - 0.5) * 4;
          this.color = `rgba(${100 + Math.random() * 155}, ${150 + Math.random() * 105}, ${200 + Math.random() * 55}, 0.8)`;
          this.trail = [];
          this.trailLength = Math.floor(Math.random() * 15) + 10;
        }
      }
      
      update() {
        // Update position
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        
        // Handle wrapping around the screen
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.y < -50) this.y = canvas.height + 50;
        if (this.y > canvas.height + 50) this.y = -50;
        
        // Update trail for comets
        if (this.type === 'comet') {
          this.trail.unshift({ x: this.x, y: this.y });
          if (this.trail.length > this.trailLength) {
            this.trail.pop();
          }
        }
      }
      
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        if (this.type === 'star') {
          // Draw twinkling star
          const twinkle = Math.sin(Date.now() * 0.003 + this.x * 0.01) * 0.3 + 0.7;
          ctx.fillStyle = this.color;
          ctx.globalAlpha = twinkle;
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();
        } 
        else if (this.type === 'asteroid') {
          // Draw rotating asteroid
          ctx.rotate(this.rotation);
          ctx.fillStyle = this.color;
          ctx.beginPath();
          
          // Create irregular shape for asteroid
          ctx.moveTo(this.size * this.radiusVariance[0], 0);
          for (let i = 1; i < this.vertices; i++) {
            const angle = (Math.PI * 2 * i) / this.vertices;
            const radius = this.size * this.radiusVariance[i] || this.size * 0.8;
            ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
          }
          
          ctx.closePath();
          ctx.fill();
          
          // Add some details to asteroid
          ctx.fillStyle = "rgba(50, 50, 50, 0.3)";
          ctx.beginPath();
          ctx.arc(this.size * 0.3, this.size * 0.3, this.size * 0.2, 0, Math.PI * 2);
          ctx.fill();
        } 
        else if (this.type === 'comet') {
          // Draw trail
          if (this.trail.length > 1) {
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.size;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            
            for (let i = 0; i < this.trail.length; i++) {
              const point = this.trail[i];
              const alpha = 1 - i / this.trail.length;
              ctx.globalAlpha = alpha * 0.7;
              ctx.lineTo(point.x - this.x, point.y - this.y);
            }
            
            ctx.stroke();
          }
          
          // Draw comet head
          ctx.globalAlpha = 1;
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      }
    }
    
    // Initialize particles
    function initParticles() {
      particles = [];
      
      // Create stars
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle('star'));
      }
      
      // Create asteroids
      for (let i = 0; i < 15; i++) {
        particles.push(new Particle('asteroid'));
      }
      
      // Create comets
      for (let i = 0; i < 5; i++) {
        particles.push(new Particle('comet'));
      }
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
  });