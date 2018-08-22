module.exports.report = function (err) {
    if (err) {
        if (err.message) {
            console.log("Error: " + err.message);
        }else {
            console.log("Error: " + err);
        }
    }
};