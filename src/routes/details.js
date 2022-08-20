const express = require('express');
const router = express.Router();

router.get('/detalles-1',(req, res) => {
    res.render('detalles/d-p-1');
});

router.get('/detalles-2',(req, res) => {
    res.render('detalles/d-p-2');
});

router.get('/detalles-3',(req, res) => {
    res.render('detalles/d-p-3');
});

router.get('/detalles-4',(req, res) => {
    res.render('detalles/d-p-4');
});

router.get('/detalles-5',(req, res) => {
    res.render('detalles/d-g-1');
});

router.get('/detalles-6',(req, res) => {
    res.render('detalles/d-g-2');
});

router.get('/detalles-7',(req, res) => {
    res.render('detalles/d-g-3');
});

router.get('/detalles-8',(req, res) => {
    res.render('detalles/d-g-4');
});

router.get('/detalles-9',(req, res) => {
    res.render('detalles/d-u-1');
});

router.get('/detalles-10',(req, res) => {
    res.render('detalles/d-u-2');
});

router.get('/detalles-11',(req, res) => {
    res.render('detalles/d-u-3');
});

router.get('/detalles-12',(req, res) => {
    res.render('detalles/d-u-4');
});


module.exports = router;