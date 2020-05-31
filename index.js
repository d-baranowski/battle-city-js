const canvas = document.getElementById("canvas")
canvas.height = 640;
canvas.width = 640;

const ctx = canvas.getContext("2d");
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke();