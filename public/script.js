document.addEventListener("DOMContentLoaded", async () => {
    const eventsList = document.getElementById("events-list");
  
    try {
      const response = await fetch("/api/events");
      const events = await response.json();
  
      if (events.length > 0) {
        eventsList.innerHTML = events
          .map(
            (event) => `
            <div class="event">
              <h2>${event.title}</h2>
              <p><strong>Date:</strong> ${new Date(event.start_at).toLocaleString()}</p>
              <p><strong>Description:</strong> ${event.description || "No description"}</p>
            </div>`
          )
          .join("");
      } else {
        eventsList.textContent = "No events in the upcoming week.";
      }
    } catch (error) {
      eventsList.textContent = "Failed to load events.";
      console.error("Error:", error);
    }
  });
  