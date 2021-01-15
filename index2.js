//index.js 


const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = function(passTimes) {
  //needed to change my nodes timezone to get eastern time...
  process.env.TZ = "America/Toronto";
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
.then((passTimes) => {
  printPassTimes(passTimes);
})
.catch((error) => {
  console.log("It didn't work...darn...: ", error.message);
});

//we should make sure to ^^^ handle errors with a catch or else it will print out a unhandled promise reject warning and we want to be able to catch the error
