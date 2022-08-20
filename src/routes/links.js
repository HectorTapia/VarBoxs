const express = require('express');
const router = express.Router();

const pool = require('../databese');

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async (req, res) => {
    const { title,url,description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id_us
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'link guardado bien');
    res.redirect('/links');
});

router.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id_us]);
    res.render('links/list', {links});
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE id_li = ?', [id]);
    req.flash('success', 'link borrado bien');
    res.redirect('/links'); 
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id_li = ?', [id]);
    res.render('links/edit', {link: links[0]}); 
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    const links = await pool.query('UPDATE links set ? WHERE id_li = ?', [newLink, id]);
    req.flash('success', 'link actualizado bien');
    res.redirect('/links'); 
});

module.exports = router;