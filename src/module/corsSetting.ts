import Cors from "cors";

const whitelist = ["https://salon-tablet.an.r.appspot.com"];

// Initializing the cors middleware
export const cors = Cors({
  // methods: ["GET", "HEAD"],
  origin: function(origin, callback) {
    console.log('originは ' + origin)
    // console.log('callbackは ' + callback)
    console.log('whitelistは ' + whitelist)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } 
    // else {
    //   callback(new Error("Not allowed by CORS"));
    // }
  },
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function middleware(req, res, fn) {
  console.log('middlewareだよ');
  
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        console.log('middleware rejectだよ');
        
        return reject(result);
      }

      console.log("middleware resolveだよ");

      return resolve(result);
    });
  });
}

export const runMiddleware = (req, res) => middleware(req, res, cors);
