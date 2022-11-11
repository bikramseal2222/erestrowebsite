import config from "./config";

//is login
export function isLogin() {
  let user = localStorage.getItem("user");
  if (user) {
    try {
      user = JSON.parse(user);
      if (user.token) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  return false;
}

//logout
export function logout() {
  localStorage.clear();
  localStorage.removeItem("user");
  return true;
}

//get user data
export function getUserData() {
  let user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return false;
}

// get_sign

export function getSign() {
  let currency = localStorage.getItem("sign");
  return currency;
}

export function loadAsyncScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src
    });
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  });
}

const mapApiJs = "https://maps.googleapis.com/maps/api/js";
const apiKey = config.YOUR_GOOGLE_MAPS_API_KEY;

export const initMapScript = () => {
  if (window.google) {
    return Promise.resolve();
  }
  const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
  return loadAsyncScript(src);
};
