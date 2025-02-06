const randomstring = require("randomstring");

const trackingNumber = () => { 
	const prefix = "ebi-trnx-";
	const suffix = Date.now();
	const ref = prefix + suffix;
	return ref;
 }

 const generateDeliveryNumber = () => {
	const prefix = "EBI-";
	const suffix = randomstring.generate({
		length: 6,
		charset: "numeric",
	});
	const id = prefix + suffix.padStart(6, "0");

	return id;
};

module.exports = {
	trackingNumber,
    generateDeliveryNumber
};
 