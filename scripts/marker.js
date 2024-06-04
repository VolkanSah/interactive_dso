
document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.getElementById('map-container');
    const lagerList = document.getElementById('lager-list');
    let markerId = 0;

    mapContainer.addEventListener('click', function(event) {
        if (event.target !== mapContainer) return; // Verhindert das Setzen eines Markers auf einem bestehenden Marker
        const x = event.offsetX;
        const y = event.offsetY;
        markerId++;
        const marker = createMarker(x, y, markerId);
        mapContainer.appendChild(marker);
        addLagerToList(markerId);
    });

    function createMarker(x, y, id) {
        const marker = document.createElement('div');
        marker.className = 'pointer';
        marker.style.left = `${x}px`;
        marker.style.top = `${y}px`;
        marker.textContent = id;
        marker.draggable = true;

        marker.addEventListener('dragend', function(event) {
            const mapRect = mapContainer.getBoundingClientRect();
            const newX = event.clientX - mapRect.left;
            const newY = event.clientY - mapRect.top;
            marker.style.left = `${newX}px`;
            marker.style.top = `${newY}px`;
        });

        marker.addEventListener('dblclick', function() {
            marker.remove();
            removeLagerFromList(id);
        });

        return marker;
    }

    function addLagerToList(id) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = `Lager ${id}`;
        lagerList.appendChild(listItem);
    }

    function removeLagerFromList(id) {
        const listItem = Array.from(lagerList.children).find(item => item.textContent === `Lager ${id}`);
        if (listItem) {
            listItem.remove();
        }
    }
});
