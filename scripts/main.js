document.addEventListener('DOMContentLoaded', async function() {
    const mapSelect = document.getElementById('map-select');
    const mapContainer = document.getElementById('map-container');
    const lagerList = document.getElementById('lager-list');

    // Karten aus map_loader.json laden
    const maps = await loadMaps();
    maps.forEach(map => {
        const option = document.createElement('option');
        option.value = map.url;
        option.textContent = map.name;
        mapSelect.appendChild(option);
    });

    mapSelect.addEventListener('change', function() {
        loadMap(this.value);
    });

    async function loadMap(mapUrl) {
        mapContainer.innerHTML = `<img src="${mapUrl}" alt="Karte">`;
        lagerList.innerHTML = '';
    }

    async function loadMaps() {
        const response = await fetch('data/map_loader.json');
        const data = await response.json();
        return data.maps;
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

            const garnisonDropdown = createGarnisonDropdown(generalDropdown.value);
            listItem.appendChild(garnisonDropdown);

            const addWaveButton = document.createElement('button');
            addWaveButton.className = 'btn btn-success btn-sm ml-2';
            addWaveButton.textContent = 'Welle hinzufügen';
            listItem.appendChild(addWaveButton);

            addWaveButton.addEventListener('click', function() {
                const selectedGeneral = generalDropdown.value;
                const selectedUnit = unitDropdown.value;
                const selectedGarnison = garnisonDropdown.value;
                const wave = addAttackWave(id, selectedGeneral, selectedGarnison, 'normal', [selectedUnit]);
                console.log(wave);
                // Hier kannst du die Welle zur Liste der Wellen hinzufügen und die UI entsprechend aktualisieren
            });
        });
    }

    function createGarnisonDropdown(generalName) {
        const select = document.createElement('select');
        select.className = 'form-control';
        const general = generals.find(g => g.name === generalName);
        if (general && general.skills.garnisonsanbau) {
            general.skills.garnisonsanbau.forEach(value => {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = `Garnisonsanbau +${value}`;
                select.appendChild(option);
            });
        }
        return select;
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
function addAttackWave(lagerId, generalName, garnison, unitType, units) {
    const wave = {
        lagerId: lagerId,
        general: generalName,
        garnison: garnison,
        unitType: unitType,
        units: units
    };
    return wave;
}
