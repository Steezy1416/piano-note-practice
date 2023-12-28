const PianoController = ({ noteDisplay, setNoteDisplay }) => {
  const handleDisplayPick = (option) => {
    switch (option) {
      case 1: {
        setNoteDisplay("notes");
        break;
      }
      case 2: {
        setNoteDisplay("keys");
        break;
      }
      case 3: {
        setNoteDisplay("none");
        break;
      }
      default: {
        setNoteDisplay("notes");
        break;
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="display-container">
        <p className="display-title">Display</p>
        <div className="display-option-container">
          <div
            className={`displayOption ${
              noteDisplay === "notes" && "active-display-option"
            }`}
            onClick={() => handleDisplayPick(1)}
          >
            Notes
          </div>
          <div
            className={`displayOption ${
              noteDisplay === "keys" && "active-display-option"
            }`}
            onClick={() => handleDisplayPick(2)}
          >
            Keys
          </div>
          <div
            className={`displayOption ${
              noteDisplay === "none" && "active-display-option"
            }`}
            onClick={() => handleDisplayPick(3)}
          >
            None
          </div>
        </div>
      </div>
    </div>
  );
};

export default PianoController;
