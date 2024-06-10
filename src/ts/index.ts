import * as L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import "leaflet/dist/leaflet.css";
// @ts-ignore
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
// @ts-ignore
import markerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
// @ts-ignore
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

const dataUrl = "https://trains-data.loseq.fr/";

const tooltip = document.getElementById("tooltip")
document.getElementById("close_tooltip")?.addEventListener("click", () => {
    if (tooltip) {
        tooltip.style.display = "none"
    }
});

const popup = document.getElementById("popup_bg")
document.getElementById("close_popup")?.addEventListener("click", () => {
    if (popup) {
        popup.style.display = "none"
    }
});

(async () => {
    const Intercites = JSON.parse(await (await fetch(dataUrl + "intercites.json")).text())
    const Ter = JSON.parse(await (await fetch(dataUrl + "terStops.json")).text())
    const TerLines = JSON.parse(await (await fetch(dataUrl + "terRoutesStopsGeo.json")).text())
    const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })


    const intercitesLayer = L.geoJSON(Intercites.features, {
        style: (f) => {
            return { color: "#e74c3c" }
        },
        onEachFeature(feature, layer) {
            layer.bindPopup(`Gare Intercités de ${feature.properties.name}`)
        },
    })
    const terLayer = L.geoJSON(Ter, {
        style: (f) => {
            return { color: "#e74c3c" }
        },
        onEachFeature(feature, layer) {
            layer.bindPopup(`Gare TER de ${feature.properties.name}`)
        },
    })
    const terLinesLayer = L.geoJSON(TerLines, {
        onEachFeature(feature, layer) {
            layer.bindTooltip(feature.properties.name)
        },
    })

    const map = L.map('map', {
        center: [46.225, 0.132],
        zoom: 6,
        layers: [osmLayer, intercitesLayer, L.markerClusterGroup().addLayer(terLayer)]
    });


    L.Icon.Default.prototype.options.iconUrl = markerIconUrl;
    L.Icon.Default.prototype.options.iconRetinaUrl = markerIconRetinaUrl;
    L.Icon.Default.prototype.options.shadowUrl = markerShadowUrl;
    L.Icon.Default.imagePath = "";
    const layerControl = L.control.layers({
        "OSM": osmLayer
    }, {
        "Intercités": intercitesLayer,
        "Lignes TER": terLinesLayer,
        "TER": L.markerClusterGroup().addLayer(terLayer)
    }).addTo(map);

})()
