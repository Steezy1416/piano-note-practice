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
  octaveC,
} = trebleNotesSources;

const trebleNotes = [
  {
    name: "c",
    sound: noteC,
    key: "a",
    isSharp: false,
    sharp: {
      name: "c#",
      sound: noteCs,
      isSharp: true,
      key: "w",
    },
  },
  {
    name: "d",
    sound: noteD,
    isSharp: false,
    key: "s",
    sharp: {
      name: "d#",
      sound: noteDs,
      isSharp: true,
      key: "e",
    },
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
    sharp: {
      name: "f#",
      sound: noteFs,
      isSharp: true,
      key: "t",
    },
  },
  {
    name: "g",
    sound: noteG,
    isSharp: false,
    key: "g",
    sharp: {
      name: "g#",
      sound: noteGs,
      isSharp: true,
      key: "y",
    },
  },
  {
    name: "a",
    sound: noteA,
    isSharp: false,
    key: "h",
    sharp: {
      name: "a#",
      sound: noteAs,
      isSharp: true,
      key: "u",
    },
  },
  {
    name: "b",
    sound: noteB,
    isSharp: false,
    key: "j",
  },
  {
    name: "c",
    sound: octaveC,
    isSharp: false,
    key: "k",
  },
];

export default trebleNotes;
