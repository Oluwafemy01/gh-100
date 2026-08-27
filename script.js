// Basic client-side branch system for the landing page.
// Replace the sampleBranches array with real branch data via API or JSON file.

const sampleBranches = [
  {
    id: "b1",
    name: "First Bank - Lagos Island",
    city: "Lagos",
    address: "12 Marina Rd, Lagos Island",
    hours: "Mon-Fri: 8:00 - 16:00",
    phone: "+234 1 234 5678",
    coords: { lat: 6.4511, lng: 3.3958 }
  },
  {
    id: "b2",
    name: "First Bank - Ikeja",
    city: "Lagos",
    address: "45 Allen Ave, Ikeja",
    hours: "Mon-Fri: 8:00 - 16:00",
    phone: "+234 1 876 5432",
    coords: { lat: 6.6018, lng: 3.3515 }
  },
  {
    id: "b3",
    name: "First Bank - Abuja Central",
    city: "Abuja",
    address: "3 Central St, Abuja",
    hours: "Mon-Fri: 8:00 - 16:00",
    phone: "+234 9 777 0000",
    coords: { lat: 9.0723, lng: 7.4910 }
  }
];

document.addEventListener("DOMContentLoaded", () => {
  // UI elements
  const branchSelect = document.getElementById("branch-select");
  const branchList = document.getElementById("branch-list");
  const branchDetails = document.getElementById("branch-details");
  const searchInput = document.getElementById("branch-search");
  const searchBtn = document.getElementById("search-btn");
  const yearEl = document.getElementById("year");
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");

  yearEl.textContent = new Date().getFullYear();

  // Populate select
  function populateSelect(branches) {
    // keep default first option
    branchSelect.querySelectorAll("option:not([value=''])")?.forEach(o => o.remove());
    branches.forEach(b => {
      const opt = document.createElement("option");
      opt.value = b.id;
      opt.textContent = `${b.name} — ${b.city}`;
      branchSelect.appendChild(opt);
    });
  }

  // Render list
  function renderList(branches) {
    branchList.innerHTML = "";
    if (!branches.length) {
      branchList.innerHTML = `<p class="text-muted">No branches found.</p>`;
      return;
    }
    branches.forEach(b => {
      const card = document.createElement("div");
      card.className = "branch-card";
      card.tabIndex = 0;
      card.innerHTML = `<h4>${escapeHtml(b.name)}</h4>
                        <p class="text-muted">${escapeHtml(b.city)} — ${escapeHtml(b.address)}</p>
                        <p class="text-muted">${escapeHtml(b.hours)}</p>`;
      card.addEventListener("click", () => showDetails(b));
      card.addEventListener("keydown", (e) => { if (e.key === "Enter") showDetails(b); });
      branchList.appendChild(card);
    });
  }

  // Show details
  function showDetails(b) {
    branchDetails.innerHTML = `
      <h3>${escapeHtml(b.name)}</h3>
      <p><strong>Address:</strong> ${escapeHtml(b.address)}</p>
      <p><strong>City:</strong> ${escapeHtml(b.city)}</p>
      <p><strong>Hours:</strong> ${escapeHtml(b.hours)}</p>
      <p><strong>Phone:</strong> <a href="tel:${encodeURIComponent(b.phone)}">${escapeHtml(b.phone)}</a></p>
      <div class="branch-actions">
        <button class="btn primary" onclick="getDirections(${b.coords.lat}, ${b.coords.lng})">Get Directions</button>
        <button class="btn outline" onclick="contactBranch('${escapeHtml(b.id)}')">Contact Branch</button>
      </div>
    `;
  }

  // Search handler
  function doSearch() {
    const q = (searchInput.value || "").trim().toLowerCase();
    const selected = branchSelect.value;
    let results = sampleBranches.slice();
    if (selected) {
      results = results.filter(r => r.id === selected);
    }
    if (q) {
      results = results.filter(r => (r.name + " " + r.city + " " + r.address).toLowerCase().includes(q));
    }
    renderList(results);
    populateSelect(sampleBranches); // keep select full for convenience
  }

  // Initialize
  populateSelect(sampleBranches);
  renderList(sampleBranches);

  // Events
  searchBtn.addEventListener("click", doSearch);
  searchInput.addEventListener("keydown", (e) => { if (e.key === "Enter") doSearch(); });
  branchSelect.addEventListener("change", () => {
    const id = branchSelect.value;
    if (id) {
      const b = sampleBranches.find(x => x.id === id);
      if (b) showDetails(b);
    } else {
      branchDetails.innerHTML = `<p class="empty">Select a branch to view details</p>`;
    }
  });

  // simple nav toggle
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    // show/hide nav anchors when toggled (simple approach)
    mainNav.classList.toggle("is-open", !expanded);
  });
});

// Utilities
function escapeHtml(s) {
  if (!s && s !== 0) return "";
  return String(s).replace(/[&<>\"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[m]));
}

function getDirections(lat, lng) {
  // Placeholder: open Google Maps in new tab. Replace or customize as needed.
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lat + "," + lng)}`;
  window.open(url, "_blank");
}

function contactBranch(branchId) {
  // Example contact action: open default mail client with branch reference
  const subject = encodeURIComponent("Inquiry for branch " + branchId);
  window.location.href = `mailto:support@firstbank.example?subject=${subject}`;
}
