import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Station } from 'src/app/Models/Station';
import { StationService } from 'src/app/shared/services/station.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private centroid: L.LatLngExpression = [34.016, 9.016]; // Tunisie
  stations: Station[] = [];

  constructor(private stationService: StationService) {}

  ngOnInit(): void {
    this.initMap();
    this.stationService.getAllStationsCoordinates().subscribe(
      (stations: Station[]) => {
        this.stations = stations;
        console.log('Coordonnées des stations :', this.stations); // Ajouter cette ligne pour afficher les coordonnées dans la console
        this.displayMarkers();
      },
      (error) => {
        console.error('Error retrieving stations:', error);
      }
    );
  }

  displayMarkers(): void {
    this.stations.forEach((station: Station) => {
      const latitude = station.latitude;
      const longitude = station.longitude;
      const popupContent = ` ${station.name}`;
      this.addMarker(latitude, longitude, popupContent);
    });
  }

  addMarker(latitude: number, longitude: number, popupContent: string): void {
    const markerIcon = L.icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      iconRetinaUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const marker = L.marker([latitude, longitude], { icon: markerIcon });
    marker.bindPopup(popupContent);
    marker.addTo(this.map);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 7,
    });
    const osmHotLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France',
      }
    );
    const googleSatelliteLayer = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution:
          'Map data &copy; <a href="https://www.google.com/">Google</a>',
      }
    );

    const cycloSMLayer = L.tileLayer(
      'https://tiles.opencyclemap.org/cycle/{z}/{x}/{y}.png',
      {
        attribution: 'Map data © OpenStreetMap contributors | CycloSM',
      }
    );

    const osmLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }
    );

    const stamenTerrainLayer = L.tileLayer(
      'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
      {
        maxZoom: 18,
        attribution:
          'Map tiles by <a href="https://stamen.com/">Stamen Design</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. Data by <a href="https://openstreetmap.org/">OpenStreetMap</a>, under <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY SA</a>.',
      }
    );

    const baseMaps = {
      'OSM Hot': osmHotLayer,
      OpenStreetMap: osmLayer,
      'Google Satellite': googleSatelliteLayer,
      'Stamen Terrain': stamenTerrainLayer,
    };

    osmHotLayer.addTo(this.map); // Ajouter la couche OpenStreetMap par défaut
    L.control.layers(baseMaps).addTo(this.map);
  }
}
