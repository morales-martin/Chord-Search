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

router.route("/add").post((req, res) => {
  const chordName = req.body.chordName;
  const chordStrings = req.body.chordStrings;

  const newChord = new Chord({ chordName, chordStrings });

  console.log(Chord.exists({ chordName: chordName }))

  if (Chord.exists({ chordName: chordName })) {
    res.status(400).json(`Chord ${chordName} already exists.`);
  } else if (Chord.exists({ chordStrings: chordStrings })) {
    Chord.find({ chordStrings: chordStrings })
      .then(
        (chords) =>
          `String pattern ${chordStrings} is already matched to ${chords.join(
            " "
          )}`
      )
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    newChord
      .save()
      .then(() => res.json("Chord added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  }
});

module.exports = router;
