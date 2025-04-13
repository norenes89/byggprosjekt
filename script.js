document.getElementById("projectForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const userInput = document.getElementById("projectInput").value;
  const responseEl = document.getElementById("aiResponse");
  const imageEl = document.getElementById("projectImage");

  responseEl.innerText = "Henter veiledning fra AI...";
  imageEl.innerHTML = "";

  try {
    const res = await fetch("http://localhost:3000/api/project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userInput })
    });

    const data = await res.json();
    responseEl.innerText = data.response;

    if (data.imageUrl) {
      const img = document.createElement("img");
      img.src = data.imageUrl;
      imageEl.appendChild(img);
    }
  } catch (error) {
    responseEl.innerText = "Noe gikk galt med forespørselen.";
    console.error(error);
  }
});
