import React, { useState } from "react";
import './App.css'
import { GoogleMap, InfoWindow, MarkerF } from "@react-google-maps/api";

function Map({ posts, position }) {
    // const markers = [
    //     {
    //     id: 1,
    //     position: {
    //         lat: +(position.lat),
    //         lng: +(position.lng),
    //         },
    //     }, 
    // ];
    // const markers = post.map(p => p)

    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const handleOnLoad = (map) => {
        const bounds = new window.google.maps.LatLngBounds();
        // bounds.extend(position)
        posts.forEach(({ location }) => bounds.extend(location));
        map.fitBounds(bounds);
    };

    return (
        <GoogleMap
            position={{lat: 52, lng: 42}}
            zoom={100}
            onLoad={handleOnLoad}
            onClick={() => setActiveMarker(null)}
            mapContainerStyle={{ width: "100%", height: "500px" }}
        >
            {posts.map(({ id, location, title, description, imageLink, date }) => {
                const newDate = new Date(date);
                return (            
                <MarkerF
                    key={id}
                    position={location}
                    onClick={() => handleActiveMarker(id)}
                >
                    {activeMarker === id ? (
                        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                            <div>
                                <h2 className="map__title" >
                                    
                                    <span>{newDate.toLocaleString('nl')}</span>
                                    {imageLink.map(x => {
                                        if(x.match(/.*\.(gif|jpe?g|bmp|png)$/)) {
                                            return <img key={x} src={x} alt={title}/>
                                        }
                                        return (
                                                <video key={x} width="100%" height="200px" controls>
                                                    <source src={x}/>
                                                </video>)
                                            }
                                        )
                                    }
                                    <p>{title}</p>
                                    <p>{description}</p>
                                    
                                </h2>
                            </div>
                        </InfoWindow>
                    ) : null}
                </MarkerF>)      
            }
            )}
        </GoogleMap>
    );
}

export default Map;
