let markers = [];

function addMarker(x, y) {
    const marker = { x, y };
    markers.push(marker);
    renderMarkers();
}

function renderMarkers() {
    const mapElement = document.getElementById('map');
    mapElement.innerHTML = '';
    markers.forEach(marker => {
        const markerElement = document.createElement('div');
        markerElement.classList.add('marker');
        markerElement.style.left = `${marker.x}px`;
        markerElement.style.top = `${marker.y}px`;
        mapElement.appendChild(markerElement);
    });
}

document.getElementById('map').addEventListener('click', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    addMarker(x, y);
});
