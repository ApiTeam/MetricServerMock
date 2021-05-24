const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const directory = {
    expenditure: {
        name: 'статьи расходов',
        items: [
            {
                id: 100,
                name: "ФОТ",
                sub: [
                    {
                        id: 1,
                        name: "Зар плата"
                    },
                    {
                        id: 2,
                        name: "Премия"
                    },
                    {
                        id: 3,
                        name: "Мат помощь"
                    },

                ]
            },
            {
                id: 200,
                name: "Хозяйственные расходы",
                sub: [
                    {
                        id: 10,
                        name: "Расходники"
                    },
                    {
                        id: 20,
                        name: "Ремонт"
                    },
                    {
                        id: 30,
                        name: "Чай и кофе"
                    },

                ]
            },
        ]
    },
    department: {
        name: 'отделы',
        items: [
            {
                id: 1000,
                name: "Отдел программирования",
            },
            {
                id: 2000,
                name: "Администрация",
                sub: [
                    {
                        id: 2001,
                        name: "Президент"
                    },
                    {
                        id: 2002,
                        name: "Директор по маркетингу"
                    },
                    {
                        id: 2003,
                        name: "Служба безопастности"
                    },

                ]
            },
        ]
    },
};

router.get('/directory/:id', (req, res, next) => {
    const {id} = req.params;
    const data = directory[id];
    if (data)
        res.json(data);
    else
        next(createError(404, 'Справочник не найден'));
});

router.get('/directory', (req, res) => {
    res.json(directory);
});

module.exports = router;