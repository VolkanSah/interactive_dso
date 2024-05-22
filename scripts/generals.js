// generals.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('data/generals.json')
        .then(response => response.json())
        .then(data => {
            const generalsContainer = document.getElementById('generals-container');
            data.generals.forEach(general => {
                const generalElement = document.createElement('div');
                generalElement.classList.add('general');
                generalElement.innerHTML = `
                    <img src="${general.general_img}" alt="${general.name}">
                    <h3>${general.name}</h3>
                    <p>Basiseinheiten: ${general.basis_units}</p>
                `;
                generalsContainer.appendChild(generalElement);
            });
        })
        .catch(error => console.error('Error fetching generals:', error));
});
