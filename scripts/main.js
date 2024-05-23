// main.js
document.addEventListener('DOMContentLoaded', async function() {
    const mapSelect = document.getElementById('map-select');
    const mapContainer = document.getElementById('map-container');
    const lagerList = document.getElementById('lager-list');

    // Beispielkarten laden (dies sollte durch eine API oder JSON-Datei ersetzt werden)
    const maps = ['Karte 1', 'Karte 2', 'Karte 3'];
    maps.forEach(map => {
        const option = document.createElement('option');
        option.value = map;
        option.textContent = map;
        mapSelect.appendChild(option);
    });

    mapSelect.addEventListener('change', function() {
        loadMap(this.value);
    });

    async function loadMap(mapName) {
        // Hier wird die Karte geladen (Beispiel mit Platzhalterbild)
        mapContainer.innerHTML = `<img src="assets/maps/${mapName}.jpg" alt="${mapName}">`;

        // Lagerliste zurücksetzen
        lagerList.innerHTML = '';
    }

    const generals = await loadGenerals();
    const units = await loadUnits();

    // Funktion zur Generierung der Dropdown-Menüs für Generäle
    function createGeneralDropdown() {
        const select = document.createElement('select');
        select.className = 'form-control';
        generals.forEach(general => {
            const option = document.createElement('option');
            option.value = general.name;
            option.textContent = general.name;
            select.appendChild(option);
        });
        return select;
    }

    // Funktion zur Generierung der Dropdown-Menüs für Einheiten
    function createUnitDropdown(type) {
        const select = document.createElement('select');
        select.className = 'form-control';
        units.filter(unit => unit.type === type).forEach(unit => {
            const option = document.createElement('option');
            option.value = unit.name;
            option.textContent = unit.name;
            select.appendChild(option);
        });
        return select;
    }

    // Funktion zum Hinzufügen von Markern
    mapContainer.addEventListener('click', function(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        const id = lagerList.children.length + 1;
        const marker = addMarker(mapContainer, x, y, id);
        addLagerToList(id);
    });

    // Funktion zum Hinzufügen von Lagern zur Liste
    function addLagerToList(id) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = `Lager ${id}`;
        lagerList.appendChild(listItem);

        // Buttons für Wellen und Angriffe hinzufügen
        const waveButton = document.createElement('button');
        waveButton.className = 'btn btn-primary btn-sm ml-2';
        waveButton.textContent = 'Wellen';
        listItem.appendChild(waveButton);

        waveButton.addEventListener('click', function() {
            // Dropdown-Menüs für Generäle und Einheiten anzeigen
            const generalDropdown = createGeneralDropdown();
            listItem.appendChild(generalDropdown);

            const unitDropdown = createUnitDropdown('normal');
            listItem.appendChild(unitDropdown);
        });
    }
});

// Ladefunktionen für Generäle und Einheiten
async function loadGenerals() {
    const response = await fetch('data/generals.json');
    const data = await response.json();
    return data.generals;
}

async function loadUnits() {
    const response = await fetch('data/units.json');
    const data = await response.json();
    return data.units;
}

// Marker-Funktion (aus marker.js)
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
