// main.js
document.addEventListener('DOMContentLoaded', async function() {
    const mapSelect = document.getElementById('map-select');
    const mapContainer = document.getElementById('map-container');
    const lagerList = document.getElementById('lager-list');

    // Karten im Ordner /assets/maps/ dynamisch laden wird geändert!
    const maps = ['heimatinsel.png', 'rauberband.png']; // Diese Liste kann durch eine API oder eine JSON-Datei ersetzt werden --->>>!important! ändern datei erstellt! 
    // data/map_loader.json für Dateipfad der Taktikarten "at_loader_name" = name des Abenteuers  "at_img" url der Taktikarte (bild)
    // data/maps.json für Abenteuer informationen        
    // "Abenteuer": "Der Kornzwist", 
   //     "Zuordnung": "Szenario", 
     //   "Level": 1, 
     //   "Spieler-Min": 1, 
      //  "Spieler-Max": 1
    maps.forEach(map => {
        const option = document.createElement('option');
        option.value = map;
        option.textContent = map.replace('.png', '').replace('_', ' ');
        mapSelect.appendChild(option);
    });

    mapSelect.addEventListener('change', function() {
        loadMap(this.value);
    });

    async function loadMap(mapName) {
        mapContainer.innerHTML = `<img src="assets/maps/${mapName}" alt="${mapName}">`;
        lagerList.innerHTML = '';
    }

    const generals = await loadGenerals();
    const units = await loadUnits();

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

    mapContainer.addEventListener('click', function(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        const id = lagerList.children.length + 1;
        const marker = addMarker(mapContainer, x, y, id);
        addLagerToList(id);
    });

    function addLagerToList(id) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = `Lager ${id}`;
        lagerList.appendChild(listItem);

        const waveButton = document.createElement('button');
        waveButton.className = 'btn btn-primary btn-sm ml-2';
        waveButton.textContent = 'Wellen';
        listItem.appendChild(waveButton);

        waveButton.addEventListener('click', function() {
            const generalDropdown = createGeneralDropdown();
            listItem.appendChild(generalDropdown);

            const unitDropdown = createUnitDropdown('normal');
            listItem.appendChild(unitDropdown);

            const addWaveButton = document.createElement('button');
            addWaveButton.className = 'btn btn-success btn-sm ml-2';
            addWaveButton.textContent = 'Welle hinzufügen';
            listItem.appendChild(addWaveButton);

            addWaveButton.addEventListener('click', function() {
                const selectedGeneral = generalDropdown.value;
                const selectedUnit = unitDropdown.value;
                const wave = addAttackWave(id, selectedGeneral, 'normal', [selectedUnit]);
                console.log(wave);
                // Hier kannst du die Welle zur Liste der Wellen hinzufügen und die UI entsprechend aktualisieren
            });
        });
    }
});

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

function addMarker(mapContainer, x, y, id) {
    const marker = document.createElement('div');
    marker.className = 'pointer';
    marker.style.left = `${x}px`;
    marker.style.top = `${y}px`;
    marker.textContent = id;
    mapContainer.appendChild(marker);

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

// attack_waves.js
function addAttackWave(lagerId, generalName, unitType, units) {
    const wave = {
        lagerId: lagerId,
        general: generalName,
        unitType: unitType,
        units: units
    };
    return wave;
}
