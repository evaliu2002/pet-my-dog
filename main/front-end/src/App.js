import React from 'react';
import {Route, Routes} from "react-router";
import Login from "./components/login/Login";
import FindDogs from './components/finddogs/FindDogs'
import SelectedDog from "./components/selecteddog/SelectedDog";
import OwnerProfile from "./components/ownerprofile/OwnerProfile"
import ViewDogProfile from "./components/viewdogprofile/ViewDogProfile";
import CreateDogProfile from "./components/createdogprofile/CreateDogProfile";

const App = () => {
    return (
        <div id='App'>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="find-dogs" element={<FindDogs />}/>
                <Route path="selected-dog" element={<SelectedDog />}/>
                <Route path="owner-profile" element={<OwnerProfile />}/>
                <Route path="view-dog-profile" element={<ViewDogProfile />}/>
                <Route path="create-dog-profile" element={<CreateDogProfile />}/>
            </Routes>
        </div>
    );
}

export default App;
