const { useEffect } = require('react');
const { getCookie, deleteCookie } = require('cookies-next');

const userCookie = 'jwtToken';

function getAuthCookie() {
  return 'Bearer' + getCookie(userCookie);
}

//Todo!
function addUserToState(user) {}

//Todo!
function userExistsInState() {
  return false;
}

async function requestBackendUser(onSuccess, onFailure) {
  //Check if user just logged in and is in the backend session
  let response = await fetch('http://localhost:8080/api/auth/get-session-user', {
    method: 'GET',
    headers: {
      Authorization: getAuthCookie()
    }
  });

  if (response.status != 200) {
    onFailure();
  } else {
    let data = await response.json();

    //addUserToState(data.user);
    onSuccess(data.user);
  }
}

/** Hook used to protect a front-end route to only authticated users.
 *  @param {(user) => void} onSuccess - function that runs on successful authentication verification
 *  @param {() => void} onFailure - function that runs on failure to verify / unsuccessful verification
 *  @param {[ any ]} dependencies - if present, the hook will only activate if the values in the list change
 *  @other Side Effects: Places user in the state if it is not in the state but is verified by the JWT auth token
 */
function useAuthentication(onSuccess, onFailure, dependencies) {
  return useEffect(() => {
    /*if (userExistsInState()) {
      onSuccess();
      return;
    }*/

    //Otherwise check the server to see if they exist in the backend session
    requestBackendUser(onSuccess, onFailure);
  }, dependencies ?? []);
}

//Function to log the user out of the application
function logout() {
  /*if (userExistsInState()) {
      deleteUserFromState();
  }*/

  deleteCookie(userCookie);
}

module.exports = { useAuthentication, logout, getAuthCookie };
