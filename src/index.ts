import './index.css';

declare global {
  interface Window {
    google: any;
  }
}

async function initMap(): Promise<void> {
  const { Map } = window.google.maps;
  let map: google.maps.Map;

  map = new Map(document.getElementById("map") as HTMLElement, {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
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
