import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import "./CustomMap.style.css"

// declare global {
//     namespace window {
//         export interface google {
//             maps: any
//         }
//     }
//     interface Window { 
//         google: any
//     }
// }

// declare module 'google-maps-react' {
//     interface IMarkerProps {
//         position: {lat: number, lng: number}
//         icon?: any
//         label?: any
//     }
//     interface IMapProps {
//         zoom: number
//     }
//     interface IInfoWindowProps extends Partial<google.maps.InfoWindowOptions> {
//         onOpen?: any
//         onClose?: any
//         children?: any
//         google: typeof google
//         map: google.maps.Map
//         marker: google.maps.Marker
//         mapCenter: google.maps.LatLng | google.maps.LatLngLiteral
//         visible: boolean
//     }
// }

const mapStyles = {
    width: '100%',
    height: '100%'
  };

const CustomMap = ({truckLocations, google}: any) => {
    
    const len = truckLocations.length
    const lat = truckLocations[len -1].latitude
    const lng = truckLocations[len -1].longitude
    
    return (
            <Map
                center={{lat,lng}}
                zoom={18}
                google={google}
                initialCenter={{lat,lng}}
            >
                {
                    truckLocations.map(({latitude, longitude}: mapProps, index: number) => {
                        return <Marker
                            key={index}
                            position={{lat: latitude, lng: longitude}}
                        />
                    })
                }
            </Map>
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAGlmyv8EW44YBaPn3jXLxX3atMLCkN5Q4'
  })(CustomMap);
