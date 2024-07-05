import { Component } from '@angular/core';
var currentLat = 11.0810697;
var currentLng = 76.951332;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular_Map_Application';




  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 12;
  display: any;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  directionsService: google.maps.DirectionsService | undefined;
  directionsRenderer: google.maps.DirectionsRenderer | undefined;
  map: google.maps.Map | undefined;

  constructor() {
    this.getPosition().then(pos => {
      console.log(`Position: ${pos.lat}, ${pos.lng}`);
      this.center = { lat: pos.lat, lng: pos.lng };

      this.markerPositions.push(this.center);
      
    }).catch(error => {
      console.error("Error getting position:", error);
    });
  }

  ngOnInit(): void { }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.center = event.latLng.toJSON();
    }
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.display = event.latLng.toJSON();
    }
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      if (this.markerPositions.length < 2) {
        this.markerPositions.push(event.latLng.toJSON());
        console.log(this.markerPositions);
        
        console.log(event.latLng);
      } else {
        console.log("Only two markers allowed.");
      }
    }
  }

  calculateAndDisplayRoute() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: 7,
      center: this.center
    });
    this.directionsRenderer.setMap(this.map);
    const request = {
      origin: this.markerPositions[0],
      destination: this.markerPositions[1],
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsService.route(request, (response, status) => {
      if (status === 'OK' && this.directionsRenderer) {
        this.directionsRenderer.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}









// center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
//   zoom = 12;
//   display: any;
//   markerOptions: google.maps.MarkerOptions = { draggable: false };
//   markerPositions: google.maps.LatLngLiteral[] = [];

//   constructor() {
//     this.getPosition().then(pos => {
//       console.log(`Position: ${pos.lat}, ${pos.lng}`);
//       this.center = { lat: pos.lat, lng: pos.lng };
//     }).catch(error => {
//       console.error("Error getting position:", error);
//     });
//   }

//   ngOnInit(): void {}

//   getPosition(): Promise<any> {
//     return new Promise((resolve, reject) => {
//       navigator.geolocation.getCurrentPosition(
//         (resp) => {
//           resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
//         },
//         (err) => {
//           reject(err);
//         }
//       );
//     });
//   }

//   moveMap(event: google.maps.MapMouseEvent) {
//     if (event.latLng != null) {
//       this.center = event.latLng.toJSON();
//     }
//   }

//   move(event: google.maps.MapMouseEvent) {
//     if (event.latLng != null) {
//       this.display = event.latLng.toJSON();
//     }
//   }

//   addMarker(event: google.maps.MapMouseEvent) {
//     if (event.latLng != null) {
//       this.markerPositions.push(event.latLng.toJSON());
//       console.log(event.latLng);
//     }
//   }



