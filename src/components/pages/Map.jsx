import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

let map;

export default function Map() {
    const mapRef = useRef(null);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch('http://localhost:5000/api/v1/customer/location');
                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.status}`);
                }
                const data = await response.json();
                setData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!isLoading && data && data.length > 0) {
            if (!map) {
                map = L.map(mapRef.current).setView([0, 0], 2);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
            }

            data.forEach((location) => {
                const url = 'https://cors-anywhere.herokuapp.com/';
                const targetUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location.city)}`;

                fetch(url + targetUrl)
                    .then(response => response.json())
                    .then(result => {
                        if (result && result.length > 0) {
                            const { lat, lon } = result[0];
                            L.marker([lat, lon])
                                .addTo(map)
                                .bindPopup(`${location.city}: ${location.count} customers`);
                        }
                    })
                    .catch(error => console.error('Error geocoding:', error));
            });
        }
    }, [isLoading, data]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return <div ref={mapRef} style={{ height: "500px", width: "100%" }} />;
}