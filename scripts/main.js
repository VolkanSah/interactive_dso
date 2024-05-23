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

    // Testweise Generierung eines General-Dropdowns
    const generalDropdown = createGeneralDropdown();
    document.body.appendChild(generalDropdown);

    // Testweise Generierung eines Unit-Dropdowns
    const unitDropdown = createUnitDropdown('normal');
    document.body.appendChild(unitDropdown);
});
