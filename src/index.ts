import { defineCommand, runMain } from "citty";
import { consola } from "consola";

function describeCommand(warn: boolean, message?: string) {
  const defaulMessage = "Are you sure you want to run this command?";

  if (warn) {
    consola.warn(message || defaulMessage);
  } else {
    consola.info(message || defaulMessage);
  }
}

const main = defineCommand({
  meta: {
    name: "are-you-sure",
    version: "0.0.1",
    description: "Are you sure cli",
  },
  args: {
    command: {
      type: "positional",
      description: "The command you want to run",
      required: true,
      alias: "c",
    },
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
    message: {
      type: "string",
      description: "A message to display",
      alias: "m",
    },
  },
  run: async ({ args }) => {
    describeCommand(args["default-to-yes"], args.message);
    const response = await consola.prompt("Deploy to the production?", {
      type: "confirm",
      initial: args["default-to-yes"],
    });
    if (response) {
      consola.success("Deployed to production");
    }
  },
});

runMain(main);
