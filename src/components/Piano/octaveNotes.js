import octaves from "../../notes";

const getOctaveNotes = (index) => {
  const getOctaveSounds = (index) => {
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
    } = octaves[index];

    return {
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
    };
  };

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
  } = getOctaveSounds(index);

  const octaveNotes = [
    {
      name: "c",
      sound: noteC,
      key: "a",
      isSharp: false,
      noteIndex: 0,
      sharp: {
        name: "c#",
        sound: noteCs,
        isSharp: true,
        key: "w",
        noteIndex: 1,
      },
    },
    {
      name: "d",
      sound: noteD,
      isSharp: false,
      key: "s",
      noteIndex: 2,
      sharp: {
        name: "d#",
        sound: noteDs,
        isSharp: true,
        key: "e",
        noteIndex: 3,
      },
    },
    {
      name: "e",
      sound: noteE,
      isSharp: false,
      key: "d",
      noteIndex: 4,
    },
    {
      name: "f",
      sound: noteF,
      isSharp: false,
      key: "f",
      noteIndex: 5,
      sharp: {
        name: "f#",
        sound: noteFs,
        isSharp: true,
        key: "t",
        noteIndex: 6,
      },
    },
    {
      name: "g",
      sound: noteG,
      isSharp: false,
      key: "g",
      noteIndex: 7,
      sharp: {
        name: "g#",
        sound: noteGs,
        isSharp: true,
        key: "y",
        noteIndex: 8,
      },
    },
    {
      name: "a",
      sound: noteA,
      isSharp: false,
      key: "h",
      noteIndex: 9,
      sharp: {
        name: "a#",
        sound: noteAs,
        isSharp: true,
        key: "u",
        noteIndex: 10,
      },
    },
    {
      name: "b",
      sound: noteB,
      isSharp: false,
      key: "j",
      noteIndex: 11,
    },
    {
      name: "c",
      sound: octaveC,
      isSharp: false,
      key: "k",
      noteIndex: 12,
    },
  ];

  return octaveNotes;
};

export default getOctaveNotes