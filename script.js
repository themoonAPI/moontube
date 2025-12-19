const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const player = document.getElementById('player');

function extractVideoID(input) {
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = input.match(regex);
    return match ? match[1] : input.trim();
}

searchBtn.addEventListener('click', () => {
    const videoID = extractVideoID(searchInput.value);
    if (videoID) {
        player.src = `https://www.youtube-nocookie.com/embed/${videoID}?autoplay=1&rel=0`;
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});
