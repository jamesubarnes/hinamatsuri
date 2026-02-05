// Store the last registration for ticket download
let lastRegistration = null;

// Initialize Data SDK
let registrationData = [];

const dataHandler = {
  onDataChanged(data) {
    registrationData = data;
    console.log(`Total registrations: ${data.length}`);
  }
};

// Data SDK not available for static hosting - form submissions handled locally

// Page Navigation
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page-content').forEach(page => {
    page.classList.add('hidden');
  });

  // Show selected page
  const targetPage = document.getElementById(`page-${pageId}`);
  if (targetPage) {
    targetPage.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Close mobile menu
  document.getElementById('mobile-menu').classList.add('hidden');
}

// Volunteer form handler
function openVolunteerForm(role) {
  document.getElementById('tickets-modal').classList.remove('hidden');
  // In a real implementation, you'd customize the form based on the role
}

// Close success modal
function closeSuccessModal() {
  document.getElementById('tickets-modal').classList.add('hidden');
  document.getElementById('ticket-form').classList.remove('hidden');
  document.getElementById('ticket-success').classList.add('hidden');
  document.getElementById('ticket-form').reset();
}

// Download ticket function
function downloadTicket() {
  if (!lastRegistration) return;

  // Create a canvas to draw the ticket
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, 1000);
  gradient.addColorStop(0, '#FFF5F7');
  gradient.addColorStop(0.5, '#FFE4E9');
  gradient.addColorStop(1, '#FFD6DD');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 800, 1000);

  // Decorative border
  ctx.strokeStyle = '#FFB7C5';
  ctx.lineWidth = 8;
  ctx.strokeRect(20, 20, 760, 960);

  // Inner border
  ctx.strokeStyle = '#FF9FB0';
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, 720, 920);

  // Header
  ctx.fillStyle = '#5D1F28';
  ctx.font = 'bold 48px "Playfair Display", serif';
  ctx.textAlign = 'center';
  ctx.fillText('Japanese Girls\' Festival', 400, 120);

  ctx.font = '36px "Noto Serif JP", serif';
  ctx.fillStyle = '#FF9FB0';
  ctx.fillText('ひな祭り', 400, 170);

  ctx.font = 'italic 24px "Playfair Display", serif';
  ctx.fillStyle = '#8B4450';
  ctx.fillText('Reimagined', 400, 210);

  // Divider line
  ctx.strokeStyle = '#FFB7C5';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(100, 250);
  ctx.lineTo(700, 250);
  ctx.stroke();

  // Registration confirmed
  ctx.font = 'bold 36px "Playfair Display", serif';
  ctx.fillStyle = '#5D1F28';
  ctx.fillText('REGISTRATION CONFIRMED', 400, 320);

  // Attendee details
  ctx.font = '24px "Noto Serif JP", serif';
  ctx.fillStyle = '#8B4450';
  ctx.textAlign = 'left';

  ctx.fillText('Name:', 100, 400);
  ctx.font = 'bold 28px "Playfair Display", serif';
  ctx.fillStyle = '#5D1F28';
  ctx.fillText(lastRegistration.name, 100, 440);

  ctx.font = '24px "Noto Serif JP", serif';
  ctx.fillStyle = '#8B4450';
  ctx.fillText('Email:', 100, 500);
  ctx.font = '24px "Playfair Display", serif';
  ctx.fillStyle = '#5D1F28';
  ctx.fillText(lastRegistration.email, 100, 535);

  ctx.font = '24px "Noto Serif JP", serif';
  ctx.fillStyle = '#8B4450';
  ctx.fillText('Attendees:', 100, 595);
  ctx.font = 'bold 28px "Playfair Display", serif';
  ctx.fillStyle = '#5D1F28';
  ctx.fillText(lastRegistration.attendee_count + ' person(s)', 100, 635);

  // Event details box
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fillRect(80, 700, 640, 220);
  ctx.strokeStyle = '#FFB7C5';
  ctx.lineWidth = 3;
  ctx.strokeRect(80, 700, 640, 220);

  ctx.font = 'bold 28px "Playfair Display", serif';
  ctx.fillStyle = '#5D1F28';
  ctx.textAlign = 'center';
  ctx.fillText('EVENT DETAILS', 400, 740);

  ctx.font = '22px "Noto Serif JP", serif';
  ctx.fillStyle = '#8B4450';
  ctx.fillText('March 21st & 22nd, 2026', 400, 785);
  ctx.fillText('Geelong West Neighbourhood House', 400, 825);

  ctx.font = 'bold 26px "Playfair Display", serif';
  ctx.fillStyle = '#FF9FB0';
  ctx.fillText('FREE ENTRY', 400, 875);

  // Footer
  ctx.font = 'italic 18px "Noto Serif JP", serif';
  ctx.fillStyle = '#8B4450';
  ctx.fillText('Please present this ticket at the entrance', 400, 950);

  // Convert canvas to blob and download
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hinamatsuri-ticket-${lastRegistration.name.replace(/\s+/g, '-')}.png`;
    link.click();
    URL.revokeObjectURL(url);
  });
}

// Default configuration
const defaultConfig = {
  festival_name: "Japanese Girls' Festival Reimagined",
  festival_subtitle: 'ひな祭り',
  festival_tagline: 'Celebrating grace, beauty, and tradition',
  festival_date: 'Saturday, March 3, 2025',
  festival_location: 'Japanese Gardens, Melbourne',
  about_heading: 'About Hinamatsuri',
  schedule_heading: 'Festival Program',
  mindful_eating_heading: 'Japanese Mindful Eating Experience',
  background_color: '#FFF5F7',
  surface_color: '#FFFFFF',
  text_color: '#5D1F28',
  primary_action_color: '#FF9FB0',
  secondary_action_color: '#FFB7C5',
  font_family: 'Playfair Display',
  font_size: 16
};

let config = { ...defaultConfig };

// Initialize page with default config (no SDK needed for static hosting)

// Create falling sakura petals
function createSakuraPetals() {
  const container = document.getElementById('sakura-container');
  const petalCount = 15;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.className = 'sakura';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (Math.random() * 10 + 15) + 's';
    petal.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(petal);
  }
}

createSakuraPetals();

// Countdown Timer
function updateCountdown() {
  const festivalDate = new Date('2026-03-21T10:00:00');
  const now = new Date();
  const diff = festivalDate - now;

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown-days').textContent = String(days).padStart(2, '0');
    document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('countdown-mins').textContent = String(mins).padStart(2, '0');
    document.getElementById('countdown-secs').textContent = String(secs).padStart(2, '0');
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Ticket Form
document.getElementById('ticket-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Check data limit
  if (registrationData.length >= 999) {
    const errorDiv = document.getElementById('form-error');
    errorDiv.querySelector('p').textContent = 'Registration limit reached (999 registrations). Please contact the organizers.';
    errorDiv.classList.remove('hidden');
    return;
  }

  // Show loading state
  const submitBtn = document.getElementById('submit-btn');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Submitting...';
  submitBtn.disabled = true;
  document.getElementById('form-error').classList.add('hidden');

  // Get form data
  const formData = {
    name: document.getElementById('ticket-name').value,
    email: document.getElementById('ticket-email').value,
    attendee_count: document.getElementById('ticket-qty').value,
    postcode: document.getElementById('postcode').value,
    submitted_at: new Date().toISOString()
  };

  // Store for ticket download
  lastRegistration = formData;

  // Submit to Data SDK
  // For GitHub Pages, we'll show a confirmation message
  // In production, connect to a form service like Formspree, Netlify Forms, or Google Forms
  const result = { isOk: true };

  // Reset button
  submitBtn.textContent = originalText;
  submitBtn.disabled = false;

  if (result.isOk) {
    // Success - show success message
    document.getElementById('ticket-form').classList.add('hidden');
    document.getElementById('ticket-success').classList.remove('hidden');
  } else {
    // Error - show error message
    const errorDiv = document.getElementById('form-error');
    errorDiv.classList.remove('hidden');
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu if open
      document.getElementById('mobile-menu').classList.add('hidden');
    }
  });
});
