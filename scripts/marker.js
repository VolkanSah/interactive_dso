document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.getElementById('map-container');
    const mainMap = document.getElementById('main-map');
    const lagerList = document.getElementById('lager-list');
    let markerId = 0;

    mapContainer.addEventListener('click', function(event) {
        if (event.target !== mainMap) return; // Verhindert das Setzen eines Markers auf einem bestehenden Marker
        event.stopPropagation(); // Verhindert Event-Bubbling
        const rect = mainMap.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        markerId++;
        const marker = createMarker(x, y, markerId);
        mapContainer.appendChild(marker);
        addLagerToList(markerId);
    });

    function createMarker(x, y, id) {
        const marker = document.createElement('div');
        marker.className = 'pointer';
        marker.style.left = `${x}%`;
        marker.style.top = `${y}%`;
        marker.style.width = '30px';   // Größe anpassen
        marker.style.height = '30px';  // Größe anpassen
        marker.textContent = id;
        marker.draggable = true;

        marker.addEventListener('dragend', function(event) {
            event.stopPropagation(); // Verhindert Event-Bubbling
            const mapRect = mapContainer.getBoundingClientRect();
            const newX = ((event.clientX - mapRect.left) / mapRect.width) * 100;
            const newY = ((event.clientY - mapRect.top) / mapRect.height) * 100;
            marker.style.left = `${newX}%`;
            marker.style.top = `${newY}%`;
        });

        marker.addEventListener('dblclick', function() {
            marker.remove();
            removeLagerFromList(id);
            updateMarkerIds();
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

    function updateMarkerIds() {
        markerId = 0;
        Array.from(mapContainer.children).forEach(marker => {
            if (marker.className === 'pointer') {
                markerId++;
                marker.textContent = markerId;
            }
        });
        updateLagerList();
    }

    function updateLagerList() {
        lagerList.innerHTML = '';
        for (let i = 1; i <= markerId; i++) {
            addLagerToList(i);
        }
    }
});
