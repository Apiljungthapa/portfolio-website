document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Mobile menu toggle (if needed)
    const mobileMenuToggle = () => {
      const nav = document.querySelector('nav');
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        nav.style.display = 'none';
      } else {
        nav.style.display = 'flex';
      }
    };
    
    // Call once on load
    mobileMenuToggle();
    
    // Update on resize
    window.addEventListener('resize', mobileMenuToggle);
    
    // Add parallax effect to tech icons
    const techIcons = document.querySelectorAll('.tech-icon');
    
    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      
      techIcons.forEach(icon => {
        const depth = parseFloat(icon.getAttribute('data-depth') || 0.1);
        const moveX = mouseX * depth * 20;
        const moveY = mouseY * depth * 20;
        
        icon.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
      });
    });
    
    // Add random data-depth attributes to tech icons for parallax effect
    techIcons.forEach(icon => {
      icon.setAttribute('data-depth', (Math.random() * 0.2 + 0.05).toFixed(2));
    });
    
    // Add intersection observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
      section.classList.add('fade-element');
      observer.observe(section);
    });
    
    // Observe project cards for animation
    document.querySelectorAll('.project-card').forEach(card => {
      card.classList.add('fade-element');
      observer.observe(card);
    });
    
    // Add fade-in animation styles dynamically
    const style = document.createElement('style');
    style.textContent = `
      .fade-element {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }
      
      .fade-in {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  });