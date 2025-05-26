const inaltimeInput = document.getElementById("inaltime");
const latimeInput = document.getElementById("latime");
const doorDiv = document.getElementById("door");

function actualizeazaUsa() {
  const inaltime = parseInt(inaltimeInput.value);
  const latime = parseInt(latimeInput.value);

  if (!isNaN(inaltime) && !isNaN(latime)) {
    const scalaInaltime = inaltime / 5;
    const scalaLatime = latime / 5;

    doorDiv.style.height = scalaInaltime + "px";
    doorDiv.style.width = scalaLatime + "px";
  }
}

inaltimeInput.addEventListener("input", actualizeazaUsa);
latimeInput.addEventListener("input", actualizeazaUsa);