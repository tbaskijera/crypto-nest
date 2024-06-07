/* eslint-disable no-undef */
const path = require("path");
const { runCommand } = require("./run-command");

const eslintPath = path.join(__dirname, "..", "node_modules", ".bin", "eslint");
const tscPath = path.join(__dirname, "..", "node_modules", ".bin", "tsc");

console.log("Running ESLint check...");
runCommand(`${eslintPath} . --cache`, "show-stdout-show-stderr-and-exit");
console.log("ESLint check completed with no errors.");

console.log("Running TypeScript check...");
runCommand(tscPath, "show-stdout-show-stderr-and-exit");
console.log("TypeScript check completed with no errors.");
