import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

let uniqueId = 0;

const Grid = styled.div`
   {
    display: grid;
    grid-template-columns: 82px 82px 82px 82px;
    grid-template-rows: 82px 82px 82px;
    grid-template-areas: ". . . ." ". . . ." ". . . .";
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }
`;

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function generateNote() {
  return {
    _lineLayer: getRandom(0, 2), // 0-2, 0 being the bottom, 2 being the top
    _lineIndex: getRandom(0, 3), // 0 being left most, 3 being right most
    _type: getRandom(0, 1), // 0 is red, 1 is blue
    _time: null,
    _cutDirection: getRandom(0, 8) // 0 is cut up, 1 is cut down, 2 is cut left, 3 is cut right, 4 is cut up left, 5 is cut up right, 6 is cut down left, 7 is cut down right, 8 is cut any direction
  };
}

function isDuplicateNote(prevNote, i, notes) {
  const note = notes[i];
  return (
    note._lineLayer === prevNote._lineLayer &&
    note._lineIndex === prevNote._lineIndex
  );
}

function generateGrid(count) {
  let notes = [];
  for (let i = 0; i < 12; i++) {
    notes.push({
      _lineLayer: i % 3,
      _lineIndex: i % 4,
      _type: null,
      _time: null,
      _cutDirection: null
    });
  }
  for (let j = 0; j < count; j++) {
    const note = generateNote();
    const prevNoteIndex = notes.findIndex(prevNote => {
      return (
        prevNote._lineLayer === note._lineLayer &&
        prevNote._lineIndex === note._lineIndex
      );
    });
    notes[prevNoteIndex] = note;
  }
  return notes;
}

function App({ classes }) {
  const [count, setCount] = useState(2);
  const [grid, setGrid] = useState(generateGrid(count));

  return (
    <>
      <Grid className="App">
        {grid.map((note, i, notes) => {
          return (
            <img
              key={uniqueId++}
              src={`assets/${note._type}_${note._cutDirection}.png`}
            />
          );
        })}
      </Grid>
      <TextField
        id="standard-number"
        label="Notes"
        value={count}
        onChange={e => setCount(e.target.value)}
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        inputProps={{ min: 1, max: 12 }}
        margin="none"
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => setGrid(generateGrid(count))}
      >
        GENERATE
      </Button>
    </>
  );
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

export default withStyles(styles)(App);
