// index.js
const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('142.59.170.194', (error, coordinates) => {
 
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned coordinates: ", coordinates);

// });

// fetchISSFlyOverTimes({latitude: 43.6266, longitude: -79.4002}, (error, passTimes) => {

//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned passtimes: ", passTimes);


// });


nextISSTimesForMyLocation((error, passTimes) => {
  if(error) {
    return console.log("It didn't work dOH!", error);
  }
  //success, no error so we can print out the passTimes!
  //to do this we have to loop through the array
  for (let pass of passTimes) {
    const date = new Date(0);
    //risetime is in the form of a unix time stamp, need to convert using set UTCSeconds
    date.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!! Ouuuuu...`);
  }

});

