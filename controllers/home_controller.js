const Habit = require("../models/habits");

// homepage controller
module.exports.home = async function (req, res) {
  try {
    const habits = await Habit.find({}); // Use await to wait for the query to finish
    return res.render("home", {
      title: "Habit Tracker App",
      habit_list: habits,
    });
  } catch (err) {
    console.log("Error in fetching the habits:", err);
    res.render("error_page"); // Render an error page or handle the error appropriately
  }
};

// controller to create a habit
module.exports.createHabit = async function (req, res) {
  let days = {
    one: "none",
    two: "none",
    three: "none",
    four: "none",
    five: "none",
    six: "none",
    seven: "none",
  };
  try {
    const newHabit = await Habit.create({
      habit: req.body.habit,
      end: req.body.end,
      description: req.body.description,
      frequency: req.body.frequency,
      date: Date(),
      time: req.body.time,
      days: days,
    });
    return res.redirect("back");
  } catch (err) {
    console.log("Error in creating habit:", err);
    res.render("error_page"); // Render an error page or handle the error appropriately
  }
};

// controller to delete a habit
module.exports.deleteHabit = async function (req, res) {
  let id = req.query.id;
  try {
    await Habit.findByIdAndDelete(id);
    return res.redirect("back");
  } catch (err) {
    console.log("Error in deleting Habit:", err);
    res.render("error_page"); // Render an error page or handle the error appropriately
  }
};
