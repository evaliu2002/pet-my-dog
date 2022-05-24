import React, { useState, useEffect } from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from 'react-router';

const DogRequests = () => {
    // useNavigate for event handling to other web pages
    let navigate = useNavigate();
    const ownerProfile = () => {
        navigate("/owner-profile")
    }
    const findDogs = () => {
        navigate("/map-view/find-dogs")
    }
    const navOwner = () => {
        navigate("/map-view/nav-owner")
    }
    const navUser = () => {
        navigate("/map-view/nav-user")
    }

    const [requests, setRequests] = useState([]);
    const [myUID, setMyUID] = useState("");
    const UPDATE_EVERY_MIN = 10 * 1000;

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

    const REQ_MEET_URL = "https://localhost:4567/meetups";

    const MY_PROF_URL = "https://localhost:4567/getMyProfile"

    /**
     * Getting requests from users from back-end endpoint
     */
    const requestMeetup = () => {
        let userProfileUID;
        let reqArr = [];
        fetch(MY_PROF_URL, {
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(checkStatus)
            .then(async (response) => {
                let userProfile = (await response.json());
                setMyUID(userProfile.uid);
            })
        fetch(REQ_MEET_URL, {
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userProfileUID)
        })
            .then(checkStatus)
            .then(async (response) => {
                let reqObj = (await response.json());
                if (reqObj !== "No meetups") {
                    for (let i = 0; i < reqObj.length; i++) {
                        reqArr.push(reqObj[i])
                    }
                }
                setRequests(reqArr)
            })
            .catch(() => {console.log("Receiving meetup request failed")})
    }

    const ACPT_MEET_URL = "https://localhost:4567/acceptMeetup";
    /**
     * Accepting meetup requests
     * @param mid
     * @returns {string}
     */
    const acceptRequest = (mid)  => {
        fetch(ACPT_MEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({mid: mid})
        })
            .then(checkStatus)
            .then(() => {console.log("Accepted Meetup")})
            .catch(() => {console.log("Accepting meetup failed")})
        return mid;
    }

    const REJC_MEET_URL = "https://localhost:4567/rejectMeetup";
    /**
     * Rejecting Meetup Requests
     * @param mid
     * @returns {string}
     */
    const rejectMeetup = (mid) => {
        fetch(REJC_MEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({mid: mid})
        })
            .then(checkStatus)
            .then(() => {console.log("Rejected Meetup")})
            .catch(() => {console.log("Rejecting meetup failed")})
        return mid;
    }

    useEffect(requestMeetup, []);

    return (
        <div className='dogRequests'>
            <button onClick={findDogs}>Petter Mode</button>
            <BsFillPersonFill onClick={ownerProfile}/>
            <h4>Petting Requests</h4>
            {requests.map(req =>
                <div>
                    {req.senderProfile.username + " would like to request to pet "
                        + req.receiverProfile.username + "'s dog"}
                    <br />
                    {"Status: " + req.status}
                    <br />
                    {/*{myUID === req.sender ? navUser(): navOwner()}*/}
                    <button onClick={() => {acceptRequest(req.mid);}}>Yes</button>
                    <button onClick={() => {rejectMeetup(req.mid);}}>No</button>
                </div>)}
        </div>
    );
}

export default DogRequests;