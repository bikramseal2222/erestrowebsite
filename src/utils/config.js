let config = {
  //page title and SEO keywords
  title: "eRestro",
  metaDescription: "eRestro is a Food Delivery App",
  metaKeyWords: "Erestro, Food, Delivery App",
  appName: "eRestro",

  DefaultCountrySelectedInMobile: "in",

  //Your eRestro API Configurations
  apiUrl: "https://yourerestro.com/app/v1/api/",

  //google Places key
  YOUR_GOOGLE_MAPS_API_KEY: "ENTER_YOUR_GOOGLE_MAP_API_KEY_HERE",

  //firebase config
  apiKey: "ENTER_YOUR_FIREBASE_API_KEY_HERE",
  authDomain: "yourerestro.firebaseapp.com",
  projectId: "your_erestro_project_id",
  storageBucket: "yourerestro.appspot.com",
  messagingSenderId: "your_erestro_project_sender_id",
  appId: "your_erestro_project_app_id",
  measurementId: "your_erestro_project_measurement_id",

  //jwt key
  JWT_SECRET_KEY: "your_desired_jwt_secret_key",
  apiAccesskey: 8525,
  defaultcountry: "in",

  //   payment gateway keys
  stripe_public_key:
    "your_stripe_public_key",
  razorpay_public_key: "your_razorpay_public_key",
  flutterwave_public_key: "your_flutterwave_public_key"
};

export default config;
