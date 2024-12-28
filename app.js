 // Checking if object has user_metadata key
 function checkUserMetadata(object, key) {
  if (key in object) {
    return true
  }
  else return false
 }

// Auth0 login, logout and profile info
auth0.createAuth0Client({
  domain: "dev-g9vj0eeg.eu.auth0.com",
  clientId: "A9cR2RBZG8da5MfPqoMyN6WEZM1ilsZP",
  authorizationParams: {
    redirect_uri: window.location.origin
  }
}).then(async (auth0Client) => {
  // Assumes a button with id "login" in the DOM
  const loginButton = document.getElementById("login");

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    auth0Client.loginWithRedirect();
  });

  if (location.search.includes("state=") && 
      (location.search.includes("code=") || 
      location.search.includes("error="))) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  }

  // Assumes a button with id "logout" in the DOM
  const logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    auth0Client.logout();
  });

  const isAuthenticated = await auth0Client.isAuthenticated();
  const userProfile = await auth0Client.getUser();

  // Assumes an element with id "profile" in the DOM
  const profileElement = document.getElementById("profile");

  if (isAuthenticated) {
    console.log(JSON.stringify(userProfile))
    let userMetadataExists = checkUserMetadata(userProfile, 'user_metadata')
    let nicknameExists = checkUserMetadata(userProfile, 'nickname')
    profileElement.style.display = "block";
    profileElement.innerHTML = `
            <p>${userProfile.name}</p>
            <img id="profileImage" src="${userProfile.picture}" />
            <p>user_metadata: ${userMetadataExists}</p>
            <p>nickname exists: ${nicknameExists}</p>
            <pre>${JSON.stringify(userProfile, null, ' ')}</per>
          `;
  } else {
    profileElement.style.display = "none";
  }
});
