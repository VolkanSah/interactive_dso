// generals.js
async function loadGenerals() {
    const response = await fetch('data/generals.json');
    const data = await response.json();
    return data.generals;
}

