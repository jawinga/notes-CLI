import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { createNote, getNotes, findNote, deleteNote } from "./notes.js";

yargs(hideBin(process.argv))
  .command(
    "create <note>",
    "create a note",
    (yargs) => {
      return yargs
        .positional("note", {
          describe: "Create a note",
          type: "string",
        })
        .option("tags", {
          alias: "t",
          type: "string",
          description: "tags to add to the note",
        });
    },
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(",").map((t) => t.trim()) : [];
      const note = await createNote(argv.note, tags);
      console.log("Created new note:", note);
    }
  )

  .command(
    "all",
    "get all notes",
    () => {},
    async (argv) => {
      const allNotes = await getNotes();
      allNotes.map((n) => {
        return console.log(n);
      });
    }
  )

  .command(
    "find <filter>",
    "filter through notes",
    (yargs) => {
      return yargs.positional("filter", {
        describe: "Filter value to search notes",
        type: "string",
      });
    },
    async (argv) => {
      const filter = argv.filter;
      const filterNotes = await findNote(filter);
      if (filterNotes) {
        filterNotes.map((n) => {
          return console.log(n);
        });
      } else {
        console.log("No notes found");
      }
    }
  )

  .command(
    "remove <id>",
    "remove note",
    (yargs) => {
      return yargs.positional("id", {
        describe: "ID of the note to delete",
        type: "number",
      });
    },
    async (argv) => {
      const newNotes = await deleteNote(argv.id);
      console.log(`Removing note with ID: ${argv.id}`);
      console.log("Remaining notes:");

      newNotes.map((n) => {
        return console.log(n);
      });
    }
  )

  .command(
    "clear",
    "clear all notes",
    () => {},
    async (argv) => {
      console.log("Clearing all notes...");
      // TODO: implement clearNotes()
    }
  )

  .demandCommand(1)
  .strict()
  .help()
  .parse();
