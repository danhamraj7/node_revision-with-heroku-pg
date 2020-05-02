const db = require("../database/dbConfig");
module.exports = {
  find,
  findById,
  add,
  update,
  remove,
  //messages

  findMessageById,
  findLessonMessages,
  addMessage,
  removeMessage,
};
//
function find() {
  return db("lessons");
}
//
function findById(id) {
  return db("lessons").where({ id }).first();
}

//add

function add(lesson) {
  return db("lessons")
    .insert(lesson, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function update(id, changes) {
  return db("lessons")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return db("lessons").where("id", Number(id)).del();
}

//************Messages**************** */

function findMessageById(id) {
  return db("messages").where({ id }).first();
}

function findLessonMessages(lesson_id) {
  return db("lessons as l")
    .join("messages as m", "l.id", "m.lesson_id")
    .select(
      "l.id as Lesson_Id",
      "l.name as Lesson_Name",
      "m.id as Message_Id",
      "m.sender as Sender",
      "m.text as Message"
    )
    .where({ lesson_id });
}

async function addMessage(message, lesson_id) {
  const [id] = await db("messages").where({ lesson_id }).insert(message);
  return findMessageById(id);
}

function removeMessage(id) {
  return db("messages").where("id", Number(id)).del();
}
