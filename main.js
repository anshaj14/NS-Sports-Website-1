// Scroll to Top Functionality
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.onscroll = function () {
  const scrollBtn = document.getElementById("scrollBtn");
  if (scrollBtn) {
    scrollBtn.style.display = document.documentElement.scrollTop > 200 ? "block" : "none";
  }
};

// Contact Form Submission
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you! Your message has been received. We'll get back to you soon.");
      form.reset();
    });
  }

  // Scroll button click (safeguard)
  const scrollBtn = document.getElementById("scrollBtn");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", scrollToTop);
  }
});
// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const parent = btn.parentElement;
    parent.classList.toggle('active');
  });
});

// Counter Animation
const counters = document.querySelectorAll('.counter');

const animateCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const speed = 200; // Lower is faster
      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

// Run animation when visible
window.addEventListener('scroll', () => {
  const section = document.querySelector('.counter-box');
  if (section && section.getBoundingClientRect().top < window.innerHeight) {
    animateCounters();
  }
}, { once: true });

// Add in main.js
const scrollBtn = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) scrollBtn.classList.add('show');
  else scrollBtn.classList.remove('show');
});


// Contact form handler (frontend only for now)
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop default form submission

    // Get values
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Simple validation
    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Placeholder until backend is added
    alert("Thank you, your message has been received!");

    // Reset form
    form.reset();
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, subject, message })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Message sent successfully! ✅");
        form.reset();
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  });
});

