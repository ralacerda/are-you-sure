import { defineCommand, runMain } from "citty";
import prompts from "@posva/prompts";

const main = defineCommand({
  meta: {
    name: "are-you-sure",
    version: "0.0.1",
    description: "Are you sure cli",
  },
  args: {
    name: {
      type: "string",
      description: "Your name",
      required: true,
    },
    warn: {
      type: "boolean",
      description: "Use friendly greeting",
    },
  },
  run: async ({ args }) => {
    console.log(`${args.warn ? "Hi" : "Greetings"} ${args.name}!`);
    const reponse = await prompts({
      type: "confirm",
      name: "value",
      message: "Are you sure you want to run this command?",
    });
    console.log(reponse);
  },
});

runMain(main);
