const express = require("express");

const Lessons = require("./lessonsModel");

const router = express.Router();
//add a lesson
router.post("/", (req, res) => {
  const lessonData = req.body;

  Lessons.add(lessonData)
    .then((lesson) => {
      res.status(201).json(lesson);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to create new lesson" });
    });
});

//get all lessons
router.get("/", (req, res) => {
  Lessons.find()
    .then((Lessons) => {
      res.json(Lessons);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get lessons" });
    });
});
//get id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Lessons.findById(id)
    .then((lesson) => {
      if (lesson) {
        res.status(200).json(lesson);
      } else {
        res
          .status(404)
          .json({ message: "Could not find lesson with given id." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get lesson" });
    });
});

//del
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Lessons.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({
          message: `The lesson with ID:${id} was successfully deleted.`,
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find lesson with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete lesson" });
    });
});

//update lesson

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Lessons.update(id, changes)
    .then((lesson) => {
      if (lesson) {
        res.status(200).json(lesson);
      } else {
        res
          .status(404)
          .json({ message: "Could not find lesson with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to update lesson" });
    });
});

// add message by lesson id
router.post("/:id/messages", (req, res) => {
  const { id } = req.params;
  const msg = req.body;

  if (!msg.lesson_id) {
    msg["lesson_id"] = parseInt(id, 10);
  }

  Lessons.findById(id).then((lesson) => {
    if (!lesson) {
      res.status(404).json({ message: "Invalid id" });
    }
  });
  //check for required fields
  if (!msg.sender || !msg.text) {
    res.status(400).json({ message: "You must enter sender and text values" });
  }

  Lessons.addMessage(msg, id)
    .then((message) => {
      if (message) {
        res.status(200).json(message);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to create new message" });
    });
});

//get messages by lesson id

router.get("/:id/messages", (req, res) => {
  const { id } = req.params;

  Lessons.findLessonMessages(id)
    .then((message) => {
      if (message) {
        res.status(200).json(message);
      } else {
        res
          .status(404)
          .json({ message: "Could not find lesson with given id." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get lesson" });
    });
});

//del messages
router.delete("/messages/:id", (req, res) => {
  const { id } = req.params;

  Lessons.removeMessage(id)
    .then((deleted) => {
      if (deleted) {
        res.status(200).json({
          message: `The message with ID:${id} was successfully deleted.`,
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find Message with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete lesson" });
    });
});

module.exports = router;
