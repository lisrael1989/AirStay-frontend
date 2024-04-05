import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '3.5em' }}>{text}</div>;

export function GoogleMap({ stay }) {
    const lat = stay.loc.lat
    const lng = stay.loc.lng
    const [coords, setCoords] = useState({ lat, lng })
    const zoom = 8

    // function handleLochSelect(locCoords) {
    //     setCoords(locCoords);
    // }

    return (
        <div style={{ display: 'flex', justifyContent: 'center',  margin: '0px', flexDirection: "column" }}>
            <h1>Where you’ll be</h1>

            <div style={{ height: '50vh', width: '100%', marginTop: "10px" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDElUwXgKJIonNDyOlmaIafPh2rywqfCPY" }}
                    center={coords}
                    defaultZoom={zoom}
                    // onClick={handleClick}
                    >

                    <AnyReactComponent
                        key={stay.name}
                        lat={stay.loc.lat}
                        lng={stay.loc.lng}
                        text="😁"
                        
                        />

                </GoogleMapReact>
            </div>
                        <h2>{stay.loc.city} ,{stay.loc.country}</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis amet, laudantium ex nobis praesentium incidunt esse sed inventore iusto quidem et distinctio! Voluptatum sunt enim debitis, maiores praesentium beatae asperiores expedita blanditiis laboriosam quod ipsam aliquid, excepturi, soluta voluptas quisquam tempora saepe tempore deleniti quidem corrupti quam odit aut totam.</p>
        </div>
    );
}
