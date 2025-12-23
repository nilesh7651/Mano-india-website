/* LOAD ARTIST CARDS */
const container = document.getElementById("artistCards");

if (container) {
  artists.forEach(artist => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${artist.image}">
      <h3>${artist.name}</h3>
      <p>${artist.category}</p>
      <p style="color:#ff3f6c;font-weight:600">${artist.price}</p>
    `;

    card.onclick = () => {
      window.location.href = `artist.html?id=${artist.id}`;
    };

    container.appendChild(card);
  });
}

/* SCROLL FUNCTION */
function scrollToArtists() {
  document.getElementById("artists").scrollIntoView({ behavior: "smooth" });
}

/* ARTIST DETAILS PAGE */
if (window.location.pathname.includes("artist.html")) {
  const id = new URLSearchParams(window.location.search).get("id");
  const artist = artists.find(a => a.id == id);

  document.getElementById("artistDetails").innerHTML = `
    <img src="${artist.image}">
    <h2>${artist.name}</h2>
    <p><b>Category:</b> ${artist.category}</p>
    <p><b>Experience:</b> ${artist.experience}</p>
    <p><b>Location:</b> ${artist.location}</p>
    <p style="color:#ff3f6c;font-weight:600">${artist.price}</p>
    <button class="book-btn">Book Now</button>
  `;
}
