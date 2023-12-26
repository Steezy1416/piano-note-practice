import trebleNotesSources from "../../notes/trebleNotes";
const {
  noteC,
  noteCs,
  noteD,
  noteDs,
  noteE,
  noteF,
  noteFs,
  noteG,
  noteGs,
  noteA,
  noteAs,
  noteB,
} = trebleNotesSources;

const trebleNotes = [
  {
    name: "c",
    sound: noteC,
    isSharp: false,
    key: "a",
  },
  {
    name: "c#",
    sound: noteCs,
    isSharp: true,
    key: "w",
  },
  {
    name: "d",
    sound: noteD,
    isSharp: false,
    key: "s",
  },
  {
    name: "d#",
    sound: noteDs,
    isSharp: true,
    key: "e",
  },
  {
    name: "e",
    sound: noteE,
    isSharp: false,
    key: "d",
  },
  {
    name: "f",
    sound: noteF,
    isSharp: false,
    key: "f",
  },
  {
    name: "f#",
    sound: noteFs,
    isSharp: true,
    key: "t",
  },
  {
    name: "g",
    sound: noteG,
    isSharp: false,
    key: "g",
  },
  {
    name: "g#",
    sound: noteGs,
    isSharp: true,
    key: "y",
  },
  {
    name: "a",
    sound: noteA,
    isSharp: false,
    key: "h",
  },
  {
    name: "a#",
    sound: noteAs,
    isSharp: true,
    key: "u",
  },
  {
    name: "b",
    sound: noteB,
    isSharp: false,
    key: "j",
  },
];

export default trebleNotes;
