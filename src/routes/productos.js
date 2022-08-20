const express = require('express');
const router = express.Router();

router.get('/productos',(req, res) => {
    res.render('productos/producto');
});

module.exports = router;