document.addEventListener('DOMContentLoaded', function() {
    const pointerArea = document.getElementById('pointerArea');
    const demoLagerList = document.getElementById('demoLagerList');
    
    // Sample data for generals loaded from a JSON file
    const generals = [
        "General 1",
        "General 2",
        "General 3"
    ];

    // Function to create a pointer and list entry
    pointerArea.addEventListener('click', function(event) {
        // Create a pointer
        const pointer = document.createElement('div');
        pointer.className = 'pointer';
        pointer.style.left = `${event.clientX}px`;
        pointer.style.top = `${event.clientY}px`;
        pointerArea.appendChild(pointer);

        // Create a list entry
        const listItem = document.createElement('li');
        listItem.textContent = `Pointer at (${event.clientX}, ${event.clientY})`;
        listItem.className = 'demo_lager';
        demoLagerList.appendChild(listItem);

        // Add click event to the list item
        listItem.addEventListener('click', function() {
            showOptions(listItem);
        });
    });

    // Function to show options
    function showOptions(listItem) {
        // Create the container for the options
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'optionsContainer';

        // Create the General selection
        const generalSelect = document.createElement('select');
        generals.forEach(general => {
            const option = document.createElement('option');
            option.value = general;
            option.textContent = general;
            generalSelect.appendChild(option);
        });
        optionsContainer.appendChild(generalSelect);

        // Create the Garnisonsaufbau selection
        const garnisonSelect = document.createElement('select');
        [0, 5, 10, 15].forEach(num => {
            const option = document.createElement('option');
            option.value = num;
            option.textContent = num;
            garnisonSelect.appendChild(option);
        });
        optionsContainer.appendChild(garnisonSelect);

        // Create the Einheitstypen selector
        const einheitstypenSelect = document.createElement('select');
        const einheitstypenOptions = ["1 Kaserne", "2 Elite"];
        einheitstypenOptions.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            einheitstypenSelect.appendChild(option);
        });
        optionsContainer.appendChild(einheitstypenSelect);

        // Append the options container to the list item
        listItem.appendChild(optionsContainer);
    }
});
