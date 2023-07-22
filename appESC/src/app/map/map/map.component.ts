import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Station } from 'src/app/Models/Station';
import { StationService } from 'src/app/shared/services/station.service';
import 'leaflet-routing-machine';
import { Borne } from 'src/app/Models/Borne';
import 'leaflet-control-geocoder';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';
import { Subscription, interval } from 'rxjs';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private centroid: L.LatLngExpression = [34.016, 9.016]; // Tunisie
  stations: Station[] = [];
  private userMarker!: L.Marker;
  private userIcon!: L.Icon;
  searchAddress!: string;
  searchQuery: string = '';
  currentPosition: string = '';
  startLocation!: string;
  endLocation!: string;
  legendModalOpened = false;
  ModalOpened = false;
  id!: string;
  station: Station = new Station();
  updateBadgeSubscription!: Subscription;
  constructor(
    private stationService: StationService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
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
    this.updateBadgeSubscription = interval(1000).subscribe(() => {
      this.getLatestApprovedStations();
    });
  }
  getBorneDetails(id: string) {
    this.router.navigate(['/bornedetails', this.station.id, id]);
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
      console.log(station.id);
      const latitude = station.latitude;
      const longitude = station.longitude;
      const popupContent = ` ${station.name}`;

      if (station.bornes && station.bornes.length > 0) {
        station.bornes.forEach((borne: Borne) => {
          const mode = borne.mode;
          this.addMarker(latitude, longitude, popupContent, mode, station.id);
        });
      } else {
        // Ajouter un marqueur avec un mode par défaut si aucune borne n'est disponible
        const defaultMode = 'DEFAULT';
        this.addMarker(
          latitude,
          longitude,
          popupContent,
          defaultMode,
          station.id
        );
      }
    });
  }

  addMarker(
    latitude: number,
    longitude: number,
    popupContent: string,
    mode: string,
    id: string
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
      this.openModal(id); // Utilisez this.id pour accéder à la propriété de l'instance
    });

    marker.addTo(this.map);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 14,
    });
    this.userIcon = L.icon({
      iconUrl: 'assets/images/Map-Marker.png',
      iconSize: [32, 32], // taille de l'icône en pixels
    });
    const osmHotLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      {
        maxZoom: 7,
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
  searchRoute(): void {
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
  }

  showRoute(startPoint: L.LatLng, endPoint: L.LatLng): void {
    // Hide the user marker
    this.userMarker.remove();

    L.Routing.control({
      waypoints: [
        startPoint, // Point de départ
        endPoint, // Destination
      ],
      routeWhileDragging: true,
    }).addTo(this.map);
  }
  openLegendModal(): void {
    this.legendModalOpened = true;
  }

  openModal(id: string): void {
    this.ModalOpened = true;
    this.getStationDetails(id);
  }
  getStationDetails(id: string) {
    this.stationService.getStationById(id).subscribe(
      (data) => {
        this.station = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  handleAddPlugClick(): void {
    const userData = this.authService.getData();
    if (userData) {
      // Utilisateur connecté, rediriger vers /borne
      window.location.href = '/borne';
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Accès refusé',
        text: 'Vous devez être connecté pour accéder à cette page.',
      }).then((result) => {
        if (result.isConfirmed) {
          // Rediriger vers la page de connexion
          window.location.href = '/login';
        }
      });
    }
  }
  handleSearchClick(): void {
    const userData = this.authService.getData();
    if (userData) {
      // Utilisateur connecté, rediriger vers /borne
      window.location.href = '/searchStation';
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Access denied.',
        text: 'You must be logged in to access this page.',
      }).then((result) => {
        if (result.isConfirmed) {
          // Rediriger vers la page de connexion
          window.location.href = '/login';
        }
      });
    }
  }
  logout(): void {
    // Call the logout method from the authentication service
    this.authService.logoutUser();

    // Additional tasks (optional)
    // Example: Clear local storage or reset user-related variables
    localStorage.clear();
    this.router.navigate(['/']);
    // ...
  }
  ngOnDestroy(): void {
    if (this.updateBadgeSubscription) {
      this.updateBadgeSubscription.unsubscribe();
    }
  }

  getLatestApprovedStations(): void {
    this.stationService.getLatestApprovedStations().subscribe(
      (data: Station[]) => {
        this.stations = data;
      },
      (error) => {
        console.error('Error fetching latest stations:', error);
      }
    );
  }
  getStationsLength(): number {
    return this.stations.length;
  }
}
