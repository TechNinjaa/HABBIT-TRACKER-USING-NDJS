const Habit = require("../models/habits");

// Controller to get details request
module.exports.details = async function (req, res) {
  try {
    const habits = await Habit.find({}); // Using await with a promise
    return res.render("details", {
      title: "Habit Weekly",
      habit_list: habits,
    });
  } catch (err) {
    console.log("Error in fetching the habits:", err); // Corrected Console.log to console.log
    return res.status(500).send("Internal Server Error");
  }
};

// Controller to update habit in the database
module.exports.updateHabit = async function (req, res) {
  const id = req.query.id;
  const day = req.query.day;
  const val = req.query.val;

  try {
    const habit = await Habit.findById(id);
    if (!habit) {
      console.log("Habit not found");
      return res.status(404).send("Habit not found");
    }

    // Update the habit based on the provided day and value
    for (let prop in habit.days) {
      if (prop === day) {
        if (val === "none") {
          habit.days[day] = "yes";
          habit.streak++;
        } else if (val === "yes") {
          habit.days[day] = "no";
          habit.streak--;
        } else {
          habit.days[day] = "none";
        }
      }
    }

    // Save the updated habit to the database
    const updatedHabit = await habit.save();

    return res.redirect("back");
  } catch (err) {
    console.log("Error in updating:", err);
    return res.status(500).send("Internal Server Error");
  }
};
