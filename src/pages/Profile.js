import React, { useEffect, useState } from 'react';
import DeleteAccount from './Deleteaccount';
import "./profile.css";




const Profile = ({userEmail, ToggleButton, liveUpdatesActive , handleToggle}) => {
  const [userProfile, setUserProfile] = useState({ name: '', email: '' });

  useEffect(() => {
    const storedUserName = localStorage.getItem('name');
    const storedUserEmail = localStorage.getItem('email');
    if (storedUserName && storedUserEmail) {
      setUserProfile({ name: storedUserName, email: storedUserEmail });
    }
  }, []);

  return (
    <div className="container mt-5">
      <h1><strong>My Profile</strong></h1>
      <div className="mb-3">
        <label htmlFor="profileName" className="form-label">Name</label>
        <input
          type="text"
          className="form-control profile-data"
          id="profileName"
          value={userProfile.name}
          readOnly
        />
      </div>
      <div className="mb-3">
        <label htmlFor="profileEmail" className="form-label">Email</label>
        <input
          type="email"
          className="form-control profile-data"
          id="profileEmail"
          value={userProfile.email}
          readOnly
        />
      </div>
      <div className="mt-3">
                  <ToggleButton isActive={liveUpdatesActive} toggle={handleToggle} />
                </div>
      <div>
      <h3>Danger Zone</h3>
      <DeleteAccount/>
      </div>
      {/* Add more profile details here */}
    </div>
  );
};

export default Profile;
