const canvas = document.getElementById("graph");
let ctx = canvas.getContext("2d")

H = canvas.height = innerHeight;
W = canvas.width = innerWidth;

const bgc = "darkturquoise"

const data = [
	["a", 100],
  ["b", 100],
  ["c", 100],
  ["d", 100],
  ["e", 100],
]

const colors = {
  0: "#1E3888",
  1: "#E01A4F",
  2: "#53B3CB",
  3: "#93B5C6",
  4: "#FF8C42",
  5: "#688E26"
}

let total = 0;
data.map((x,i) => {
  total += x[1]
  const color = colors[i] ? 
    colors[i]: `hsl(${Math.floor(Math.random()*360)}, 100%, 50%)`
  x.push(color);
  return x
})

const r = 200
const margin = 10
const time = 45
let curr = 0
const cw = false

function animate() {
  ctx.clearRect(0, 0, W, H)
  ctx.save()

  ctx.translate(r+margin, r+margin)
  ctx.rotate(-90 * Math.PI/180)

  allTogether()

  doughnut()
  ctx.restore()

  if (curr <= time) {
    curr+=0.5
  }
  
  requestAnimationFrame(animate)
} animate()

document.addEventListener("keydown", handleKeyDown, false)

function handleKeyDown(e) {
  if (e.key == "ArrowRight") {
    animate()
  }
}



function easeOut(x) {
  return 1 - Math.pow(1 - x, 3);
}

function easeInOut(x) {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

function allTogether() {
  let a = 0

  data.forEach(x => {  
    ctx.fillStyle = x[2];
    ctx.lineWidth = 5
    let change = easeInOut(curr/(time))
    let arc = (x[1]/total)* change * 2*Math.PI
    ctx.rotate(a)
    ctx.beginPath()
    ctx.arc(0, 0, r, 0, arc, cw)
    ctx.stroke()
    ctx.lineTo(0, 0)
    ctx.fill()
    ctx.rotate(-a)
    ctx.closePath()
    a += arc
  })

}


function doughnut() {
  ctx.save()
  ctx.lineWidth = 1
  ctx.fillStyle = bgc
  ctx.beginPath()
  ctx.arc(0, 0, r/2.5, 0, Math.PI*2, false)
  ctx.fill()
  ctx.closePath()
  ctx.restore()
}