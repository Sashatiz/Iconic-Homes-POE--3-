// Wait for DOM ready
document.addEventListener('DOMContentLoaded', function () {

  // -----------------------
  // Hero heading change
  // -----------------------
  const heroHeading = document.querySelector(".hero-content h2");
  if (heroHeading) {
    heroHeading.textContent = "Welcome to Iconic Homes — Interior Design Studio";
  }

  // -----------------------
  // Portfolio card hover highlight (additional)
  // -----------------------
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.backgroundColor = "#fbf6ec";
    });
    card.addEventListener("mouseleave", () => {
      card.style.backgroundColor = "transparent";
    });
  });

  // -----------------------
  // Services link alert
  // -----------------------
  const servicesLink = document.getElementById("servicesLink");
  if (servicesLink) {
    servicesLink.addEventListener("click", function (e) {
      
      servicesLink.style.opacity = "0.6";
      setTimeout(() => { servicesLink.style.opacity = ""; }, 300);
    });
  }

  // -----------------------
  // Lightbox gallery
  // -----------------------
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeLightbox = document.getElementById("closeLightbox");
  document.querySelectorAll(".gallery-img").forEach(img => {
    img.addEventListener("click", () => {
      if (!lightbox) return;
      lightbox.style.display = "flex";
      lightbox.setAttribute('aria-hidden', 'false');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || 'Gallery image';
    });
  });
  if (closeLightbox) {
    closeLightbox.addEventListener("click", () => {
      lightbox.style.display = "none";
      lightbox.setAttribute('aria-hidden', 'true');
    });
  }
  // Close lightbox on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.style.display === 'flex') {
      lightbox.style.display = 'none';
      lightbox.setAttribute('aria-hidden', 'true');
    }
  });

  // -----------------------
  // Accordion
  // -----------------------
  document.querySelectorAll(".accordion-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      if (!content) return;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });

  // -----------------------
  // Leaflet map (contact page)
  // -----------------------
  if (document.getElementById("map") && typeof L !== 'undefined') {
    try {
      const map = L.map("map").setView([-26.2041, 28.0473], 10); // Johannesburg
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);
      L.marker([-26.2041, 28.0473]).addTo(map).bindPopup("Iconic Homes — Johannesburg office");
    } catch (err) {
      console.warn('Map init failed', err);
    }
  }

  // -----------------------
  // Dynamic project loading
  // -----------------------
  const sampleProjects = [
    "Urban Loft Kitchen",
    "Minimalist Lounge",
    "Luxury Coastal Bedroom",
    "Small Space Makeover"
  ];
  const projectList = document.getElementById("projectList");
  if (projectList) {
    sampleProjects.forEach(p => {
      const el = document.createElement("p");
      el.textContent = "• " + p;
      projectList.appendChild(el);
    });
  }

  // -----------------------
  // Search filter for services
  // -----------------------
  const searchBox = document.getElementById("searchBox");
  if (searchBox) {
    searchBox.addEventListener("keyup", () => {
      const q = searchBox.value.trim().toLowerCase();
      document.querySelectorAll("#serviceList li").forEach(li => {
        li.style.display = li.textContent.toLowerCase().includes(q) ? "" : "none";
      });
    });
  }

  // -----------------------
  // Enquiry form validation + cost estimate
  // -----------------------
  const enquiryForm = document.getElementById("enquiryForm");
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = (document.getElementById("name") || {}).value || '';
      const email = (document.getElementById("email") || {}).value || '';
      const message = (document.getElementById("message") || {}).value || '';
      const projectType = (document.getElementById("projectType") || {}).value || '';

      // simple validation
      if (!name.trim() || !email.trim() || !message.trim() || !projectType.trim()) {
        alert('Please fill in all required fields.');
        return;
      }
      // simple email check
      if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        return;
      }

      // estimate calculation
      const resultEl = document.getElementById('estimateResult');
      let cost = 0;
      switch (projectType.toLowerCase()) {
        case 'full interior design': cost = 15000; break;
        case 'room refresh': cost = 5000; break;
        case 'showhome staging': cost = 8000; break;
        default: cost = 0;
      }
      if (resultEl) {
        resultEl.textContent = `Estimated Project Cost: R${cost.toLocaleString()}`;
      }
      // optionally clear or keep form
      //enquiryForm.reset();
      // show friendly confirmation
      setTimeout(() => { alert('Thank you — your enquiry has been received. Check the estimate shown on the page.'); }, 100);
    });
  }

  // -----------------------
  // Contact form validation + email preview
  // -----------------------
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const cname = (document.getElementById("cname") || {}).value || '';
      const cemail = (document.getElementById("cemail") || {}).value || '';
      const cmsg = (document.getElementById("cmessage") || {}).value || '';
      if (!cname.trim() || !cemail.trim() || !cmsg.trim()) {
        alert('Please fill in all required fields.');
        return;
      }
      if (!cemail.includes('@') || !cemail.includes('.')) {
        alert('Please enter a valid email address.');
        return;
      }

      // create mailto preview (won't actually send server-side)
      const mailto = `mailto:hello@iconichomes.example?subject=${encodeURIComponent('Website contact from ' + cname)}&body=${encodeURIComponent('Name: ' + cname + '\nEmail: ' + cemail + '\n\nMessage:\n' + cmsg)}`;
      // show preview to user
      const preview = `Email preview:\nTo: hello@iconichomes.example\nFrom: ${cname} <${cemail}>\n\n${cmsg}\n\n(Click OK to open your email app to send the message.)`;
      if (confirm(preview)) {
        // open default mail client
        window.location.href = mailto;
      }
    });
  }

});

