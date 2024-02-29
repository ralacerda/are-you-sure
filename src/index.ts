import { defineCommand, runMain } from "citty";
import { consola } from "consola";
import { ConfirmPrompt } from "@clack/core";

type MessageLevel = "warn" | "error" | "info";

function logMessage(level: MessageLevel, message = "Are you sure") {
  switch (level) {
    case "warn": {
      consola.warn(message);
      break;
    }
    case "error": {
      consola.error(message);
      break;
    }
    case "info": {
      consola.info(message);
      break;
    }
    default: {
      consola.info(message);
      break;
    }
  }
}

const prompt = new ConfirmPrompt({
  render() {
    return console.log("Are you sure?");
  },
  active: "active",
  inactive: "inactive",
});

const main = defineCommand({
  meta: {
    name: "are-you-sure",
    version: "0.0.1",
    description: "Are you sure cli",
  },
  args: {
    "default-to-yes": {
      type: "boolean",
      description: "What the default value should be",
      alias: "y",
      default: false,
    },
    warn: {
      type: "boolean",
      description: "Yellow warning message",
      alias: "w",
    },
    error: {
      type: "boolean",
      description: "Red error message",
      alias: "e",
    },
    message: {
      type: "string",
      description: "A message to display",
      alias: "m",
    },
  },
  run: async ({ args }) => {
    if (args.warn && args.error) {
      throw new Error("You cannot use both warn and error flags");
    }

    // TODO: Improve it
    let level: MessageLevel;
    if (args.warn) {
      level = "warn";
    } else if (args.error) {
      level = "error";
    } else {
      level = "info";
    }

    logMessage(level, args.message);

    const response = await prompt.prompt();

    if (!response) {
      process.exit(1);
    }

    process.exit(0);
  },
});

runMain(main);
