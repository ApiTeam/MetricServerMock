const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const user = {
    username: "alex",
    name: "Муржухин Андрей Евгеневич",
    department: "отдел програмирования",
    phone: "+7(800)123-45-67",
    roles: ["admin", "developer", "customer"]
};

router.get('/unauth', (req, res, next) => {
    next(createError(401, 'В доступе отказано'))
});

/* GET auth user  */
router.get('/auth', (req, res) => {
    res.json(user);
});



module.exports = router;