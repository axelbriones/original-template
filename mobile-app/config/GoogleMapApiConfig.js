require('dotenv').config();

module.exports.GoogleMapApiConfig = {
    ios: process.env.REACT_APP_GOOGLE_MAPS_IOS_KEY,
    android: process.env.REACT_APP_GOOGLE_MAPS_ANDROID_KEY
};