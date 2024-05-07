const express = require("express");
const port = 9091;
const app = express();
app.use(express.urlencoded());

app.set("view engine", "ejs");

let userdata = [
  {
    userId: "1",
    task: "array",
  },
  {
    userId: "2",
    task: "curd opration",
  },
  {
    userId: "3",
    task: "moduls",
  },
  {
    userId: "4",
    task: "api",
  },
];

app.get("/deletData", (req, res) => {
  let userId = req.query.userId;
  let data = userdata.filter((val) => {
    return val.userId != userId;
  });
  userdata = data;
  return res.redirect("back");
});

app.get("/editData", (req, res) => {
  let userId = req.query.userId;
  let data = userdata.filter((val) => {
    return val.userId == userId;
  });
  return res.render("editData", {
    user: data[0],
  });
});

app.post("/insertdata", (req, res) => {
  console.log(req.body);

  let editId = req.body.editId;

  const { userId, task } = req.body;

  if (editId) {
    let data = userdata.filter((curData) => {
      if (curData.userId == editId) {
        curData.task = task;
      }
      return curData;
    });
    userdata = data;
    return res.redirect("/");
  }

  let obj = {
    userId: req.body.userId,
    task: req.body.task,
  };

  userdata.push(obj);

  res.redirect("/");
});

app.get("/", (req, res) => {
  return res.render("form", {
    user: userdata,
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log("server not start.");
    return false;
  }
  console.log("server http://localhost:" + port);
});
