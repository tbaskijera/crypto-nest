/**
 * This file contains a bunch of helper functions used to run commands in the terminal
 */

const { execSync } = require("child_process");

/**
 * This runs the command in the terminal and optionally returns the output so you can process it in your code.
 *
 * The function behaves slightly different depending on the value of `mode`:
 *   - `get-and-hide-stdout-hide-stderr-and-throw` - Returns stdout but doesn't show it in terminal, in case of error doesn't show it in terminal and the function throws.
 *   - `get-and-hide-stdout-or-stderr` - Returns stdout but doesn't show it in terminal, in case of error returns the error as string and doesn't show it in terminal.
 *   - `get-and-hide-stdout-show-stderr-and-exit` - Returns stdout but doesn't show it in terminal, in case of error it's shown in terminal and the process exits.
 *   - `get-and-hide-stdout-show-stderr-and-throw` - Returns stdout but doesn't show it in terminal, in case of error it's shown in terminal and the function throws.
 *   - `get-and-show-stdout-hide-stderr-and-throw` - Returns stdout and shows the output in terminal, in case of error it's not shown in terminal but the function throws.
 *   - `get-and-show-stdout-show-stderr-and-exit` - Returns stdout and shows the output in terminal, in case of error it's shown in terminal and the process exits.
 *   - `get-and-show-stdout-show-stderr-and-throw` - Returns stdout and shows the output in terminal, in case of error it's shown in terminal and the function throws.
 *   - `show-stdout-show-stderr-and-exit` - Doesn't return stdout but shows the output in terminal, in case of error it shows it in terminal and the process exits.
 *   - `show-stdout-show-stderr-and-throw` - Doesn't return stdout but shows the output in terminal, in case of error it shows it in terminal and the function throws.
 *
 * @param {string} command Command to be ran in the terminal
 * @param {"get-and-hide-stdout-hide-stderr-and-throw" |
 * "get-and-hide-stdout-or-stderr" |
 * "get-and-hide-stdout-show-stderr-and-exit" |
 * "get-and-hide-stdout-show-stderr-and-throw" |
 * "get-and-show-stdout-hide-stderr-and-throw" |
 * "get-and-show-stdout-show-stderr-and-exit" |
 * "get-and-show-stdout-show-stderr-and-throw" |
 * "show-stdout-show-stderr-and-exit" |
 * "show-stdout-show-stderr-and-throw"
 * } mode
 * @returns {string} command output from stdout or stderr
 */

function runCommand(command, mode) {
  try {
    const commandOutput = execSync(command, {
      stdio:
        mode === "get-and-show-stdout-show-stderr-and-exit"
          ? ["ignore", "pipe", "inherit"]
          : mode === "show-stdout-show-stderr-and-throw"
            ? ["ignore", "inherit", "inherit"]
            : mode === "show-stdout-show-stderr-and-exit"
              ? ["ignore", "inherit", "inherit"]
              : mode === "get-and-hide-stdout-show-stderr-and-exit"
                ? ["ignore", "pipe", "pipe"]
                : mode === "get-and-hide-stdout-show-stderr-and-throw"
                  ? ["ignore", "pipe", "inherit"]
                  : mode === "get-and-show-stdout-show-stderr-and-throw"
                    ? ["ignore", "pipe", "inherit"]
                    : mode === "get-and-hide-stdout-hide-stderr-and-throw"
                      ? ["ignore", "pipe", "pipe"]
                      : mode === "get-and-show-stdout-hide-stderr-and-throw"
                        ? ["ignore", "pipe", "pipe"]
                        : mode === "get-and-hide-stdout-or-stderr"
                          ? ["ignore", "pipe", "pipe"]
                          : ["ignore", "pipe", "inherit"],

      encoding: "utf-8",
    });

    if (mode === "get-and-show-stdout-show-stderr-and-exit") {
      console.log(commandOutput);
    }
    if (mode === "get-and-show-stdout-show-stderr-and-throw") {
      console.log(commandOutput);
    }
    if (mode === "get-and-show-stdout-hide-stderr-and-throw") {
      console.log(commandOutput);
    }

    return commandOutput;
  } catch (error) {
    if (
      mode === "get-and-show-stdout-show-stderr-and-exit" ||
      mode === "show-stdout-show-stderr-and-exit"
    ) {
      if (typeof error.status === "number") {
        process.exit(error.status ?? -1);
      }
      throw error;
    }

    if (
      mode === "get-and-hide-stdout-show-stderr-and-throw" ||
      mode === "get-and-show-stdout-show-stderr-and-throw" ||
      mode === "get-and-hide-stdout-hide-stderr-and-throw" ||
      mode === "get-and-show-stdout-hide-stderr-and-throw" ||
      mode === "show-stdout-show-stderr-and-throw"
    ) {
      throw error;
    }

    if (mode === "get-and-hide-stdout-or-stderr") {
      const stderrOutput = error.stderr;
      return stderrOutput;
    }

    if (mode === "get-and-hide-stdout-show-stderr-and-exit") {
      console.log(error.stderr);

      if (typeof error.status === "number") {
        process.exit(error.status ?? -1);
      }

      throw error;
    }
  }
}

module.exports = {
  runCommand,
};
