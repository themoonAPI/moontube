```javascript
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const player = document.getElementById("player");
const playerContainer = document.getElementById("player-container");
const placeholder = document.getElementById("player-placeholder");

function extractVideoID(input) {
    input = input.trim();

    if (!input) return null;

    let videoID = null;

    try {
        if (input.includes("youtube.com") || input.includes("youtu.be")) {
            const url = new URL(
                input.startsWith("http") ? input : `https://${input}`
            );

            if (url.hostname === "youtu.be") {
                videoID = url.pathname.split("/")[1];
            } else if (
                url.hostname === "youtube.com" ||
                url.hostname === "www.youtube.com" ||
                url.hostname === "m.youtube.com" ||
                url.hostname === "youtube-nocookie.com"
            ) {
                videoID =
                    url.searchParams.get("v") ||
                    url.pathname.match(/\/(?:embed|shorts|live)\/([^/]+)/)?.[1];
            }
        } else {
            videoID = input;
        }
    } catch {
        return null;
    }

    return /^[a-zA-Z0-9_-]{11}$/.test(videoID || "")
        ? videoID
        : null;
}

function setStatus(message, error = false) {
    const statusText = document.querySelector(".status-text");

    if (statusText) {
        statusText.textContent = message;
        statusText.style.color = error ? "#ff7777" : "";
    }
}

function loadVideo() {
    const videoID = extractVideoID(searchInput.value);

    if (!videoID) {
        setStatus("Invalid video URL or ID", true);
        searchInput.focus();
        return;
    }

    searchBtn.disabled = true;
    searchBtn.textContent = "Loading...";
    setStatus("Loading video");

    if (placeholder) {
        placeholder.style.display = "none";
    }

    player.src =
        `https://www.youtube-nocookie.com/embed/${videoID}?autoplay=1&rel=0`;

    player.style.display = "block";

    player.onload = () => {
        searchBtn.disabled = false;
        searchBtn.textContent = "Search";
        setStatus("Video loaded");
    };

    searchInput.value = "";
}

searchBtn.addEventListener("click", loadVideo);

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        loadVideo();
    }
});

searchInput.addEventListener("input", () => {
    setStatus("Ready to watch");
});

player.style.display = "none";
```
