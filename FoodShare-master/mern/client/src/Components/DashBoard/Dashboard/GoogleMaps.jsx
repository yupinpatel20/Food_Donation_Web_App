import React, { useRef } from 'react';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 24.8607,
    lng: 67.0011, // Coordinates for Karachi
};

const GoogleMaps = ({ selectedLocationLat, selectedLocationLng }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const mapRef = useRef(null);
    const handleMapLoad = (map) => {
        mapRef.current = map;
    };

    const mapComponent = isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: selectedLocationLat || center.lat, lng: selectedLocationLng || center.lng }}
            zoom={selectedLocationLat && selectedLocationLng ? 15 : 12}
            onLoad={handleMapLoad}
        >
            {selectedLocationLat && selectedLocationLng && (
                <MarkerF position={{ lat: parseFloat(selectedLocationLat), lng: parseFloat(selectedLocationLng) }} />
            )}
            <MarkerF position={center}></MarkerF>
        </GoogleMap>
    ) : (
        <></>
    );

    return (
        <div className="row">
            <div className="col-12">
                <h4 className="title mt-3 mb-3 text-secondary">Google Maps</h4>
                {mapComponent}
            </div>
        </div>
    );
};

export default GoogleMaps;
