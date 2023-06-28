import './index.css';

declare global {
  interface Window {
    google: any;
  }
}

async function initMap(): Promise<void> {
  // const { Map } = window.google.maps;
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
  let map: google.maps.Map;

  map = new Map(document.getElementById("map") as HTMLElement, {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
    mapId: 'DEMO_MAP_ID',
  });

  // The marker, positioned at Uluru
  const marker1 = new AdvancedMarkerElement({
    map: map,
    position: { lat: -34.397, lng: 150.644 },
    title: 'Uluru'
  });
  const marker2 = new AdvancedMarkerElement({
    map: map,
    position: { lat: -34.397, lng: 150.8 },
    title: 'Uluru'
  });
}

function loadGoogleMapsAPI(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&callback=initMap`;
    script.onerror = () => reject(new Error("Failed to load Google Maps API"));
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
}


loadGoogleMapsAPI()
  .then(() => initMap())
  .catch((error) => console.error(error));
