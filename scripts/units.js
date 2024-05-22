fetch('data/generals.json')
    .then(response => response.json())
    .then(data => {
        const generalIcons = document.getElementById('general-icons');
        data.generals.forEach(general => {
            const img = document.createElement('img');
            img.src = general.general_img;
            img.alt = general.name;
            img.onclick = () => selectGeneral(general.name);
            generalIcons.appendChild(img);
        });
    });
