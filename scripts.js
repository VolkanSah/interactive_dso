let waves = [];
let currentLagerId = 0;

document.querySelectorAll('.marker').forEach(marker => {
    marker.addEventListener('click', function() {
        document.getElementById('lager').value = this.dataset.lager;
    });
});

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
    marker.style.left = x + "px";
    marker.style.top = y + "px";
}

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
        document.getElementById('lager').value = marker.dataset.lager;
    };
    document.getElementById('map').appendChild(marker);
    addLagerOption(`Lager ${currentLagerId}`);
    currentLagerId++;
}

function addLagerOption(lager) {
    const option = document.createElement('option');
    option.value = lager;
    option.text = lager;
    document.getElementById('lager').appendChild(option);
}

function addWaveInputs() {
    const lager = document.getElementById('lager').value;
    const container = document.getElementById('waveInputsContainer');

    const waveDiv = document.createElement('div');
    waveDiv.classList.add('wave-inputs');

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

    waveDiv.innerHTML = `<h4>${lager}</h4>`;
    waveDiv.appendChild(generalSelect);
    waveDiv.appendChild(troopSelect);
    waveDiv.appendChild(truppenInput);
    waveDiv.appendChild(wellenInput);

    container.appendChild(waveDiv);
}

function generateCard() {
    const container = document.getElementById('waveInputsContainer');
    const waveInputs = container.getElementsByClassName('wave-inputs');
    waves = [];
    for (const waveInput of waveInputs) {
        const lager = waveInput.getElementsByTagName('h4')[0].innerText;
        const general = waveInput.getElementsByTagName('select')[0].value;
        const truppen = waveInput.getElementsByTagName('input')[0].value;
        const wellen = waveInput.getElementsByTagName('input')[1].value;
        const troop = waveInput.getElementsByTagName('select')[1].value;
        waves.push({ lager, general, truppen, wellen, troop });
    }

    let output = '<h2>Generierte Taktikkarte</h2>';
    waves.forEach((wave, index) => {
        output += `<p>Lager: ${wave.lager}, General: ${wave.general}, Truppen: ${wave.truppen}, Wellen: ${wave.wellen}, Truppe: ${wave.troop}</p>`;
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
