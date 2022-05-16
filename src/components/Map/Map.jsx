import React, {useEffect, useState} from 'react';
import ReactMapGL from 'react-map-gl';
import {MAP_BOX_TOKEN} from '../../config/config'
import { useDispatch, useSelector } from 'react-redux';
import { getLogs } from '../../actions/log';
import Markers from '../Marker/Marker'
import { addLocation } from '../reducers/logReducer';

const Log = () => {
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: 'calc(100vh - 80px)',
        latitude: 0,
        longitude: 0,
        zoom: 1
    });
    const [location, setLocation] = useState({})
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getLogs());
    },[])
    const logEntries = useSelector(state => state.log.logs);
    
    const showAddMarkerPopup = (event) => {
        const [ longitude, latitude ] = event.lngLat;
        setLocation({
            latitude,
            longitude,
        })
    };
    
    return (
        <ReactMapGL
            {...viewport}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxApiAccessToken={MAP_BOX_TOKEN}
            onViewportChange={setViewport}
            onDblClick={showAddMarkerPopup}
        >
            {
                logEntries && <Markers cb={setLocation} location={location} logEntries={logEntries} zoom={viewport.zoom}/>
            }
        </ReactMapGL>
    );
    
}

export default Log;