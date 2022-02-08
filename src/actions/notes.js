import Swal from "sweetalert2";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import { fileUpload } from "../helpers/fileUpload";

export const startNewNote = () => async (dispatch, getState) => {
  const { uid } = getState().auth;

  const newNote = {
    title: "Title of the note",
    body: "Description of the note",
    date: new Date().getTime(),
    url: "",
  };

  const doc = await addDoc(collection(db, `${uid}/journal/notes`), newNote);
  dispatch(activeNote(doc.id, newNote));
  dispatch(addNewNote(doc.id, newNote));
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => async (dispatch) => {
  const notes = await loadNotes(uid);
  dispatch(setNotes(notes));
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = (note) => async (dispatch, getState) => {
  const { uid } = getState().auth;

  const noteToFirestore = { ...note };
  delete noteToFirestore.id;

  await updateDoc(doc(db, `${uid}/journal/notes/${note.id}`), noteToFirestore);
  dispatch(refreshNote(note.id, note));

  Swal.fire({
    icon: "success",
    title: "Saved note",
    text: "The note has been saved correctly",
  });
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note,
  },
});

export const startUploading = (file) => async (dispatch, getState) => {
  const { active: activeNote } = getState().notes;

  Swal.fire({
    title: "Uploading image",
    text: "Please wait while the image loads",
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
  });

  const fileUrl = await fileUpload(file);
  activeNote.url = fileUrl;

  dispatch(startSaveNote(activeNote));

  Swal.close();
};

export const startDeleting = (id) => async (dispatch, getState) => {
  const { uid } = getState().auth;

  Swal.fire({
    title: "Deleting note",
    text: "Please wait while the note is deleted",
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
  });

  await deleteDoc(doc(db, `${uid}/journal/notes/${id}`));

  dispatch(deleteNote(id));

  Swal.close();

  Swal.fire({
    icon: "success",
    title: "Deleted note",
    text: "The note was correctly deleted",
  });
};

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const noteLogout = () => ({
  type: types.notesLogoutCleaning,
});
