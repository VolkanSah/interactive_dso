// marker.js
function addMarker(mapContainer, x, y, id) {
    const marker = document.createElement('div');
    marker.className = 'pointer';
    marker.style.left = `${x}px`;
    marker.style.top = `${y}px`;
    marker.textContent = id;
    mapContainer.appendChild(marker);

    // Event Listener zum Verschieben des Markers
    marker.addEventListener('mousedown', function(event) {
        const shiftX = event.clientX - marker.getBoundingClientRect().left;
        const shiftY = event.clientY - marker.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            marker.style.left = pageX - shiftX + 'px';
            marker.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        marker.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            marker.onmouseup = null;
        };
    });

    marker.ondragstart = function() {
        return false;
    };

    return marker;
}
