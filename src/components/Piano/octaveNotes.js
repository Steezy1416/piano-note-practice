import octaves from "../../notes";

const octaveNotes = octaves.map((octave, octaveIndex) => {
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
  } = octave;

  return [
    {
      name: "c",
      sound: noteC,
      key: "a",
      isSharp: false,
      noteIndex: 0,
      octaveIndex,
      sharp: {
        name: "c#",
        sound: noteCs,
        isSharp: true,
        key: "w",
        noteIndex: 1,
        octaveIndex
      },
    },
    {
      name: "d",
      sound: noteD,
      isSharp: false,
      key: "s",
      noteIndex: 2,
      octaveIndex,
      sharp: {
        name: "d#",
        sound: noteDs,
        isSharp: true,
        key: "e",
        noteIndex: 3,
        octaveIndex
      },
    },
    {
      name: "e",
      sound: noteE,
      isSharp: false,
      key: "d",
      noteIndex: 4,
      octaveIndex
    },
    {
      name: "f",
      sound: noteF,
      isSharp: false,
      key: "f",
      noteIndex: 5,
      octaveIndex,
      sharp: {
        name: "f#",
        sound: noteFs,
        isSharp: true,
        key: "t",
        noteIndex: 6,
        octaveIndex
      },
    },
    {
      name: "g",
      sound: noteG,
      isSharp: false,
      key: "g",
      noteIndex: 7,
      octaveIndex,
      sharp: {
        name: "g#",
        sound: noteGs,
        isSharp: true,
        key: "y",
        noteIndex: 8,
        octaveIndex
      },
    },
    {
      name: "a",
      sound: noteA,
      isSharp: false,
      key: "h",
      noteIndex: 9,
      octaveIndex,
      sharp: {
        name: "a#",
        sound: noteAs,
        isSharp: true,
        key: "u",
        noteIndex: 10,
        octaveIndex
      },
    },
    {
      name: "b",
      sound: noteB,
      isSharp: false,
      key: "j",
      noteIndex: 11,
      octaveIndex
    },
    {
      name: "c",
      sound: octaveC,
      isSharp: false,
      key: "k",
      noteIndex: 12,
      octaveIndex: octaveIndex + 1
    },
  ];
});

export default octaveNotes;
