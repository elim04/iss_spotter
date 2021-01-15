/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = function(callback) {
  
  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    
    //if non - 200 status , assume server error
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    let ip = JSON.parse(body).ip;
    callback(null, ip);

  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`), null);
      return;
    }

    const data = JSON.parse(body);
    const latitude = data.latitude;
    const longitude = data.longitude;

    const coordsObj = {
      latitude,
      longitude
    };

    callback(null, coordsObj);

  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
  
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching pass times for ISS. Response: ${body}`, null));
      return;
    }

    const data = JSON.parse(body);
    const passTimes = data.response;
    callback(null, passTimes);

  });
};

const nextISSTimesForMyLocation = function(callback) {
  
  fetchMyIP((error1, ip) => {
    if (error1) {
      callback(error);
      return;
    }
    fetchCoordsByIP(ip, (error2, coordinates) => {
      if (error2) {
        callback(error2);
        return;
      }

      fetchISSFlyOverTimes(coordinates, (error3, passTimes) => {
        if (error3) {
          callback(error3);
          return;
        }
        callback(null, passTimes);

      })
    })
  })


};



module.exports = { nextISSTimesForMyLocation }