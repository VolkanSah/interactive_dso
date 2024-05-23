// units.js
async function loadUnits() {
    const response = await fetch('data/units.json');
    const data = await response.json();
    return data.units;
}
