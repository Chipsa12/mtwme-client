import React, {useState} from 'react';
import { Marker, Popup } from 'react-map-gl';
import { useSelector } from 'react-redux';
import LogEntryForm from '../LogEntryForm/LogEntryForm'
import { NavLink } from 'react-router-dom';

import './Marker.css'

const Markers = ({cb, location, logEntries, zoom, ...props}) => {

    const [showPopup, setShowPopup] = useState({});
    let {currentUser, users} = useSelector(state => state.user)

    return (
        <>
        {
            logEntries.map(entry => {
                return <React.Fragment key={entry.id}>
                    <Marker
                        latitude={entry.latitude}
                        longitude={entry.longitude}
                    >
                        <div
                            onClick={() => setShowPopup({
                                [entry.id]: true,
                            })}
                        >
                            <svg
                                className={entry.user_id === currentUser.id ? "marker green" : "marker yellow"}
                                style={{
                                    height: `${!(zoom < 2) ? 7 * zoom : 25}px`,
                                    width: `${!(zoom < 2) ? 7 * zoom : 25}px`,
                                }}
                                version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                                <g>
                                    <g>
                                    <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </Marker>
                    {
                        showPopup[entry.id] ? (
                            <Popup
                                latitude={entry.latitude}
                                longitude={entry.longitude}
                                closeButton={true}
                                closeOnClick={false}
                                dynamicPosition={true}
                                onClose={() => setShowPopup({})}
                                anchor="top" 
                            >
                                <div className="popup">
                                    <h3 className='text'>{entry.title}</h3>
                                    <p className='text'>{entry.description}</p>
                                    <small className='text'>Visited on: {new Date(entry.visit).toLocaleDateString()}</small>
                                    <small className='name'>Author: <NavLink to={`/profile/${entry.user_id}`}>
                                        {
                                            users[entry.user_id].surname +" " + users[entry.user_id].name
                                        }
                                        </NavLink>
                                    </small>
                                </div>
                            </Popup>
                        ) : null
                    }
                </React.Fragment>
            })
        }
        {
            location?.latitude ? (
            <>
            <Marker
                latitude={location.latitude}
                longitude={location.longitude}
            >
                <div>
                <svg
                    className="marker red"
                    style={{
                    height: `${6 * zoom}px`,
                    width: `${6 * zoom}px`,
                    }}
                    version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                    <g>
                    <g>
                        <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                    </g>
                    </g>
                </svg>
                </div>
            </Marker>
            <Popup
                latitude={location.latitude}
                longitude={location.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => cb({})}
                anchor="top" >
                <div className="popup">
                <LogEntryForm onClose={() => {
                    cb({});
                }} location={location} />
                </div>
            </Popup>
            </>
            ) : null
        }
        </>
    )
}

export default Markers;