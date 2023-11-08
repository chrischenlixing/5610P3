const express = require('express');
const router = express.Router();
const myDB = require('../db/myDB');
const bcrypt = require('bcrypt');
const path = require('path');
const { shiftList } = require('../data/shiftList');

const loginRedirect = "/?msg=login needed";

router.get('/api/allReviews', async (req, res) => {
  if (!req.session.login || !isManager(req)) {
    return res.redirect(loginRedirect);
  }

  try {
    const docs = await myDB.getAllReviews();
    res.json(docs);
  } catch (err) {
    console.error('# Get Error', err);
    res.status(500).send({ error: err.name + ', ' + err.message });
  }
});

router.post('/api/login', async (req, res) => {
  let data = req.body;
  let user = await myDB.findUser(data.username);

  if (user) {
    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (passwordMatch) {
      req.session.user = user;
      req.session.login = true;
      const redirectPath = user.position === "manager" ? "/manager" : "/employee";
      res.redirect(redirectPath);
    } else {
      res.redirect("/?msg=wrong password");
    }
  } else {
    res.redirect("/?msg=user not exists");
  }
});

router.post('/api/register', async (req, res) => {
  let data = req.body;

  try {
    if (await myDB.findUser(data.username)) {
      return res.redirect("/register?msg=user already exist");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    await myDB.addUser(data);
    res.redirect("/?msg=register succeed");
  } catch (err) {
    console.error('# Post Error', err);
    res.status(500).send({ error: err.name + ', ' + err.message });
  }
});

router.post('/api/addShift', async (req, res) => {
  if (!req.session.login || !isEmployee(req)) {
    return res.redirect(loginRedirect);
  }

  const data = { shift: req.body.shift, name: req.session.user.username };

  try {
    let item = await myDB.findOneShift(data);
    if (item) {
      return res.json({ message: 'shift already exists' });
    }

    data = await myDB.addShift(data);
    res.json(data);
  } catch (err) {
    console.error('# Post Error', err);
    res.status(500).send({ error: err.name + ', ' + err.message });
  }
});

router.post('/api/giveReviews', async (req, res) => {
  if (!req.session.login || !isManager(req)) {
    return res.redirect(loginRedirect);
  }

  try {
    const data = await myDB.giveReviews(req.body);
    res.json(data);
  } catch (err) {
    console.error('# Post Error', err);
    res.status(500).send({ error: err.name + ', ' + err.message });
  }
});

router.get('/api/getByName', async (req, res) => {
  if (!req.session.login) {
    return res.redirect(loginRedirect);
  }

  try {
    const docs = await myDB.findByName(req.session.user.username);
    res.json(docs);
  } catch (err) {
    console.error('# Get Error', err);
    res.status(500).send({ error: err.name + ', ' + err.message });
  }
});

router.post('/api/clockin', async (req, res) => {
  if (!req.session.login || !isEmployee(req)) {
    return res.redirect(loginRedirect);
  }

  try {
    let data = req.body;
    data.name = req.session.user.username;

    if (await myDB.findOneCheckIn(data)) {
      return;
    }

    const docs = await myDB.addCheckIn(data);
    res.json(docs);
  } catch (err) {
    console.error('# Get Error', err);
    res.status(500).send({ error: err.name + ', ' + err.message });
  }
});

router.post('/api/getCheckInByName', async (req, res) => {
  if (!req.session.login) {
    return res.redirect(loginRedirect);
  }

  try {
    const docs = await myDB.getCheckInByName(req.body);
    res.json(docs);
  } catch (err) {
    console.error('# Get Error', err);
    res.status(500).send({ error: err.name + ', ' + err.message });
  }
});

router.get('/api/logout', async (req, res) => {
  req.session.user = null;
  req.session.login = false;
  return res.json();
});

router.post('/api/search', async (req, res) => {
  if (!req.session.login || !isManager(req)) {
    return res.redirect(loginRedirect);
  }

  try {
    const docs = await myDB.searchReviews(req.body);
    res.json(docs);
  } catch (err) {
    console.error('# Get Error', err);
    res.status(500).send({ error: err.name + ', ' + err.message });
  }
});

router.get('/api/getShiftList', async function (req, res) {
  return res.send(shiftList);
});

router.get('*', async function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../frontend/build') });
});

function isEmployee(req) {
  return req.session.user.position === "employee";
}

function isManager(req) {
  return req.session.user.position === "manager";
}

module.exports = router;