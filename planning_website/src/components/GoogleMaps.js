import React, { useEffect } from 'react';

const GoogleMaps = ({ apiKey }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.defer = true;
        script.async = true;

        script.onload = () => {
            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8
            });

            const marker = new window.google.maps.Marker({
                position: { lat: -34.397, lng: 150.644 },
                map: map,
                title: 'Hello World!'
            });
        };

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [apiKey]);

    return (
        <div id="map" style={{ height: '400px', width: '100%' }} />
    );
};

export default GoogleMaps;

