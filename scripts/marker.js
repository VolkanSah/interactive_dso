// marker.js " Private license" copyright volkan kücükbudak
// You may not use my marker without my permission
// marker.js " Private license" copyright volkan kücükbudak
// You may not use my marker without my permission
document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.getElementById('map-container');
    const mainMap = document.getElementById('main-map');
    const lagerList = document.getElementById('lager-list');
    let markerId = 0;

    mapContainer.addEventListener('click', function(event) {
        if (event.target !== mainMap) return; // Prevents placing a marker on an existing marker
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
        marker.style.width = '30px';   // adjust size
        marker.style.height = '30px';  // adjust size
        marker.textContent = id;
        marker.draggable = true;

        marker.addEventListener('dragend', function(event) {
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
        listItem.innerHTML = `
            <div>
                Lager ${id}
                <input type="number" name="wellen_anzahl" placeholder="0" step="1" value="1" min="0" max="25" required>
                <select name="general_type_select" id="general-type-select-${id}">
                    <option value="">General wählen</option>
                </select>
                <input type="number" name="skill_garnisonsanbau" placeholder="0" step="5" min="0" max="15" required>
                <input type="color" name="general_color" value="#ff0000">
                <select name="units_type_select" id="units-type-select-${id}">
                    <option value="">Einheitstype</option>
                    <option value="normal">Kaserne</option>
                    <option value="elite-einheiten">Elite</option>
                </select>
                <div id="units-container-${id}"></div>
            </div>
        `;
        lagerList.appendChild(listItem);

        // Dynamically load generals
        populateGeneralSelector(`general-type-select-${id}`);
        // Add device type event listener
        document.getElementById(`units-type-select-${id}`).addEventListener('change', function(event) {
            const selectedType = event.target.value;
            populateUnitInputs(id, selectedType);
        });
    }

    function removeLagerFromList(id) {
        const listItem = Array.from(lagerList.children).find(item => item.textContent.includes(`Lager ${id}`));
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

