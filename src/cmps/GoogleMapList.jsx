import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { ModalFromMap } from "./ModalFromMap";
import { Link } from "react-router-dom";





export function GoogleMapList({ stays }) {
    const defaultCoords = { lat: 38.606140, lng: -99.284834 }
    const [selectedStay, setSelectedStay] = useState(null)

    const zoom = 1
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
    const AnyReactComponent = ({ stay, onOpenModal }) => (


        <div onClick={onOpenModal} className="marker" style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }}>
            <div className="price-bubble" style={{ backgroundColor: selectedStay && selectedStay._id === stay._id ? 'black' : '#FF5A5F' }}>$ {stay.price}</div>
        </div>
    )
    const handleStayClick = (event, stay) => {
        const buttonElement = event.currentTarget
        const buttonPosition = buttonElement.getBoundingClientRect()
        setModalPosition({ top: buttonPosition.top + 15, left: buttonPosition.left })
        setSelectedStay(stay)

    }

    function getRate(selectedStay) {
        if (!selectedStay) return
        else {
            var rate = selectedStay.reviews.reduce((acc, review) => acc + review.rate, 0)
            return rate
        }

    }

    return (
        <div className="full" style={{ margin: 'auto' }}>

            <div style={{ height: '75vh', width: '100vw', marginTop: "0" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDElUwXgKJIonNDyOlmaIafPh2rywqfCPY" }}
                    defaultCenter={defaultCoords}
                    defaultZoom={zoom}
                >
                    {stays.map(stay => (
                        <AnyReactComponent
                            key={stay._id}
                            lat={stay.loc.lat}
                            lng={stay.loc.lng}
                            stay={stay}
                            onOpenModal={() => {
                                setModalPosition({ top: stay.loc.lat, left: stay.loc.lng })
                                setSelectedStay(stay)

                            }}
                        />
                    ))}
                </GoogleMapReact>
            </div>
            <div className="modal-open-stay">
                {selectedStay && (
                    <ModalFromMap
                        isOpen={Boolean(selectedStay)}
                        onClose={() => setSelectedStay(null)}
                        position={modalPosition}
                        content={
                            <Link to={`/stay/${selectedStay._id}`} style={{ textDecoration: "none", color: "black" }}>  <div>
                                <img src={selectedStay.imgUrls[0]} alt={selectedStay.name} />
                                <h3>{selectedStay.name} <span>{'★'} {getRate(selectedStay) / selectedStay.reviews.length}</span></h3>
                                <p><span className="price-tag">$ {selectedStay.price}</span> <span className="night-tag">night</span></p>
                            </div></Link>
                        }
                    />
                )}
            </div>
        </div>
    )
}