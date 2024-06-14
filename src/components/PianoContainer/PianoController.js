import octaveNotes from "../Piano/octaveNotes";

const PianoController = ({ pianoSettings, setPianoSettings }) => {
  const { currentOctaveIndex, isSustainOn, letterTypeOnNote } = pianoSettings;

  const handleDisplayPick = (option) => {
    switch (option) {
      case 1: {
        setPianoSettings({
          ...pianoSettings,
          letterTypeOnNote: letterTypeOnNote === "notes" ? "none" : "notes",
          pianoHasFocus: true,
        });

        break;
      }
      case 2: {
        setPianoSettings({
          ...pianoSettings,
          letterTypeOnNote: letterTypeOnNote === "keys" ? "none" : "keys",
          pianoHasFocus: true,
        });
        break;
      }
      default: {
        setPianoSettings({
          ...pianoSettings,
          pianoHasFocus: true,
          letterTypeOnNote: "notes",
        });
        break;
      }
    }
  };

  const handleOctaveChange = (index) => {
    setPianoSettings({
      ...pianoSettings,
      currentOctaveNotes: octaveNotes[index],
      pianoHasFocus: true,
      currentOctaveIndex: index,
    });
  };

  const handleSustain = () => {
    setPianoSettings({
      ...pianoSettings,
      isSustainOn: !isSustainOn,
      pianoHasFocus: true,
    });
  };

  return (
    <div className="piano-controller-container">
      <button
        className={
          isSustainOn ? "sustain-btn active-sustain-btn" : "sustain-btn"
        }
        onClick={handleSustain}
      >
        <div className="active-circle"></div>
        SUSTAIN
      </button>

      <div className="octave-selection-container">
        Octave
        <div className="octave-row">
          {[...Array(7).keys()].map((index) => {
            return (
              <button
                key={index}
                className={
                  currentOctaveIndex === index
                    ? "octave-btn active-octave-btn"
                    : "octave-btn"
                }
                onClick={() => handleOctaveChange(index)}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="display-container">
        <p className="display-title">Display</p>
        <div className="display-option-container">
          <div
            className={`displayOption ${
              letterTypeOnNote === "notes" && "active-display-option"
            }`}
            onClick={() => handleDisplayPick(1)}
          >
            <div className="active-circle"></div>
            Notes
          </div>
          <div
            className={`displayOption ${
              letterTypeOnNote === "keys" && "active-display-option"
            } desktop-only`}
            onClick={() => handleDisplayPick(2)}
          >
            <div className="active-circle"></div>
            Keys
          </div>
        </div>
      </div>
    </div>
  );
};

export default PianoController;
