const fs = require("fs-extra");
const path = require("path");
const { exec } = require("child_process");

if (fs.existsSync(path.join(__dirname, ".husky"))) exec("npm run husky");
