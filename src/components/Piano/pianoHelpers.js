import octaveNotes from "./octaveNotes";

const sortOctaveNotes = (i) => {
  const notesWithSharps = octaveNotes[i].filter((note) => note.sharp);
  const sharpNotes = notesWithSharps.map((note) => note.sharp);
  const sortedOctaveNotes = [...octaveNotes[i], ...sharpNotes];
  sortedOctaveNotes.sort((a, b) => a.noteIndex - b.noteIndex);

  return sortedOctaveNotes;
};

const newQuestionIndex = (min, max, prevIndex) => {
  const generateNewIndex = () => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  let newIndex;

  while (true) {
    newIndex = generateNewIndex();

    if (newIndex === prevIndex) {
      newIndex = generateNewIndex();
    } else {
      break;
    }
  }
  return newIndex;
};

export { sortOctaveNotes, newQuestionIndex };
