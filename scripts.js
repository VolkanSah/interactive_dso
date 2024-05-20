let waves = [];

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

function addWave() {
    const lager = document.getElementById('lager').value;
    const general = document.getElementById('general').value;
    const truppen = document.getElementById('truppen').value;
    const wellen = document.getElementById('wellen').value;

    waves.push({ lager, general, truppen, wellen });

    document.getElementById('general').value = '';
    document.getElementById('truppen').value = '';
    document.getElementById('wellen').value = '';
}

function generateCard() {
    let output = '<h2>Generierte Taktikkarte</h2>';
    waves.forEach((wave, index) => {
        output += `<p>Lager: ${wave.lager}, General: ${wave.general}, Truppen: ${wave.truppen}, Wellen: ${wave.wellen}</p>`;
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
