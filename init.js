const main = document.getElementById("main");

const text = (s, type) => {
  return `<div class="field field_v1">
    <input id="${s}" class="field__input" placeholder=" " type="${type}" autocomplete="off">
    <span class="field__label-wrap" aria-hidden="true">
      <span class="field__label">${type} ${s}</span>
    </span>
  </div>`
}



for (let i = 0; i < 5; i++) {
  const newDiv = document.createElement("div")
  newDiv.innerHTML += text(i+1, "text")
  newDiv.innerHTML += text(i+1, "number")

  main.appendChild(newDiv)
}


