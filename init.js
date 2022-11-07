const main = document.getElementById("main");

const text = (s, type, style, value) => {
  return `<div class="field field_v1" id="${s}">
    <input id="${s}" class="${style?"field__input":"color_picker"}" placeholder=" " type="${type}" autocomplete="off" value="${value}">
    <span class="field__label-wrap" aria-hidden="true">
      <span class="field__label">${style? type: ""} ${style? s: ""}</span>
    </span>
  </div>`
}

let data = [
	["a", 100],
  ["b", 100],
  ["c", 100],
  ["d", 100],
  ["e", 100],
]
/*
let data = [
	["a", 100, "#1E3888"],
  ["b", 100, "#E01A4F"],
  ["c", 100, "#53B3CB"],
  ["d", 100, "#93B5C6"],
  ["e", 100, "#FF8C42"],
]
*/

const colors = {
  0: "#1E3888",
  1: "#E01A4F",
  2: "#53B3CB",
  3: "#93B5C6",
  4: "#FF8C42",
  5: "#688E26"
}

let info = JSON.parse(localStorage.getItem("data"))
info = info? info: data;
let i = 0
while (i < (info.length>5?info.length:5)) {
  addRow(i, info[i])
  i++
}

function addRow(i, data) {
  const newDiv = document.createElement(`div`)
  newDiv.setAttribute("id", `box${i}`)
  newDiv.innerHTML += text(i, "text", true, data[0])
  newDiv.innerHTML += text(i, "number", true, data[1])
  newDiv.innerHTML += text(i, "color", false, data[2])

  main.appendChild(newDiv)
}