let waves = [];
let selectedGeneral = '';
let selectedTroop = '';

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

function selectGeneral(general) {
    selectedGeneral = general;
    alert(`Ausgewählter General: ${general}`);
}

function selectTroop(troop) {
    selectedTroop = troop;
    alert(`Ausgewählte Truppe: ${troop}`);
}

function addWave() {
    const lager = document.getElementById('lager').value;
    const truppen = document.getElementById('truppen').value;
    const wellen = document.getElementById('wellen').value;

    waves.push({ lager, general: selectedGeneral, truppen, wellen, troop: selectedTroop });

    document.getElementById('truppen').value = '';
    document.getElementById('wellen').value = '';
    selectedGeneral = '';
    selectedTroop = '';
}

function generateCard() {
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
