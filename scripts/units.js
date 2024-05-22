document.addEventListener('DOMContentLoaded', () => {
    fetch('data/units.json')
        .then(response => response.json())
        .then(data => {
            const unitsContainer = document.getElementById('units-container');
            data.units.forEach(unit => {
                const unitElement = document.createElement('div');
                unitElement.classList.add('unit');
                unitElement.innerHTML = `
                    <img src="${unit.unit_img}" alt="${unit.name}">
                    <h3>${unit.name}</h3>
                `;
                unitsContainer.appendChild(unitElement);
            });
        })
        .catch(error => console.error('Error fetching units:', error));
});
