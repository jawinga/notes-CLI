import { getDB, saveDB, insertDB } from "./db.js";

export const createNote = async (note, tags) => {
  const newNote = {
    content: note,
    id: Date.now(),
    tags: tags,
  };
  await insertDB(newNote);
  return newNote;
};

export const getNotes = async () => {
  const { notes } = await getDB();
  return notes;
};

export const findNote = async (filter) => {
  const { notes } = await getDB();
  const lowerFilter = filter.toLowerCase();

  return notes.filter((note) =>
    note.content.toLowerCase().includes(lowerFilter)
  );
};

export const deleteNote = async (id) => {
  const { notes } = await getDB();
  const match = notes.find((n) => n.id === id);
  let newNotes;

  if (match) {
    newNotes = notes.filter((note) => note.id !== id);
    await saveDB({ notes: newNotes });
  }
  return newNotes;
};

export const deleteAllNotes = async () => {
  await saveDB({ notes: [] });
  return [];
};
