var fs = require('fs');
try{
exports.config = JSON.parse(fs.readFileSync("./config.json"));
}catch(e)
{
	exports.config = null;
}