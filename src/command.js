import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { createNote } from "./notes.js";

yargs(hideBin(process.argv))
  .command(
    "create <note>",
    "create a note",

    (yargs) => {
      return yargs.positional("note", {
        describe: "Create a note",
        type: "string",
      });
    },
    async(argv),
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(",") : [];
      const note = await createNote(argv.note, tags);
      console.log("Created new note: ", note);
    }
  )
  .option(
    "tags",
    {
      alias: "t",
      type: "string",
      description: "tags to add to the note",
    },
    async(argv)
  )
  .command(
    "all",
    "get all notes",
    () => {},
    async (argv) => {}
  )

  .command(
    "find <filter>",
    "filter through notes",
    (yargs) => {
      return yargs.positional("filter", {
        describe: "filter through the notes",
        type: "string",
      });
    },
    async(argv)
  )

  .command(
    "remove <id>",
    "remove note",
    (yargs) => {
      return yargs.positional("id", {
        describe: "find ID and delete",
        type: "number",
      });
    },
    async(argv)
  )
  .command("clear", "clear all notes", () => {}, async(argv))

  .demandCommand(1)
  .parse();
