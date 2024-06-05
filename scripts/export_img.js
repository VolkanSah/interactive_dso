// example not ready!
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let image = new Image();

function loadImage(event) {
    const reader = new FileReader();
    reader.onload = function(event) {
        image.onload = function() {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
        image.src = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

function addText() {
    const text = document.getElementById('text').value;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.font = '20px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText(text, x, y);
}

function exportImage() {
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL();
    link.click();
}

/*

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Editor</title>
    <style>
        #canvas {
            border: 1px solid #000;
        }
        .controls {
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <h1> Editor</h1>
    <canvas id="canvas" width="500" height="500"></canvas>
    <div class="controls">
        <input type="text" id="text" placeholder="Enter text">
        <button onclick="addText()">Add Text</button>
        <button onclick="exportImage()">Export Image</button>
    </div>
    <input type="file" id="upload" accept="image/*" onchange="loadImage(event)">
    <script src="script.js"></script>
</body>
</html>
*/
