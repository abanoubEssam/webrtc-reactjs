import React, { useEffect, useState } from 'react';

const Profile = ({currentUser}) => {
  const [currentUserProfile , setCurrentUserProfile] = useState({})

    useEffect(() => {
       setCurrentUserProfile(currentUser)
    }, [currentUser])
    
    return ( 
        <div>
            ME: {currentUserProfile.name}
        </div>
     );
}
 
export default Profile;