const fs = require("fs");

function readFile(pathname) {
    return new Promise((resolve, reject) => {
        fs.readFile(pathname, "utf-8", (err, res) => {
            if (err !== null) {
                reject(err);
                return;
            }
            resolve(res);
        });
    });
}

module.exports = {
    readFile,
};
