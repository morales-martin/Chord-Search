const router = require("express").Router();
let Chord = require("../models/chord.model");

router.route("/").get((req, res) => {
  Chord.find()
    .then((chords) => res.json(chords))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/search").get((req, res) => {
  let regx = new RegExp(`${req.query.chordName}`, "i");

  Chord.find({ chordName: regx })
    .then((chords) => res.json(chords))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(async (req, res) => {
  const chordName = req.body.chordName;
  const chordStrings = req.body.chordStrings;
  let nameExists = false;
  let stringsExist = false;

  const newChord = new Chord({ chordName, chordStrings });

  await Chord.exists({ chordName: chordName }).then((result) => {
    if (result) nameExists = true;
  });

  await Chord.exists({ chordStrings: chordStrings }).then((result) => {
    if (result) stringsExist = true;
  });

  if (nameExists && stringsExist) {
    // duplicate record
    res
      .status(400)
      .json(
        `Chord ${chordName} already exists with this string pattern.`
      );
  } else if (!stringsExist) {
    // new chord
    newChord
      .save()
      .then(() => res.json("Chord added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    // duplicate string pattern
    Chord.find({ chordStrings: chordStrings }).then((chords) =>
      res
        .status(400)
        .json(
          `This string pattern is already matched to ${chords
            .map((chord) => chord.chordName)
            .join(" ")}`
        )
    );
  }
});

module.exports = router;
