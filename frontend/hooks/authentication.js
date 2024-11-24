const { useEffect } = require('react');
const { getCookie } = require('cookies-next');

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
      Authorization: 'Bearer ' + getCookie('jwtToken')
    }
  });

  if (response.status != 200) {
    onFailure();
  } else {
    let data = await response.json();
    console.log(data);
    //console.log(parsed);
    addUserToState(data.user);
    onSuccess();
  }
}

function useAuthentication(onSuccess, onFailure, dependencies) {
  return useEffect(() => {
    if (userExistsInState()) {
      onSuccess();
      return;
    }

    //Otherwise check the server to see if they exist in the backend session
    requestBackendUser(onSuccess, onFailure);
  }, dependencies ?? []);
}

module.exports = { useAuthentication };
