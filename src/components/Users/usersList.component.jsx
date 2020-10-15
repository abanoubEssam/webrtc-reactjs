import React, { useEffect } from 'react';

const UsersList = ({ currentUser, usersList, socketClient }) => {
    console.log("UsersList -> socketClient", socketClient.id)


    useEffect(() => {
        console.log("UsersList -> socketClient", socketClient)
        console.log("RENDER", usersList)
    }, [usersList])

    useEffect(() => {
        socketClient.on(`offer`, payload => {
            console.log("PAYLOAD offer", payload)
        })
        socketClient.on(`answer`, payload => {
            console.log("PAYLOAD answer", payload)
        })
        socketClient.on(`ice-candidate`, payload => {
            console.log("PAYLOAD ice-candidate", payload)
        })
    }, [])

    const handleCallButton = (user) => {
        console.log("handleCallButton -> user", user)
        socketClient.emit('offer', { name: user, from: currentUser.name, description: "desc is here offer" })
    }

    const handleAnswerButton = (user) => {
        console.log("handleCallButton -> user", user)
        socketClient.emit('answer', { name: user, from: currentUser.name, description: "desc is here offer" })
    }

    const handleCandidateButton = (user) => {
        console.log("handleCallButton -> user", user)
        socketClient.emit('ice-candidate', { name: user, from: currentUser.name, candidate: "desc is here offer" })
    }


    const renderUsersList = () => {
        if (usersList) {
            return (
                <div>
                    <ul>
                        {
                            usersList.map((user, index) => {
                                return (
                                    <li key={index}>
                                        {user}
                                        <button onClick={() => handleCallButton(user)}>
                                            call
                                        </button>
                                        <button onClick={() => handleAnswerButton(user)}>
                                            answer
                                        </button>
                                        <button onClick={() => handleCandidateButton(user)}>
                                            candidate
                                        </button>
                                    </li>

                                )
                            })
                        }
                    </ul>
                </div>
            )
        }
        else {
            return (
                <div>
                    no users yet
                </div>
            )
        }
    }
    return (
        <div>
            {renderUsersList()}
        </div>
    );
}

export default UsersList;