var dns = require("dns");

dns.lookup("salon-tablet.com", function onLookup(err, address, family) {
  console.log("ip あどれす:", address);
  dns.reverse(address, function (err, hostnames) {
    if (err) {
      console.log(err.stack);
    }

    console.log("hostnameは？ " + address + ": " + JSON.stringify(hostnames));
  });
});
