const canvas = document.getElementById("graph");
let ctx = canvas.getContext("2d")

H = canvas.height = innerHeight;
W = canvas.width = innerWidth;

const data = [
	["a", 100],
  ["b", 100],
  ["c", 100],
  ["d", 100],
  ["e", 100],
]

const colors = {
  0: "#f00",
  1: "#0f0",
  2: "#00f",
  3: "#ff0",
  4: "#f0f",
  5: "#0ff"
}

let total = 0;
data.forEach(x => total += x[1])

const r = 200
const margin = 10
const time = 60
const cw = false

function animate() {
  ctx.clearRect(0, 0, W, H)
  ctx.save()


  let a = 0
  ctx.translate(r+margin, r+margin)

  let curr = 0
  data.forEach((x, i) => {
    ctx.fillStyle = colors[i] ? colors[i]: `hsl(${Math.floor(Math.random()*360)}, 100, 50)`;

    let arc = (x[1]/total)* 2*Math.PI
    ctx.beginPath()
    ctx.arc(0, 0, r, a, arc, cw)
    ctx.lineTo(0, 0)
    ctx.fill()
    ctx.closePath()
    a += arc
  })

  ctx.restore()
  curr ++
  
  requestAnimationFrame(animate)
} animate()
