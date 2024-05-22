let waves = [];
let selectedGeneral = '';
let selectedTroop = '';
let markerCount = 0;

function createMarker(event) {
    const map = document.getElementById('map');
    const rect = map.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    markerCount++;
    const marker = document.createElement('div');
    marker.className = 'marker';
    marker.style.left = x + 'px';
    marker.style.top = y + 'px';
    marker.id = 'marker' + markerCount;
    marker.dataset.lager = 'Lager ' + markerCount;
    marker.draggable = true;
    marker.ondragstart = drag;
    map.appendChild(marker);

    const controls = document.getElementById('controls');
    controls.innerHTML += `
        <div id="control-${markerCount}">
            <h3>${marker.dataset.lager}</h3>
            <button onclick="addWave(${markerCount})">Welle hinzufügen</button>
            <div id="waves-${markerCount}"></div>
        </div>
    `;
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const marker = document.getElementById(data);
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    marker.style.left = x + 'px';
    marker.style.top = y + 'px';
}

function selectGeneral(general) {
    selectedGeneral = general;
    alert(`Ausgewählter General: ${general}`);
}

function selectTroop(troop) {
    selectedTroop = troop;
    alert(`Ausgewählte Truppe: ${troop}`);
}

function addWave(lagerId) {
    const wavesContainer = document.getElementById('waves-' + lagerId);
    const waveIndex = waves.length + 1;
    waves.push({ lagerId, waveIndex, general: selectedGeneral, troop: selectedTroop });

    wavesContainer.innerHTML += `
        <div>
            <p>Welle ${waveIndex}: General: ${selectedGeneral}, Truppe: ${selectedTroop}</p>
            <button onclick="editWave(${waves.length - 1})">Bearbeiten</button>
        </div>
    `;

    selectedGeneral = '';
    selectedTroop = '';
}

function editWave(index) {
    const wave = waves[index];
    // Implementiere die Logik zur Bearbeitung der Welle
}

function generateCard() {
    let output = '<h2>Generierte Taktikkarte</h2>';
    waves.forEach((wave, index) => {
        output += `<p>Lager ${wave.lagerId}, Welle ${wave.waveIndex}: General: ${wave.general}, Truppe: ${wave.troop}</p>`;
    });

    document.getElementById('output').innerHTML = output;
}

function downloadCard() {
    const element = document.createElement('a');
    const file = new Blob([document.getElementById('output').innerText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'taktikkarte.txt';
    document.body.appendChild(element);
    element.click();
}
