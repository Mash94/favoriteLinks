const express = require('express')
const router = express.Router()

const MySQL = require('../database')

router.get('/add', (req,res) => {
    res.render('links/add',null)
})

router.post('/add', async (req,res) => {
    const {title, url, description} = req.body
    
    const newLink = {
        title,
        url,
        description
    }
    console.log([newLink])
    await MySQL.query(`INSERT INTO favlinks_link (title, url, description) values ('${title}','${url}','${description}');`)

    req.flash('success', 'Link saved successfully')
    res.redirect('/links/')
})

router.get('/', async (req,res) => {
    const links = await MySQL.query(`SELECT * FROM favlinks_link;`)
    console.log(links)
    res.render('links/list',{links})
})

router.get('/delete/:id', async (req,res) => {
    console.log(req.params)
    const { id } = req.params
    await MySQL.query(`DELETE FROM favlinks_link WHERE id = ${id};`)
    res.redirect('/links/')
})

router.post('/delete', async (req,res) => {
    console.log(req.body)
    const { id } = req.body
    await MySQL.query(`DELETE FROM favlinks_link WHERE id = ${id};`)

    req.flash('delete', 'Link deleted successfully')
    res.redirect('/links/')
})

router.post('/editar', async (req,res) => {
    console.log(req.body)
    const { id } = req.body
    const editable = await MySQL.query(`SELECT * FROM favlinks_link WHERE id = ${id};`)
    console.log(editable)
    res.render('links/edit',{editable: editable[0]})
})

router.post('/guardaredicion', async (req,res) => {
    const {title, url, description, id} = req.body
    console.log(req.body)
    await MySQL.query(`UPDATE favlinks_link SET title = '${title}', url = '${url}', description ='${description}' WHERE id = ${id};`)

    req.flash('success', 'Link updated successfully')
    res.redirect('/links/')
})

module.exports = router