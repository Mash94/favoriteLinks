const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')
const flash = require('connect-flash')

const {database} = require('./keys')

// initialization
const app = express()

// settings
app.set('port', process.env.PORT | 4000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs')

// middlewares
app.use(session({
    secret:'nicomahnic',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))
app.use(flash())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())


// global variables
app.use((req,res, next) => {
    app.locals.success = req.flash('success')
    app.locals.delete = req.flash('delete')
    next()
})

// routes
app.use(require('./routes'))
app.use(require('./routes/authentication'))
app.use('/links', require('./routes/links'))

// public files
app.use(express.static(path.join(__dirname, 'public')))

// starting  the server
app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'))
})