// main.js
document.addEventListener('DOMContentLoaded', function() {
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

    function loadMap(mapName) {
        // Hier wird die Karte geladen (Beispiel mit Platzhalterbild)
        mapContainer.innerHTML = `<img src="assets/maps/${mapName}.jpg" alt="${mapName}">`;

        // Lagerliste zurücksetzen
        lagerList.innerHTML = '';
    }
});
