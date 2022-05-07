import React from 'react';
import {Route, Routes} from "react-router";
import Login from "./components/login/Login";
import FindDogs from './components/finddogs/FindDogs'
import SelectedDog from "./components/selecteddog/SelectedDog";
import OwnerProfile from "./components/ownerprofile/OwnerProfile"
import ViewDogProfile from "./components/viewdogprofile/ViewDogProfile";
import CreateDogProfile from "./components/createdogprofile/CreateDogProfile";
import DogRequests from "./components/DogRequests/DogRequests";
import MapView from "./components/mapview/MapView";
import NavUser from "./components/navuser/NavUser";
import NavOwner from "./components/navowner/NavOwner";

const App = () => {
    return (
        <div id='App'>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/map-view" element={<MapView />}/>
                    <Route path="/map-view/find-dogs" element={<FindDogs />}/>
                    <Route path="/map-view/dog-requests" element={<DogRequests/>}/>
                    <Route path="/map-view/dog-requests/nav-owner" element={<NavOwner />}/>
                    <Route path="/map-view/selected-dog" element={<SelectedDog />}/>
                    <Route path="/map-view/selected-dog/nav-user" element={<NavUser />}/>
                <Route path="/owner-profile" element={<OwnerProfile />}/>
                    <Route path="/owner-profile/view-dog-profile" element={<ViewDogProfile />}/>
                    <Route path="/owner-profile/create-dog-profile" element={<CreateDogProfile />}/>
            </Routes>
        </div>
    );
}

export default App;
