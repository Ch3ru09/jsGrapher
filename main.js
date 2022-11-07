const canvas = document.getElementById("graph");
let ctx = canvas.getContext("2d")

const W = canvas.height = canvas.width = innerHeight*.5;

const ta = document.getElementsByTagName("textarea")[0]
ta.rows = W/16;
ta.cols = W/8;

const margin = 10
const r = W/2-margin
const time = 45
let curr = 0
const cw = false

setupData()

function animate() {
  ctx.clearRect(0, 0, W, W)
  ctx.save()

  ctx.translate(r+margin, r+margin)
  ctx.rotate(-90 * Math.PI/180)

  allTogether()

  doughnut()
  ctx.restore()

  if (curr <= time) {
    curr+=0.5
    requestAnimationFrame(animate)
    return
  }

  cancelAnimationFrame(animate)
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
  ctx.save();
  ctx.lineWidth = 1;
  ctx.globalCompositeOperation = 'destination-out'
  ctx.beginPath()
  ctx.arc(0, 0, r/2.5, 0, Math.PI*2, false)
  ctx.fill()
  ctx.closePath()
  ctx.restore()
}

function setupData() {
  total = 0
  const texts = document.querySelectorAll("input[type='text']")
  const numbers = document.querySelectorAll("input[type='number']")
  const colors = document.querySelectorAll("input[type='color']")
  const res = []

  for (let i = 0; i < texts.length; i++) {
    res.push([texts[i].value, Number(numbers[i].value), colors[i].value])
  }
  res.forEach(x => total += x[1])
  res.sort((a, b) => a[1]<b[1]?1:-1)
  localStorage.setItem("data", JSON.stringify(res))
  data = res

  ta.innerHTML = getText(JSON.stringify(data))

  animate()
}


const button = document.getElementById("submit");
button.onclick = () => {
  curr = 0
  setupData()
}

function ranColor() {
  return `#${ranVal()}${ranVal()}${ranVal()}`
}

function ranVal() {
  let res = Math.floor(Math.random()*255)
  if (res <= 16) {
    res += 16;
  }
  return res.toString(16)
}

const empty = ['[name]', 100, ranColor()]
const add = document.getElementById("add")
add.onclick = () => {
  empty[2] = ranColor()
  addRow(++i, empty)
}

const re = document.getElementById("remove")
re.onclick = () => {
  remove()
}

function remove() {
  const el = document.querySelectorAll("input[type='text']")
  const id = el[el.length-1].id
  const div = document.querySelector(`div[id="box${id}"]`)
  div.remove()
}

function getText(data) {
  const script = `
    setupData()

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
        requestAnimationFrame(animate)
        return
      }

      cancelAnimationFrame(animate)
    }

    function allTogether() {
      let a = 0

      data.forEach(x => {  
        ctx.fillStyle = x[2];
        ctx.lineWidth = 5
        let change = easeInOut(curr/(time))
        let arc = (x[1]/total)* change * 2*Math.PI
        ctx.rotate(a * (cw?-1:1))
        ctx.beginPath()
        ctx.arc(0, 0, r, 0, arc * (cw?-1:1), cw)
        ctx.stroke()
        ctx.lineTo(0, 0)
        ctx.fill()
        ctx.rotate(-a * (cw?-1:1))
        ctx.closePath()
        a += arc
      })

    }

    function doughnut() {
      ctx.save();
      ctx.lineWidth = 1;
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.arc(0, 0, r/2.5, 0, Math.PI*2, false)
      ctx.fill()
      ctx.closePath()
      ctx.restore()
    }

    function setupData() {
      total = 0
      data.forEach(x => total += x[1])
      data.sort((a, b) => a[1]<(sort*b[1])?1:-1)

      animate()
    }

    function easeInOut(x) {
      return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
    }
  `

  return (`
    <body>
      <canvas id="canvas"></canvas>
      <script>
        const canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");

        const W = canvas.width = innerWidth;
        const H = canvas.height = innerHeight

        const margin = 10
        const r = Math.min(H, W)/2-margin
        const time = 45
        let curr = 0
        let cw = false;
        let sort = 1;

        const data = ${data}

        ${script}
      </script>
    </body>
  `)
}