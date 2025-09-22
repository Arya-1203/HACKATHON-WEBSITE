// DOM Elements
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navLinks = document.querySelectorAll(".nav__link");
const header = document.getElementById("header");
const scrollTopBtn = document.getElementById("scroll-top");
const sections = document.querySelectorAll(".section");

// Navigation Menu Toggle
navToggle?.addEventListener("click", () => {
  navMenu.classList.add("show");
});

navClose?.addEventListener("click", () => {
  navMenu.classList.remove("show");
});

// Close menu when clicking on nav links (mobile)
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY >= 50) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
});

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Active section highlighting
function updateActiveSection() {
  const scrollY = window.pageYOffset;
  const headerHeight = header.offsetHeight;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - headerHeight - 100;
    const sectionId = section.getAttribute("id");
    const correspondingLink = document.querySelector(
      `.nav__link[href="#${sectionId}"]`
    );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"));
      correspondingLink?.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveSection);

// Scroll to top button
window.addEventListener("scroll", () => {
  if (window.scrollY >= 560) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Countdown Timer
function initCountdown() {
  const countdownElement = document.getElementById("countdown-display");
  if (!countdownElement) return;

  // Target date: October 4, 2025, 11:59 PM IST
  const targetDate = new Date("2025-10-04T23:59:00+05:30").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      countdownElement.innerHTML = "Registration Closed";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  // Update immediately and then every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Theme card interactions
const themeCards = document.querySelectorAll(".theme-card");
// const themeDetails = {
//   "ai-ml": {
//     title: "AI & Machine Learning",
//     description:
//       "Dive deep into artificial intelligence and machine learning. Build intelligent applications that can learn, adapt, and solve complex problems.",
//     technologies: [
//       "TensorFlow",
//       "PyTorch",
//       "Scikit-learn",
//       "OpenCV",
//       "Natural Language Processing",
//       "Computer Vision",
//     ],
//     projects: [
//       "Image Recognition Systems",
//       "Chatbots & Virtual Assistants",
//       "Recommendation Engines",
//       "Predictive Analytics",
//     ],
//   },
//   "web-dev": {
//     title: "Web Development",
//     description:
//       "Create modern, responsive web applications using cutting-edge frameworks and technologies.",
//     technologies: [
//       "React",
//       "Vue.js",
//       "Angular",
//       "Node.js",
//       "Express",
//       "MongoDB",
//       "PostgreSQL",
//     ],
//     projects: [
//       "E-commerce Platforms",
//       "Social Media Apps",
//       "Dashboard Applications",
//       "Progressive Web Apps",
//     ],
//   },
//   edtech: {
//     title: "EdTech",
//     description:
//       "Build innovative educational technology solutions for interactive, adaptive, and accessible digital learning.",
//     technologies: [
//       "Learning Management Systems",
//       "AR/VR",
//       "Adaptive Learning AI",
//       "Video Streaming",
//       "Mobile Learning",
//     ],
//     projects: [
//       "Virtual Classrooms",
//       "Adaptive Learning Platforms",
//       "Educational Games",
//       "Skill Assessment Tools",
//     ],
//   },
//   blockchain: {
//     title: "Blockchain & Web3",
//     description:
//       "Explore decentralized technologies and build the future of web applications with blockchain.",
//     technologies: [
//       "Solidity",
//       "Ethereum",
//       "Web3.js",
//       "Smart Contracts",
//       "IPFS",
//       "MetaMask",
//     ],
//     projects: [
//       "DeFi Applications",
//       "NFT Marketplaces",
//       "Cryptocurrency Wallets",
//       "Decentralized Exchanges",
//     ],
//   },
//   open: {
//     title: "Open Innovation",
//     description:
//       "Let your creativity run wild! Build anything that showcases innovation and solves real-world problems.",
//     technologies: [
//       "Any Technology Stack",
//       "Creative Solutions",
//       "Cross-Platform",
//       "Emerging Technologies",
//     ],
//     projects: [
//       "Creative Solutions",
//       "Problem-Solving Apps",
//       "Innovative Concepts",
//       "Experimental Projects",
//     ],
//   },
//   healthtech: {
//     title: "HealthTech",
//     description:
//       "Innovate in healthcare technology to improve patient care and medical processes through digital solutions.",
//     technologies: [
//       "Medical APIs",
//       "Health Data Standards",
//       "Telemedicine",
//       "ML for Healthcare",
//       "Mobile Health",
//     ],
//     projects: [
//       "Patient Management Systems",
//       "Health Monitoring Apps",
//       "Telemedicine Platforms",
//       "Medical AI Diagnostics",
//     ],
//   },
// };

themeCards.forEach((card) => {
  card.addEventListener("click", () => {
    const themeKey = card.getAttribute("data-theme");
    const theme = themeDetails[themeKey];

    if (theme) {
      showThemeDetails(theme);
    }
  });

  // Add hover effect
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-5px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

function showThemeDetails(theme) {
  createModal(`
        <div class="theme-modal">
            <h3>${theme.title}</h3>
            <p>${theme.description}</p>
            <div class="theme-modal__section">
                <h4>Recommended Technologies:</h4>
                <div class="tech-tags">
                    ${theme.technologies
                      .map((tech) => `<span class="tech-tag">${tech}</span>`)
                      .join("")}
                </div>
            </div>
            <div class="theme-modal__section">
                <h4>Potential Project Ideas:</h4>
                <ul class="project-list">
                    ${theme.projects
                      .map((project) => `<li>${project}</li>`)
                      .join("")}
                </ul>
            </div>
        </div>
    `);
}

// Sponsor card interactions
const sponsorCards = document.querySelectorAll(".sponsor-card");

// sponsorCards.forEach((card) => {
//   card.addEventListener("click", () => {
//     const url = card.getAttribute("data-url");
//     if (url && url !== "#") {
//       // For now, show information about placeholder URLs
//       showAlert(
//         "Sponsor Information",
//         `
//                 <div class="sponsor-modal">
//                     <i class="fas fa-handshake"></i>
//                     <h4>Sponsor Partnership</h4>
//                     <p>We're excited to announce our partnerships with amazing sponsors!</p>
//                     <div class="sponsor-info">
//                         <p><strong>Placeholder URL:</strong> ${url}</p>
//                         <p>This sponsor card will redirect to the actual sponsor website once the URLs are configured.</p>
//                         <p>Stay tuned for updates about our official sponsors and their contributions to The TechClasher!</p>
//                     </div>
//                 </div>
//             `
//       );
//     }
//   });
// });

// Community Partners interactions
const partnerCards = document.querySelectorAll(".partner-card");

partnerCards.forEach((card) => {
  card.addEventListener("click", () => {
    const url = card.getAttribute("data-url");
    const partnerName = card.querySelector("h4").textContent;

    if (url && url !== "#") {
      showAlert(
        `Community Partner - ${partnerName}`,
        `
                <div class="partner-modal">
                    <i class="fas fa-users"></i>
                    <h4>${partnerName}</h4>
                    <p>We're proud to partner with amazing communities that support innovation and technology.</p>
                    <div class="partner-info">
                        <p><strong>Partnership URL:</strong> ${url}</p>
                        <p>This partner card will redirect to the actual community website once the URLs are configured.</p>
                        <p>Our community partners provide valuable resources, networking opportunities, and support for participants.</p>
                    </div>
                </div>
            `
      );
    }
  });
});

// Organizer card interactions
const organizerCards = document.querySelectorAll(".organizer-card");
const organizerDetails = {
  // director: {
  //   name: "Dr. [Director Name]",
  //   role: "Director",
  //   institute: "Greater Noida Institute of Technology",
  //   description:
  //     "Leading GNIOT with a vision for technological excellence and innovation in education. With extensive experience in academic leadership and technology integration, the Director has been instrumental in establishing GNIOT as a premier institution for technical education.",
  //   achievements: [
  //     "Led digital transformation initiatives at GNIOT",
  //     "Established industry partnerships for student placements",
  //     "Published research in educational technology",
  //     "Mentor to numerous successful tech entrepreneurs",
  //   ],
  //   expertise: [
  //     "Educational Leadership",
  //     "Technology Integration",
  //     "Strategic Planning",
  //     "Industry Relations",
  //   ],
  // },
  // hod: {
  //   name: "Dr. [HOD Name]",
  //   role: "Head of Department",
  //   institute: "CSE - AI/AI-DS Department",
  //   description:
  //     "Guiding the department towards cutting-edge research in Artificial Intelligence and Data Science. With a Ph.D. in Computer Science and years of industry experience, they are shaping the next generation of AI professionals.",
  //   achievements: [
  //     "Established AI/DS curriculum aligned with industry needs",
  //     "Led research projects in machine learning and data science",
  //     "Mentored students in competitive programming",
  //     "Organized numerous technical workshops and seminars",
  //   ],
  //   expertise: [
  //     "Artificial Intelligence",
  //     "Data Science",
  //     "Machine Learning",
  //     "Research Methodology",
  //   ],
  // },
  // coordinator: {
  //   name: "[Coordinator Name]",
  //   role: "Event Coordinator",
  //   institute: "MANAN Club",
  //   description:
  //     "Coordinating all aspects of The TechClasher to ensure a seamless and memorable experience. As an experienced event organizer and tech enthusiast, they bring together technical excellence with exceptional organizational skills.",
  //   achievements: [
  //     "Successfully organized multiple hackathons and tech events",
  //     "Coordinated with industry partners and sponsors",
  //     "Managed participant registration and logistics",
  //     "Ensured smooth execution of technical competitions",
  //   ],
  //   expertise: [
  //     "Event Management",
  //     "Team Leadership",
  //     "Stakeholder Coordination",
  //     "Project Planning",
  //   ],
  // },
  // organizer: {
  //   name: "[Organizer Name]",
  //   role: "Organizer",
  //   institute: "MANAN Club",
  //   description:
  //     "Passionate about bringing together tech enthusiasts and fostering innovation through hackathons. With a strong background in software development and community building, they are dedicated to creating impactful tech events.",
  //   achievements: [
  //     "Active member of MANAN Club for 3+ years",
  //     "Organized workshops on emerging technologies",
  //     "Mentored junior students in programming",
  //     "Contributed to open-source projects",
  //   ],
  //   expertise: [
  //     "Software Development",
  //     "Community Building",
  //     "Technical Mentoring",
  //     "Innovation Management",
  //   ],
  // },
  // "co-organizer": {
  //   name: "[Co-Organizer Name]",
  //   role: "Co-Organizer",
  //   institute: "MANAN Club",
  //   description:
  //     "Supporting the organization with dedication to create an inspiring environment for participants. Known for attention to detail and collaborative spirit, they ensure every aspect of the event runs smoothly.",
  //   achievements: [
  //     "Coordinated participant support and assistance",
  //     "Managed technical infrastructure for events",
  //     "Organized networking sessions and team-building activities",
  //     "Maintained event documentation and resources",
  //   ],
  //   expertise: [
  //     "Operations Management",
  //     "Technical Support",
  //     "Team Collaboration",
  //     "Event Documentation",
  //   ],
  // },
};

organizerCards.forEach((card) => {
  card.addEventListener("click", () => {
    const organizerKey = card.getAttribute("data-organizer");
    const organizer = organizerDetails[organizerKey];

    if (organizer) {
      showOrganizerDetails(organizer);
    }
  });
});

function showOrganizerDetails(organizer) {
  createModal(`
        <div class="organizer-modal">
            <i class="fas fa-user-tie"></i>
            <h3>${organizer.name}</h3>
            <p class="organizer-role">${organizer.role}</p>
            <p class="organizer-institute">${organizer.institute}</p>
            <div class="organizer-description">
                <p>${organizer.description}</p>
            </div>
            <div class="organizer-achievements">
                <h4>Key Achievements:</h4>
                <ul>
                    ${organizer.achievements
                      .map((achievement) => `<li>${achievement}</li>`)
                      .join("")}
                </ul>
            </div>
            <div class="organizer-expertise">
                <h4>Areas of Expertise:</h4>
                <div class="expertise-tags">
                    ${organizer.expertise
                      .map(
                        (skill) => `<span class="expertise-tag">${skill}</span>`
                      )
                      .join("")}
                </div>
            </div>
        </div>
    `);
}

// Social media button interactions for organizers
const socialBtns = document.querySelectorAll(".social-btn");

// socialBtns.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     const platform = btn.getAttribute("data-platform");
//     const organizerCard = btn.closest(".organizer-card");
//     const organizerName = organizerCard.querySelector(
//       ".organizer-card__name"
//     ).textContent;

//     showSocialModal(platform, organizerName);
//   });
// });

// function showSocialModal(platform, organizerName) {
// const platformInfo = {
// linkedin: {
// name: "LinkedIn",
// icon: "fab fa-linkedin-in",
// color: "#0077B5",
// description:
//   "Connect professionally and stay updated with career insights and industry news.",
// },
// instagram: {
// name: "Instagram",
// icon: "fab fa-instagram",
// color: "#53e440ff",
// description:
//   "Follow for behind-the-scenes content and personal insights from our organizers.",
// },
// };

// const info = platformInfo[platform];

// createModal(`
//       <div class="social-modal">
//           <i class="${info.icon}" style="color: ${info.color}; font-size: 3rem; margin-bottom: 1rem;"></i>
//           <h3>Connect with ${organizerName}</h3>
//           <h4>on ${info.name}</h4>
//           <p>${info.description}</p>
//           <div class="social-info">
//               <p><strong>Note:</strong> Social media profiles will be available soon. Stay tuned for updates!</p>
//               <p>For now, you can reach out through our official channels in the Contact section.</p>
//           </div>
//       </div>
//   `);
// }

// Registration and Sponsor button interactions
const registerBtn = document.getElementById("register-btn");
const sponsorBtn = document.getElementById("sponsor-btn");

registerBtn?.addEventListener("click", () => {
  // Show registration information instead of redirecting to placeholder
  showAlert(
    "Registration Information",
    `
        <div class="alert-content">
            <i class="fas fa-calendar-check"></i>
            <h4>Registration Details</h4>
            <p><strong>Registration Period:</strong> September 23 - October 4, 2025</p>
            <p><strong>Event Dates:</strong> October 6-9, 2025</p>
            <div class="alert-actions">   
                <p ><strong><a href="https://unstop.com/">⭐ REGISTER HERE!</a></strong>  </p>
                <strong><a href="https://chat.whatsapp.com/K7qIQxVGlmAIAX3YZIT8Su?mode=ems_copy_t "> 👉 Join Whatsapp Community</a></strong>
            </div>
        </div>
    `
  );
});

sponsorBtn?.addEventListener("click", () => {
  showAlert(
    "Sponsorship Opportunities",
    `
        <div class="alert-content">
            <i class="fas fa-handshake"></i>
            <h4>Become Our Partner</h4>
            <p>Join us as a sponsor and connect with talented developers, innovators, and tech enthusiasts.</p>
            <div class="sponsor-benefits">
                <h5>Benefits:</h5>
                <ul>
                    <li>Brand visibility to tech talent</li>
                    <li>Networking opportunities</li>
                    <li>Access to innovative projects</li>
                    <li>Recruitment opportunities</li>
                </ul>
            </div>
            <div class="alert-actions">
                <p>For sponsorship inquiries:</p>
                <p>Email: <strong>abhisht_2300145@gniot.net.in</strong></p>
                <p>Phone: <strong>+91-9119914640</strong></p>
            </div>
        </div>
    `
  );
});

// Contact item interactions
const contactItems = document.querySelectorAll(".contact-item");

contactItems.forEach((item) => {
  item.addEventListener("click", () => {
    const type = item.getAttribute("data-type");
    const value = item.getAttribute("data-value");

    if (type === "email" && value) {
      window.open(`mailto:${value}`, "_blank");
    } else if (type === "phone" && value) {
      window.open(`tel:${value}`, "_blank");
    }
  });
});

// Timeline item interactions
const timelineItems = document.querySelectorAll(".timeline-item");

timelineItems.forEach((item) => {
  item.addEventListener("click", () => {
    const date = item.getAttribute("data-date");
    const content = item.querySelector(".timeline-item__content");
    const title = content.querySelector("h4").textContent;
    const description = content.querySelector("p").textContent;

    showAlert(
      `Event Details - ${date}`,
      `
            <div class="timeline-modal">
                <i class="fas fa-calendar-alt"></i>
                <h4>${title}</h4>
                <p class="timeline-date">${date}</p>
                <p class="timeline-description">${description}</p>
                <div class="timeline-extra">
                    
                    <p>Join <a href="https://chat.whatsapp.com/K7qIQxVGlmAIAX3YZIT8Su?mode=ems_copy_t ">Whatsapp Community</a> for further details. </p>
                </div>
            </div>
        `
    );
  });
});

// Mentor card interactions
const mentorCards = document.querySelectorAll(".mentor-card");

mentorCards.forEach((card) => {
  card.addEventListener("click", () => {
    const name = card.querySelector("h4").textContent;
    const role = card.querySelector(".mentor-card__role").textContent;
    const company = card.querySelector(".mentor-card__company").textContent;
    const expertise = card.querySelector(".mentor-card__expertise").textContent;

    showAlert(
      `Mentor Profile - ${name}`,
      `
            <div class="mentor-modal">
                <i class="fas fa-user-circle"></i>
                <h4>${name}</h4>
                <p class="mentor-role">${role} at ${company}</p>
                <div class="mentor-expertise">
                    <h5>Area of Expertise:</h5>
                    <span class="expertise-tag">${expertise}</span>
                </div>
                <div class="mentor-info">
                    <p>Our mentors will be available throughout the hackathon to provide guidance, technical support, and industry insights.</p>
                    <p><strong>Mentorship Sessions:</strong> Available during the event</p>
                    <p><strong>Office Hours:</strong> Scheduled consultation slots</p>
                    <p><strong>Support Areas:</strong> Technical guidance, project feedback, and career advice</p>
                </div>
            </div>
        `
    );
  });
});

// Scroll-based animations
function animateOnScroll() {
  const animatedElements = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right"
  );

  animatedElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
}

// Initialize animations on elements
document.addEventListener("DOMContentLoaded", () => {
  // Add animation classes to elements
  const themeCards = document.querySelectorAll(".theme-card");
  const mentorCards = document.querySelectorAll(".mentor-card");
  const benefits = document.querySelectorAll(".benefit");
  const timelineItems = document.querySelectorAll(".timeline-item");
  const organizerCards = document.querySelectorAll(".organizer-card");
  const sponsorCards = document.querySelectorAll(".sponsor-card");
  const partnerCards = document.querySelectorAll(".partner-card");

  themeCards.forEach((card, index) => {
    card.classList.add("fade-in");
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  mentorCards.forEach((card, index) => {
    card.classList.add("fade-in");
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  benefits.forEach((benefit, index) => {
    benefit.classList.add("slide-in-right");
    benefit.style.transitionDelay = `${index * 0.15}s`;
  });

  timelineItems.forEach((item, index) => {
    item.classList.add("fade-in");
    item.style.transitionDelay = `${index * 0.1}s`;
  });

  organizerCards.forEach((card, index) => {
    card.classList.add("slide-in-left");
    card.style.transitionDelay = `${index * 0.2}s`;
  });

  sponsorCards.forEach((card, index) => {
    card.classList.add("fade-in");
    card.style.transitionDelay = `${index * 0.05}s`;
  });

  partnerCards.forEach((card, index) => {
    card.classList.add("slide-in-right");
    card.style.transitionDelay = `${index * 0.1}s`;
  });
});

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// Utility Functions
function createModal(content) {
  // Remove existing modal
  const existingModal = document.querySelector(".modal-overlay");
  if (existingModal) {
    existingModal.remove();
  }

  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  modalOverlay.innerHTML = `
        <div class="modal-content">
            <button class="modal-close"><i class="fas fa-times"></i></button>
            ${content}
        </div>
    `;

  // Add modal styles
  const modalStyles = `
        <style>
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        .modal-overlay.show {
            opacity: 1;
            visibility: visible;
        }
        .modal-content {
            background: linear-gradient(135deg, rgba(13, 17, 23, 0.95), rgba(1, 4, 9, 0.95));
            border: 1px solid rgba(0, 194, 255, 0.3);
            border-radius: 16px;
            padding: 2rem;
            max-width: 90%;
            max-height: 80%;
            overflow-y: auto;
            position: relative;
            backdrop-filter: blur(20px);
            box-shadow: 0 16px 64px rgba(0, 0, 0, 0.4);
            transform: scale(0.7);
            transition: transform 0.3s ease;
        }
        .modal-overlay.show .modal-content {
            transform: scale(1);
        }
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: transparent;
            border: none;
            color: #00C2FF;
            font-size: 1.5rem;
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.2s ease;
        }
        .modal-close:hover {
            background: rgba(0, 194, 255, 0.1);
        }
        .theme-modal h3, .alert-content h4, .timeline-modal h4, .mentor-modal h4, .organizer-modal h3, .social-modal h3, .sponsor-modal h4, .partner-modal h4 {
            color: #00C2FF;
            margin-bottom: 1rem;
            font-family: 'Orbitron', sans-serif;
        }
        .tech-tags, .project-list {
            margin-top: 1rem;
        }
        .tech-tag, .expertise-tag {
            background: rgba(0, 194, 255, 0.2);
            color: #00C2FF;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.875rem;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
            display: inline-block;
        }
        .project-list {
            list-style: none;
            padding: 0;
        }
        .project-list li {
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.8);
        }
        .project-list li:before {
            content: "▶ ";
            color: #00C2FF;
            margin-right: 0.5rem;
        }
        .alert-content, .timeline-modal, .mentor-modal, .organizer-modal, .social-modal, .sponsor-modal, .partner-modal {
            color: rgba(255, 255, 255, 0.9);
        }
        .alert-content i, .timeline-modal i, .mentor-modal i, .organizer-modal i, .social-modal i, .sponsor-modal i, .partner-modal i {
            font-size: 2rem;
            color: #00C2FF;
            margin-bottom: 1rem;
            display: block;
        }
        .sponsor-benefits ul, .mentor-info, .organizer-achievements ul, .sponsor-info, .partner-info {
            margin-top: 1rem;
        }
        .sponsor-benefits li, .organizer-achievements li {
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 0.5rem;
        }
        .timeline-date {
            color: #FF3C7E;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        .organizer-role {
            color: #FF3C7E;
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        .organizer-institute {
            color: #FFD60A;
            font-weight: 500;
            margin-bottom: 1rem;
        }
        .organizer-achievements h4, .organizer-expertise h4 {
            color: #FF3C7E;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
        }
        .expertise-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 1rem;
        }
        .social-info, .sponsor-info, .partner-info {
            background: rgba(255, 255, 255, 0.05);
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
            border-left: 3px solid #00C2FF;
        }
        .mentor-role {
            color: #FF3C7E;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        </style>
    `;

  document.head.insertAdjacentHTML("beforeend", modalStyles);
  document.body.appendChild(modalOverlay);

  // Show modal with animation
  setTimeout(() => {
    modalOverlay.classList.add("show");
  }, 10);

  // Close modal events
  const closeBtn = modalOverlay.querySelector(".modal-close");
  closeBtn.addEventListener("click", () => {
    modalOverlay.classList.remove("show");
    setTimeout(() => {
      modalOverlay.remove();
    }, 300);
  });

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove("show");
      setTimeout(() => {
        modalOverlay.remove();
      }, 300);
    }
  });

  // Close on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modalOverlay.classList.remove("show");
      setTimeout(() => {
        modalOverlay.remove();
      }, 300);
    }
  });

  return modalOverlay;
}

function showAlert(title, content) {
  createModal(`
        <div class="alert-modal">
            <h3>${title}</h3>
            ${content}
        </div>
    `);
}

// Social links functionality
const socialLinks = document.querySelectorAll(".social-link");
socialLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // e.preventDefault();
    // const icon = link.querySelector("i");
    // const platform = icon.classList[1].split("-")[1]; // Get platform from fa-platform format

    showAlert(
      "Follow Us",
      `
            <div class="social-modal">
                <i class="${icon.className}"></i>
                <h4>Connect with us on ${
                  platform.charAt(0).toUpperCase() + platform.slice(1)
                }</h4>
                <p>Stay updated with the latest news, announcements, and updates about The TechClasher.</p>
                <p>Follow our official social media accounts for:</p>
                <ul>
                    <li>Event updates and announcements</li>
                    <li>Behind-the-scenes content</li>
                    <li>Tips and resources for participants</li>
                    <li>Community highlights and features</li>
                </ul>
                <p><strong>Coming Soon!</strong> Official social media links will be shared soon.</p>
            </div>
        `
    );
  });
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
  updateActiveSection();
  animateOnScroll();
}, 16); // ~60fps

window.addEventListener("scroll", throttledScrollHandler);

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize countdown timer
  initCountdown();

  // Add initial classes for animations
  updateActiveSection();
  animateOnScroll();

  // Add subtle parallax effect to hero background elements
  const bgElements = document.querySelectorAll(".bg-element");
  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      bgElements.forEach((element, index) => {
        const multiplier = (index + 1) * 0.3;
        element.style.transform = `translateY(${rate * multiplier}px)`;
      });
    }, 16)
  );

  console.log(
    "TechClasher website with all new features loaded successfully! 🚀"
  );
});
