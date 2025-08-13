const clientId = "ec7fe00bdec6414f98e858b395175584"; // Replace with your client id
const params = new URLSearchParams(window.location.search);
const code = params.get("code"); // Korjattu: hae code URL parametreista

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    // Async/await ei toimi top-levelissä vanhoissa selaimissa, joten käytetään .then()
    getAccessToken(clientId, code)
        .then(accessToken => fetchProfile(accessToken))
        .then(profile => {
            console.log(profile);
            populateUI(profile);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "https://jatavena.github.io/MySpotify/");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "https://jatavena.github.io/MySpotify/");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const data = await result.json();
    return data.access_token;
}

async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/jvenalainen", {
        method: "GET", 
        headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

function populateUI(profile) {
    const displayNameEl = document.getElementById("displayName");
    const avatarEl = document.getElementById("avatar");
    const idEl = document.getElementById("id");
    const emailEl = document.getElementById("email");
    const uriEl = document.getElementById("uri");
    const urlEl = document.getElementById("url");
    const imgUrlEl = document.getElementById("imgUrl");

    if (displayNameEl) displayNameEl.innerText = profile.display_name;
    
    if (profile.images && profile.images[0] && avatarEl) {
        const profileImage = new Image(200, 200);
        profileImage.src = profile.images[0].url;
        avatarEl.appendChild(profileImage);
    }
    
    if (idEl) idEl.innerText = profile.id;
    if (emailEl) emailEl.innerText = profile.email;
    
    if (uriEl) {
        uriEl.innerText = profile.uri;
        uriEl.setAttribute("href", profile.external_urls.spotify);
    }
    
    if (urlEl) {
        urlEl.innerText = profile.href;
        urlEl.setAttribute("href", profile.href);
    }
    
    if (imgUrlEl) {
        imgUrlEl.innerText = (profile.images && profile.images[0]) ? profile.images[0].url : '(no profile image)';
    }
}