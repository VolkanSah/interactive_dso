// copyright volkan sah
document.addEventListener('DOMContentLoaded', async function() {
    const mapSelector = document.getElementById('map-selector');
    const mainMap = document.getElementById('main-map');
    const adventureType = document.getElementById('adventure-type');
    const adventureLevel = document.getElementById('adventure-level');
    const adventurePlayers = document.getElementById('adventure-players');

    const lagerTabHeaders = document.getElementById('lager-tab-headers');
    const lagerTabContent = document.getElementById('lager-tab-content');
    let markerId = 0;

    // Karten laden
    async function loadMaps() {
        const response = await fetch('data/map_loader.json');
        const data = await response.json();
        return data.map_loader;
    }

    // Abenteuerdetails laden
    async function loadAdventureDetails() {
        const response = await fetch('data/maps.json');
        const data = await response.json();
        return data.abenteuer;
    }

    // Dropdown mit Karten füllen
    async function populateMapSelector() {
        const maps = await loadMaps();
        maps.forEach(map => {
            const option = document.createElement('option');
            option.value = map.at_img;
            option.textContent = map.at_loader_name;
            mapSelector.appendChild(option);
        });
    }

    // Abenteuerdetails anzeigen
    async function showAdventureDetails(selectedMap) {
        const adventures = await loadAdventureDetails();
        const adventure = adventures.find(a => a.Abenteuer === selectedMap);

        if (adventure) {
            adventureType.textContent = `Zuordnung: ${adventure.Zuordnung}`;
            adventureLevel.textContent = `Level: ${adventure.Level}`;
            adventurePlayers.textContent = `Spieler: ${adventure['Spieler-Min']} - ${adventure['Spieler-Max']}`;
        } else {
            adventureType.textContent = '';
            adventureLevel.textContent = '';
            adventurePlayers.textContent = '';
        }
    }

    // Karte und Details aktualisieren
    mapSelector.addEventListener('change', function() {
        const selectedMap = mapSelector.options[mapSelector.selectedIndex].text;
        const imgSrc = mapSelector.value;
        mainMap.src = imgSrc;
        showAdventureDetails(selectedMap);
    });

    // Initialisieren
    await populateMapSelector();

    // Generäle laden
    async function loadGenerals() {
        const response = await fetch('data/generals.json');
        const data = await response.json();
        return data.generals;
    }

    // Einheiten laden
    async function loadUnits() {
        const response = await fetch('data/units.json');
        const data = await response.json();
        return data.units;
    }

    // Dropdown mit Generälen füllen
    async function populateGeneralSelector(selectorId) {
        const generalSelector = document.getElementById(selectorId);
        const generals = await loadGenerals();
        generals.forEach(general => {
            const option = document.createElement('option');
            option.value = general.name;
            option.textContent = general.name;
            generalSelector.appendChild(option);
        });
    }

    // Einheiten basierend auf Einheitstyp laden
    async function populateUnitInputs(lagerId, type) {
        const unitsContainer = document.getElementById(`units-container-${lagerId}`);
        unitsContainer.innerHTML = ''; // Reset units container
        const units = await loadUnits();
        const filteredUnits = units.filter(unit => unit.type === type);

        filteredUnits.forEach(unit => {
            const unitDiv = document.createElement('div');
            unitDiv.innerHTML = `
                <img src="${unit.unit_img}" alt="${unit.name}" style="width: 20px; height: auto;">
                <input type="number" name="unit_${unit.name}" placeholder="Anzahl ${unit.short_name}" step="1" min="0" max="200" required>
            `;
            unitsContainer.appendChild(unitDiv);
        });
    }

    function createLagerTab(id) {
        const tabHeader = document.createElement('button');
        tabHeader.textContent = `Lager ${id}`;
        tabHeader.className = 'tab-header';
        tabHeader.dataset.tabTarget = `#lager-${id}`;
        tabHeader.addEventListener('click', () => {
            document.querySelectorAll('.tab-header').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            tabHeader.classList.add('active');
            document.querySelector(`#lager-${id}`).classList.add('active');
        });

        const tabContent = document.createElement('div');
        tabContent.id = `lager-${id}`;
        tabContent.className = 'tab-content';
        tabContent.innerHTML = `
            <div>
                <label>Anzahl der Wellen</label>
                <input type="number" name="wellen_anzahl" placeholder="0" step="1" value="1" min="0" max="25" required>
                <button class="waves-submit">Übernehmen</button>
            </div>
            <div class="waves-container"></div>
        `;

        tabContent.querySelector('.waves-submit').addEventListener('click', () => {
            const wavesContainer = tabContent.querySelector('.waves-container');
            wavesContainer.innerHTML = ''; // Reset waves container
            const wellenAnzahl = tabContent.querySelector('input[name="wellen_anzahl"]').value;
            for (let i = 1; i <= wellenAnzahl; i++) {
                const waveDiv = document.createElement('div');
                waveDiv.className = 'wave';
                waveDiv.innerHTML = `
                    <h4>Welle ${i}</h4>
                    <select name="general_type_select" id="general-type-select-${id}-${i}">
                        <option value="">General wählen</option>
                    </select>
                    <input type="number" name="skill_garnisonsanbau" placeholder="0" step="5" min="0" max="15" required>
                    <select name="units_type_select" id="units-type-select-${id}-${i}">
                        <option value="">Einheitstype</option>
                        <option value="normal">Kaserne</option>
                        <option value="elite-einheiten">Elite</option>
                    </select>
                    <div id="units-container-${id}-${i}"></div>
                `;
                wavesContainer.appendChild(waveDiv);

                // Dynamisch Generäle laden
                populateGeneralSelector(`general-type-select-${id}-${i}`);
                // Einheitentyp-Event-Listener hinzufügen
                waveDiv.querySelector(`select[name="units_type_select"]`).addEventListener('change', function(event) {
                    const selectedType = event.target.value;
                    populateUnitInputs(`${id}-${i}`, selectedType);
                });
            }
        });

        lagerTabHeaders.appendChild(tabHeader);
        lagerTabContent.appendChild(tabContent);

        // Ersten Tab aktivieren
        if (id === 1) {
            tabHeader.classList.add('active');
            tabContent.classList.add('active');
        }
    }

    // Marker Initialisierung
    const mapContainer = document.getElementById('map-container');
    mapContainer.addEventListener('click', function(event) {
        if (event.target.tagName !== 'IMG') return; // Verhindert das Setzen eines Markers auf einem bestehenden Marker
        const rect = mainMap.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        markerId++;
        const marker = createMarker(x, y, markerId);
        mapContainer.appendChild(marker);
        createLagerTab(markerId);
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
    
    function addLagerToList(id) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = `Lager ${id}`;
        lagerList.appendChild(listItem);
    }

    // Angriffswellen hinzufügen
    const attackWaveContainer = document.createElement('div');
    document.body.appendChild(attackWaveContainer); // Dies sollte später korrekt platziert werden

    function addAttackWave(lagerId) {
        const waveContainer = document.createElement('div');
        waveContainer.className = 'wave-container';

        const generalDropdown = document.createElement('select');
        generalDropdown.className = 'general-selector';

        const unitDropdown = document.createElement('select');
        unitDropdown.className = 'unit-selector';

        loadGenerals().then(generals => {
            generals.forEach(general => {
                const option = document.createElement('option');
                option.value = general.name;
                option.textContent = general.name;
                generalDropdown.appendChild(option);
            });
        });

        loadUnits().then(units => {
            units.forEach(unit => {
                const option = document.createElement('option');
                option.value = unit.name;
                option.textContent = unit.name;
                unitDropdown.appendChild(option);
            });
        });

        waveContainer.appendChild(generalDropdown);
        waveContainer.appendChild(unitDropdown);

        const unitsInput = document.createElement('input');
        unitsInput.type = 'number';
        unitsInput.min = 0;
        unitsInput.placeholder = 'Anzahl der Einheiten';
        waveContainer.appendChild(unitsInput);

        attackWaveContainer.appendChild(waveContainer);

        return {
            lagerId: lagerId,
            general: generalDropdown.value,
            unitType: unitDropdown.value,
            units: unitsInput.value
        };
    }

    document.getElementById('add-wave-button').addEventListener('click', function() {
        const selectedLager = document.getElementById('lager-list').selectedIndex + 1;
        addAttackWave(selectedLager);
    });

    // Karte generieren und herunterladen
    async function generateAndDownloadMap() {
        const selectedMap = mapSelector.options[mapSelector.selectedIndex].text;
        const imgSrc = mapSelector.value;
        const adventureDetails = {
            type: adventureType.textContent,
            level: adventureLevel.textContent,
            players: adventurePlayers.textContent
        };
        
        const attackWaves = Array.from(document.querySelectorAll('.wave-container')).map((wave, index) => {
            const general = wave.querySelector('.general-selector').value;
            const unitType = wave.querySelector('.unit-selector').value;
            const units = wave.querySelector('input[type="number"]').value;
            return {
                lagerId: index + 1,
                general: general,
                unitType: unitType,
                units: units
            };
        });

        const mapHtml = `
            <!DOCTYPE html>
            <html lang="de">
            <head>
                <meta charset="UTF-8">
                <title>Generierte Taktikarte</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .map-container { position: relative; }
                    .map-container img { width: 100%; }
                    .pointer { position: absolute; background: red; color: white; border-radius: 50%; padding: 5px; }
                </style>
            </head>
            <body>
                <h1>${selectedMap}</h1>
                <div class="map-container">
                    <img src="${imgSrc}" alt="${selectedMap}">
                    ${attackWaves.map(wave => `<div class="pointer" style="left: ${wave.x}px; top: ${wave.y}px;">${wave.lagerId}</div>`).join('')}
                </div>
                <h2>Abenteuerdetails</h2>
                <p>${adventureDetails.type}</p>
                <p>${adventureDetails.level}</p>
                <p>${adventureDetails.players}</p>
                <h2>Angriffswellen</h2>
                ${attackWaves.map(wave => `
                    <div>
                        <h3>Lager ${wave.lagerId}</h3>
                        <p>General: ${wave.general}</p>
                        <p>Einheitstyp: ${wave.unitType}</p>
                        <p>Anzahl der Einheiten: ${wave.units}</p>
                    </div>
                `).join('')}
            </body>
            </html>
        `;

        const blob = new Blob([mapHtml], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${selectedMap}_Taktikarte.html`;
        link.click();
    }

    document.getElementById('generate-map').addEventListener('click', generateAndDownloadMap);
});
