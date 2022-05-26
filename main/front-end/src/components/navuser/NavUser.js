import React, {useEffect, useState} from 'react';
import { BsFillTelephoneFill, BsFillPinMapFill, BsArrowUpCircleFill } from "react-icons/bs";
import {useNavigate} from "react-router";

const NavUser = (props) => {

    const OTHER_USER_LOCATION_URL = process.env.REACT_APP_BASE_URL + "/getOtherUserLocation";
    const navigate = useNavigate();
    const UPDATE_EVERY = 15 * 1000;

    /**
     * Get back-end response
     * @param response
     * @returns {Promise<never>|*}
     */
    const checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300 || response.status === 0) {
            return response;
        } else {
            return Promise.reject(new Error(response.status + ": " + response.statusText));
        }
    };

    const updateThatUserLocation = () => {
        fetch(OTHER_USER_LOCATION_URL, {
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(checkStatus)
            .then(async (response) => {
                props.setThatUserLocation(await response.json());
            })
            .catch(() => {alert("Owner's location is unavailable!")});
    };

    return (
        <div>
            <button onClick={ () => navigate("/map-view/find-dogs") }>Return to search dogs</button>
            <button onClick={ () => navigate("/owner-profile") }>View profile</button>

            <h3> You are heading to { props.thatUser.username }</h3>

            <h5> { props.thatUser.username + "'s contact:"} </h5> <br />

            <BsFillTelephoneFill />
            <h4> { props.thatUser.phone ? props.thatUser.phone : "no phone provided" } </h4>
            <h4> { props.thatUser.email ? props.thatUser.email : "no email provided" } </h4>

            <BsFillPinMapFill />
            <p>
                Location: You will see a Pin on map and path to that Pin when the owner's location is available.
                It is possible for the owner's location to be unavailable. If you do not want to wait until it becomes
                available, go back to request list and cancel this meet up.
            </p>
            <button onClick={updateThatUserLocation}>Refresh location and suggested path.</button>
        </div>
    );
}

export default NavUser;