import { Component, OnInit } from '@angular/core';
import { Station } from '../Models/Station';
import { StationService } from '../shared/services/station.service';
import { Borne } from '../Models/Borne';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-affiche-search',
  templateUrl: './affiche-search.component.html',
  styleUrls: ['./affiche-search.component.scss'],
})
export class AfficheSearchComponent implements OnInit {
  stations: Station[] = [];
  id!: string;
  borne: Borne = new Borne();
  private map!: L.Map;
  private centroid: L.LatLngExpression = [34.016, 9.016]; // Tunisie

  private userMarker!: L.Marker;
  private userIcon!: L.Icon;
  searchAddress!: string;
  searchQuery: string = '';
  currentPosition: string = '';
  startLocation!: string;
  endLocation!: string;
  legendModalOpened = false;
  ModalOpened = false;
  puissance!: number;
  mode!: string;
  connecteur!: string;
  startPoint: L.LatLng | undefined;
  endPoint: L.LatLng | undefined;
  startendData: any;
  constructor(
    private stationService: StationService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
    } else {
      console.error(
        "La géolocalisation n'est pas prise en charge par ce navigateur."
      );
    }
  }

  ngOnInit(): void {
    this.stations = history.state.stations;
    this.startendData = history.state.startendData;

    this.initMap();

    this.stationService.getAllStationsCoordinates().subscribe(
      (stations: Station[]) => {
        // Appeler la fonction searchStations() et passer les stations filtrées

        this.displayMarkers();
      },
      (error) => {
        console.error('Error retrieving stations:', error);
      }
    );
    this.startPoint = L.latLng(this.startendData.sLat, this.startendData.sLng);
    this.endPoint = L.latLng(this.startendData.eLat, this.startendData.eLng);

    console.log('Start Point:', this.startPoint);
    console.log('End Point:', this.endPoint);
    this.showRoute(this.startPoint, this.endPoint);
  }

  getStationDetails(id: string) {
    this.router.navigate(['Station-details', id]);
  }
  logout(): void {
    // Call the logout method from the authentication service
    this.authService.logoutUser();
  }

  showPosition(position: GeolocationPosition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Créer un marqueur pour la position de l'utilisateur
    this.userMarker = L.marker([latitude, longitude], {
      icon: this.userIcon,
      draggable: true, // Rendre le marqueur déplaçable
    }).addTo(this.map);

    // Mettre à jour la position du marqueur lorsque déplacé
    this.userMarker.on('dragend', (event) => {
      const marker = event.target;
      const markerPosition = marker.getLatLng();
      console.log('New Latitude:', markerPosition.lat);
      console.log('New Longitude:', markerPosition.lng);

      // Utilisez les nouvelles coordonnées pour effectuer une action
      // ou mettre à jour la carte en conséquence
      this.reverseGeocode(markerPosition.lat, markerPosition.lng);
    });

    // Utiliser les coordonnées pour centrer la carte sur la position de l'utilisateur
    this.map.setView([latitude, longitude], 12);

    // Utiliser les coordonnées pour rechercher une destination
    this.reverseGeocode(latitude, longitude);
  }

  reverseGeocode(latitude: number, longitude: number) {
    const geocodingUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    fetch(geocodingUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.address) {
          const destinationAddress = data.display_name;
          console.log('Destination Address:', destinationAddress);

          // Mettre à jour la variable currentPosition avec le nom de la place
          this.currentPosition = destinationAddress;

          // Faites quelque chose avec l'adresse de destination
        }
      })
      .catch((error) => {
        console.log('Geocoding failed due to: ' + error);
      });
  }

  displayMarkers(): void {
    this.stations.forEach((station: Station) => {
      const latitude = station.latitude;
      const longitude = station.longitude;
      const popupContent = ` ${station.name}`;

      if (station.bornes && station.bornes.length > 0) {
        station.bornes.forEach((borne: Borne) => {
          const mode = borne.mode;

          // Effectuer le filtrage des stations ici
          if (this.checkStationFilter(station)) {
            this.addMarker(latitude, longitude, popupContent, mode);
          }
        });
      } else {
        // Ajouter un marqueur avec un mode par défaut si aucune borne n'est disponible
        const defaultMode = 'DEFAULT';

        // Effectuer le filtrage des stations ici
        if (this.checkStationFilter(station)) {
          this.addMarker(latitude, longitude, popupContent, defaultMode);
        }
      }
    });
  }
  checkStationFilter(station: Station): boolean {
    // Vérifier les critères de recherche et retourner true si la station passe le filtrage, sinon false
    if (this.puissance && this.borne.puissance !== this.puissance) {
      return false; // Si la puissance ne correspond pas, la station est filtrée
    }
    if (
      this.mode &&
      !station.bornes.some((borne) => borne.mode === this.mode)
    ) {
      return false; // Si aucun mode ne correspond, la station est filtrée
    }
    if (
      this.connecteur &&
      !station.bornes.some((borne) => borne.connecteur === this.connecteur)
    ) {
      return false; // Si aucun connecteur ne correspond, la station est filtrée
    }

    // Si la station passe tous les critères de filtrage, elle est affichée
    return true;
  }
  addMarker(
    latitude: number,
    longitude: number,
    popupContent: string,
    mode: string
  ): void {
    let markerIconUrl = '';

    if (mode == 'FAST') {
      markerIconUrl =
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';
    } else if (mode == 'SLOW') {
      markerIconUrl =
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png';
    } else {
      markerIconUrl =
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';
    }

    const markerIcon = L.icon({
      iconUrl: markerIconUrl,
      iconRetinaUrl: markerIconUrl,
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const marker = L.marker([latitude, longitude], { icon: markerIcon });
    marker.bindPopup(popupContent);
    marker.on('click', () => {
      this.openModal(); // Utilisez this.id pour accéder à la propriété de l'instance
      this.getStationDetails(this.id);
    });

    marker.addTo(this.map);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 4,
    });
    this.userIcon = L.icon({
      iconUrl: 'assets/images/Map-Marker.png',
      iconSize: [32, 32], // taille de l'icône en pixels
    });
    const osmHotLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      {
        minZoom: 7,
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
  /* searchRoute(): void {
    if (this.startLocation.trim() !== '' && this.endLocation.trim() !== '') {
      const startSearchUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        this.startLocation
      )}&format=json&addressdetails=1&limit=1`;

      const endSearchUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        this.endLocation
      )}&format=json&addressdetails=1&limit=1`;

      Promise.all([fetch(startSearchUrl), fetch(endSearchUrl)])
        .then((responses) => Promise.all(responses.map((res) => res.json())))
        .then((data) => {
          const startData = data[0];
          const endData = data[1];

          if (startData.length > 0 && endData.length > 0) {
            const startResult = startData[0];
            const endResult = endData[0];

            const startLatitude = parseFloat(startResult.lat);
            const startLongitude = parseFloat(startResult.lon);
            const endLatitude = parseFloat(endResult.lat);
            const endLongitude = parseFloat(endResult.lon);

            const startPoint = L.latLng(startLatitude, startLongitude);
            const endPoint = L.latLng(endLatitude, endLongitude);

            this.showRoute(startPoint, endPoint);
          } else {
            console.log(
              'Aucun résultat trouvé pour le point de départ ou la destination.'
            );
          }
        })
        .catch((error) => console.error(error));
    }
  }*/

  showRoute(startPoint: L.LatLng, endPoint: L.LatLng): void {
    console.log('Show Route - Start Point:', startPoint);
    console.log('Show Route - End Point:', endPoint);

    const waypoints = [
      startPoint, // Starting point
      endPoint, // Destination
    ];

    L.Routing.control({
      waypoints: waypoints,
      routeWhileDragging: true,
    })
      .on('routesfound', (e: any) => {
        console.log('Routes Found:', e);
      })

      .addTo(this.map);
  }
  openLegendModal(): void {
    this.legendModalOpened = true;
  }

  openModal(): void {
    this.ModalOpened = true;
  }
}
