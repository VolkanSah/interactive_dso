document.addEventListener('DOMContentLoaded', async function() {
    const mapSelector = document.getElementById('map-selector');
    const mainMap = document.getElementById('main-map');
    const adventureType = document.getElementById('adventure-type');
    const adventureLevel = document.getElementById('adventure-level');
    const adventurePlayers = document.getElementById('adventure-players');

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

    // Bestehende Funktionen und Kommentare bleiben hier erhalten
    const generalSelector = document.createElement('select');
    const unitSelector = document.createElement('select');
    document.body.appendChild(generalSelector); // Dies sollte später korrekt platziert werden
    document.body.appendChild(unitSelector); // Dies sollte später korrekt platziert werden

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
    async function populateGeneralSelector() {
        const generals = await loadGenerals();
        generals.forEach(general => {
            const option = document.createElement('option');
            option.value = general.name;
            option.textContent = general.name;
            generalSelector.appendChild(option);
        });
    }

    // Dropdown mit Einheiten füllen
    async function populateUnitSelector() {
        const units = await loadUnits();
        units.forEach(unit => {
            const option = document.createElement('option');
            option.value = unit.name;
            option.textContent = unit.name;
            unitSelector.appendChild(option);
        });
    }

    // Initialisieren
    await populateGeneralSelector();
    await populateUnitSelector();

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
                        <p>Einheitentyp: ${wave.unitType}</p>
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
