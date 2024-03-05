const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const ejs = require("express-ejs-layouts");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override")
const flash = require("connect-flash")
// const MongoStore = require('connect-mongo')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// activating express
const app = express();

// requiring .env file
require("dotenv").config({ path: "./.env " });

//mongo connection
const connectDB = require("./server/database/database.js");
const { route } = require("./server/routes/index");
connectDB();


// body-parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// method override
app.use(methodOverride("_method"))

// setting up sessions || memoryStore
// app.use(session({
//   secret: 'keyboard cat',
//   cookie: {
//     path: '/',
//     secure: false,
//     maxAge: 60000 * 30
//   },
//   // store: MongoStore.create({
//   //   mongoUrl: process.env.MONGODB_URI,
//   //   ttl: 60 * 60 * 6 * 1000
//   // }),
//   resave: false, // don't save session if unmodified
//   saveUninitialized: false, // don't create session until something stored
// }));
app.use(flash());

// setting up ejs & Layouts
app.use(ejs)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", path.join(__dirname, "views/layouts/main"));



// setting up static files (imgs, css, js)
app.use(express.static(path.join(__dirname, "public")))

// setting up New Route for the TinyMCE Node module */
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// routes middleware
// index router home page
app.use("/", require("./server/routes/index"));
// admin router
app.use("/", require("./server/routes/admin"));
// sermon (full sermon) router
app.use("/", require("./server/routes/sermon"))
// show page(all sermons) router
app.use("/", require("./server/routes/showpage"))
// anchorImages router
app.use("/", require("./server/routes/anchorImages"))
// register, login & logout routers
app.use("/", require("./server/routes/register"))
app.use("/", require("./server/routes/login"))
app.use("/", require("./server/routes/logout"))
// new Sermon router
app.use("/", require("./server/routes/newSermon"))
// search router
app.use("/", require("./server/routes/search"))

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
});




// const express = require("express");
// const ejs = require("express-ejs-layouts");
// const path = require("path");
// const cookieParser = require("cookie-parser");
// const session = require("express-session");
// const methodOverride = require("method-override")
// const flash = require("connect-flash");
// const MemoryStore = require("memorystore");

// // activating express
// const app = express();

// // requiring .env file
// require("dotenv").config()//mongo connection
// const connectDB = require("./server/database/database.js");
// const { route } = require("./server/routes/index");
// connectDB();

// // body-parser middleware
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }));

// // method override
// app.use(methodOverride("_method"))

// // setting up sessions || memoryStore
// app.use(cookieParser());
// app.use(session({
//     secret: 'keyboard cat',
//     cookie: {
// 		secure: true,
// 		maxAge: 60000
// 	},
//   store: new MemoryStore({
//     checkPeriod: 86400000 // prune expired entries every 24h
//   }),
//   resave: false, // don't save session if unmodified
//   saveUninitialized: false, // don't create session until something stored
//   }));
//   app.use(flash());

// // setting up ejs & Layouts
// app.use(ejs)
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.set("layout", path.join(__dirname, "views/layouts/main"));