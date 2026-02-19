


let marker;

const key = '4Lx1l8uazgWsPkJ57GIT';

// Inicializar o mapa (Leaflet)
const map = L.map('map').setView([0, 0], 0);

L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`, {
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 1,
    attribution: '&copy; MapTiler &copy; OpenStreetMap contributors',
    crossOrigin: true
}).addTo(map);

// Adicionar o Geocoding
const locationFind = L.control.maptilerGeocoding({
    apiKey: key,
    position: "topright",
    collapsed: true,
    marker: false
}).addTo(map);

// --- 1. CAPTURAR DADOS DA PESQUISA ---
map.on('geocoding:confirm', (e) => {
    const feature = e.feature;
    const lon = feature.geometry.coordinates[0];
    const lat = feature.geometry.coordinates[1];
    const nome = feature.place_name;

    // Atualiza o HTML para teres a certeza que os dados chegaram
    const infoBox = document.getElementById('info');
    if (infoBox) {
        infoBox.innerHTML = `<strong>Pesquisa:</strong> ${nome} <br> 
                             <strong>Lat:</strong> ${lat} | <strong>Lon:</strong> ${lon}`;
    }

});
// --- 2. CAPTURAR MOVIMENTO DO MOUSE (SINTAXE LEAFLET) ---
map.on('click', function (e) {

    const coords = e.latlng;

    if (marker) {
        marker.setLatLng([coords.lat.toFixed(5), coords.lng.toFixed(5)]);
    }
    else {
        marker = L.marker([coords.lat.toFixed(5), coords.lng.toFixed(5)]).addTo(map);
    }


    document.getElementById('info').innerHTML = `Latitude: ${coords.lat.toFixed(5)} | Longitude: ${coords.lng.toFixed(5)}`;

    let latform = document.getElementById("latform");
    let lngform = document.getElementById("lngform");

    latform.value = coords.lat.toFixed(5);
    lngform.value = coords.lng.toFixed(5);

    const btn = document.getElementById("submitForm");

    btn.classList.remove("bloqueado")

    btn.innerHTML = "Enviar";
});