const SeededRandom = require("../utils/seededRandom");

const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const data = {
    expenditure: {
        100: {
            1: {},
            2: {},
            3: {}
        },
        200: {
            10: {},
            20: {},
            30: {}
        }
    }
}

const quarters = [
    ["Январь", "Февраль", "Март"],
    ["Апрель", "Май", "Июнь"],
    ["Июль", "Август", "Сентябрь"],
    ["Октябрь", "Ноябрь", "Декабрь"]
]

router.get("/data/:section", (req, res, next) => {
    const {section} = req.params
    let {year, quarter} = req.query
    year = Number(year)
    quarter = Number(quarter)

    if (!data[section]) {
        next(createError(404, 'Секция справочника не найдена'));
        return;
    }
    if (Number.isNaN(year) || year <= 1900 || year > 2021) {
        next(createError(400, 'Год - это число в промежутке от 1900 до 2021'));
        return;
    }
    if (Number.isNaN(quarter) || quarter < 1 || quarter > 4) {
        next(createError(400, 'Квартал принимает следующие значения: 1,2,3,4'));
        return;
    }

    const seededRandom = new SeededRandom(Number(year + quarter))

    const result = data[section]

    Object.keys(result).forEach((keyMain) => {
        Object.keys(result[keyMain]).forEach((keySub) => {
            const dataObj = {}
            quarters[quarter - 1].forEach(value => {
                dataObj[`${value} ${year}`] = seededRandom.nextRange(0, 2000)
            })
            result[keyMain][keySub] = dataObj;
        })
    })
    res.json(result)

})

router.get("/data/flat/:section", (req, res, next) => {
    const {section} = req.params
    let {year, quarter} = req.query
    year = Number(year)
    quarter = Number(quarter)

    if (!data[section]) {
        next(createError(404, 'Секция справочника не найдена'));
        return;
    }
    if (Number.isNaN(year) || year <= 1900 || year > 2021) {
        next(createError(400, 'Год - это число в промежутке от 1900 до 2021'));
        return;
    }
    if (Number.isNaN(quarter) || quarter < 1 || quarter > 4) {
        next(createError(400, 'Квартал принимает следующие значения: 1,2,3,4'));
        return;
    }

    const seededRandom = new SeededRandom(Number(year + quarter))

    let result = [];
    const sectionDict = data[section];

    Object.keys(sectionDict).forEach((keyMain) => {
        Object.keys(sectionDict[keyMain]).forEach((keySub) => {            
            quarters[quarter - 1].forEach(value => {                
                result.push({
                    mainId : keyMain,
                    subId: keySub,
                    period: value + ' ' + year ,
                    costs: seededRandom.nextRange(0, year)
                })
            })            
        })
    })

    result = result.map((value, index) => ({...value, id:index})) // add id
    res.json(result)
})

router.put("/data/flat", (req, res, next) => {
    if(req.body.some(value => value.costs>4000)){
        next (createError(400, "costs <=4000"))
        return
    }
    res.json(req.body)
})

module.exports = router;