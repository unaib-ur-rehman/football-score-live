document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://v3.football.api-sports.io/fixtures?live=all";
  const API_KEY = "";
  const scoresDiv = document.getElementById("live-scores");
  const defaultIcon = "../icons/icon.png";

  async function fetchLiveMatches() {
    try {
      const response = await fetch(API_URL, {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": API_KEY,
        },
      });

      const data = await response.json();
      displayMatches(data.response);
    } catch (error) {
      scoresDiv.innerHTML = `<p style="color: red;">Failed to load matches. Please try again.</p>`;
      console.error("Error fetching live matches:", error);
    }
  }

  function displayMatches(matches) {
    if (matches.length === 0) {
      scoresDiv.innerHTML = "<p>No live matches today.</p>";
      return;
    }

    scoresDiv.innerHTML = matches
      .map((match) => {
        const homeTeam = match.teams.home;
        const awayTeam = match.teams.away;
        const matchTime = match.fixture.status.elapsed || "LIVE";
        const awayGoals = match.goals.away || 0;
        const homeGoals = match.goals.home || 0;

        return `
          <p>
            <span class="time">${matchTime}'</span>
            <span class="team">
              <img src="${homeTeam.logo || defaultIcon}" alt="${homeTeam.name}">
              <span>${homeTeam.name}</span>
            </span>
            <span class="score">${homeGoals} - ${awayGoals}</span>
            <span class="team">
            <span>${awayTeam.name}</span>
              <img src="${awayTeam.logo || defaultIcon}" alt="${awayTeam.name}">
            </span>
          </p>`;
      })
      .join("");
  }

  fetchLiveMatches();
});
