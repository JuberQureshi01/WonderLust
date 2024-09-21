
mapboxgl.accessToken=mapToken;
const map = new mapboxgl.Map({
    container: "map", // container ID
    style:"mapbox://styles/mapbox/streets-v12",
    center: listings.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 8 // starting zoom
});

const marker = new mapboxgl.Marker({color:'red'})
        .setLngLat(listings.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({offset: 25})
        .setHTML(`<h5>${listings.title}</h5><p>Exact location provided after booking</p>`))
        .addTo(map);