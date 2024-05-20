let currentLagerId = 0;
let markers = [];
let waves = [];

function addMarker(event) {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const marker = document.createElement('div');
    marker.classList.add('marker');
    marker.style.left = x + 'px';
    marker.style.top = y + 'px';
    marker.id = `marker${currentLagerId}`;
    marker.dataset.lager = `Lager ${currentLagerId}`;
    marker.draggable = true;
    marker.ondragstart = drag;
    marker.onclick = function() {
        selectLager(marker.dataset.lager, currentLagerId);
    };
    document.getElementById('map').appendChild(marker);

    addLagerInputs(currentLagerId, `Lager ${currentLagerId}`);

    markers.push(marker);
    currentLagerId++;
}

function selectLager(lagerName, lagerId) {
    const selectedLager = document.getElementById(`lager${lagerId}`);
    selectedLager.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('selectedLager').textContent = `Ausgewähltes Lager: ${lagerName}`;
}

function addLagerInputs(lagerId, lagerName) {
    const container = document.getElementById('lagerContainer');

    const lagerDiv = document.createElement('div');
    lagerDiv.classList.add('wave-inputs');
    lagerDiv.id = `lager${lagerId}`;

    const lagerLabel = document.createElement('h4');
    lagerLabel.textContent = lagerName;

    const generalSelect = document.createElement('select');
    generalSelect.classList.add('form-control');
    generalSelect.innerHTML = `
        <option value="General 1">General 1</option>
        <option value="General 2">General 2</option>
        <!-- Weitere Generäle -->
    `;

    const troopSelect = document.createElement('select');
    troopSelect.classList.add('form-control');
    troopSelect.innerHTML = `
        <option value="Truppe 1">Truppe 1</option>
        <option value="Truppe 2">Truppe 2</option>
        <!-- Weitere Truppen -->
    `;

    const truppenInput = document.createElement('input');
    truppenInput.type = 'number';
    truppenInput.classList.add('form-control');
    truppenInput.placeholder = 'Truppenanzahl';

    const wellenInput = document.createElement('input');
    wellenInput.type = 'number';
    wellenInput.classList.add('form-control');
    wellenInput.placeholder = 'Anzahl der Wellen';

    const addWaveButton = document.createElement('button');
    addWaveButton.classList.add('btn', 'btn-primary');
    addWaveButton.innerHTML = '<i class="fas fa-plus"></i> Welle hinzufügen';
    addWaveButton.onclick = function() {
        addWave(lagerId, generalSelect.value, troopSelect.value, truppenInput.value, wellenInput.value);
    };

    lagerDiv.appendChild(lagerLabel);
    lagerDiv.appendChild(generalSelect);
    lagerDiv.appendChild(troopSelect);
    lagerDiv.appendChild(truppenInput);
    lagerDiv.appendChild(wellenInput);
    lagerDiv.appendChild(addWaveButton);

    container.appendChild(lagerDiv);
}

function addWave(lagerId, general, troop, truppen, wellen) {
    const wave = { lagerId, general, troop, truppen, wellen };
    waves.push(wave);

    const waveInfo = document.createElement('p');
    waveInfo.textContent = `Lager: ${lagerId}, General: ${general}, Truppe: ${troop}, Truppenanzahl: ${truppen}, Wellen: ${wellen}`;
    document.getElementById(`lager${lagerId}`).appendChild(waveInfo);
}

function generateCard() {
    let output = '<h2>Generierte Taktikkarte</h2>';
    waves.forEach((wave, index) => {
        output += `<p>Lager: ${wave.lagerId}, General: ${wave.general}, Truppe: ${wave.troop}, Truppen: ${wave.truppen}, Wellen: ${wave.wellen}</p>`;
    });

    document.getElementById('output').innerHTML = output;
}

function downloadCard() {
    const element = document.createElement('a');
    const file = new Blob([document.getElementById('output').innerHTML], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'taktikkarte.html';
    document.body.appendChild(element);
    element.click();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}
