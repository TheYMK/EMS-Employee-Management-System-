//===========================================================
//                BASIC CONFIGURATIONS
//===========================================================
const path = require('path'),
	http = require('http'),
	express = require('express'),
	socketio = require('socket.io'),
	formatMessage = require('./utils/messages'),
	{ userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users'),
	app = express(),
	server = http.createServer(app),
	io = socketio(server),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	flash = require('connect-flash'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	methodOverride = require('method-override'),
	expressSanitizer = require('express-sanitizer'),
	User = require('./models/user'),
	Company = require('./models/company'),
	Department = require('./models/department'),
	Employee = require('./models/employee'),
	Blog = require('./models/blog'),
	Comment = require('./models/comment'),
	Project = require('./models/project'),
	Payroll = require('./models/payroll'),
	session = require('express-session');

//routes importations
var indexRoutes = require('./routes/index');
var emschatsRoutes = require('./routes/emschats');
var aboutRoutes = require('./routes/about');
var adminRoutes = require('./routes/admin/admin');
var empRoutes = require('./routes/employee/emp');
var departmentsRoutes = require('./routes/admin/departments');
var employeesRoutes = require('./routes/admin/employees');
var blogsRoutes = require('./routes/admin/blogs');
var commentsRoutes = require('./routes/admin/comments');
var projectsRoutes = require('./routes/admin/projects');
var companiesRoutes = require('./routes/admin/companies');
var payrollsRoutes = require('./routes/admin/payrolls');
var emp_departmentRoutes = require('./routes/employee/departments');
var emp_attendances = require('./routes/employee/attendances');
var emp_payrolls = require('./routes/employee/payrolls');
var emp_projects = require('./routes/employee/projects');
var emp_leaves = require('./routes/employee/leaves');

//database connection
mongoose.connect('mongodb://localhost:27017/ems_db', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
});

//More blah blah
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(expressSanitizer());
app.use(methodOverride('_method'));
app.use(flash());

// ===========================================================
//                SOCKET.IO CONFIGURATIONS
// ===========================================================
const botName = 'Bot';
//Run when a client connects
io.on('connection', (socket) => {
	socket.on('joinRoom', ({ username, room }) => {
		const user = userJoin(socket.id, username, room);

		socket.join(user.room);

		// Welcome current user
		socket.emit('message', formatMessage(botName, 'Welcome to EMS ChatCord!'));

		// Broadcast when a user connects
		socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

		// Send users and rooms info
		io.to(user.room).emit('roomUsers', {
			room: user.room,
			users: getRoomUsers(user.room)
		});
	});

	// Listen for chatMessage
	socket.on('chatMessage', (msg) => {
		const user = getCurrentUser(socket.id);

		io.to(user.room).emit('message', formatMessage(user.username, msg));
	});

	// Runs when client disconnects
	socket.on('disconnect', () => {
		const user = userLeave(socket.id);

		if (user) {
			io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
			// Send users and rooms info
			io.to(user.room).emit('roomUsers', {
				room: user.room,
				users: getRoomUsers(user.room)
			});
		}
	});
});

// ===========================================================
//                PASSPORT CONFIGURATIONS
// ===========================================================
app.use(
	require('express-session')({
		secret: 'EMS application developed by Kaym Kassai and serve as final year project',
		resave: false,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

//===========================================================
//                ROUTES CONFIGURATIONS
//===========================================================
app.use(indexRoutes);
app.use(emschatsRoutes);
app.use(aboutRoutes);
app.use(adminRoutes);
app.use(empRoutes);
app.use(departmentsRoutes);
app.use(employeesRoutes);
app.use(blogsRoutes);
app.use(commentsRoutes);
app.use(projectsRoutes);
app.use(companiesRoutes);
app.use(payrollsRoutes);
app.use(emp_departmentRoutes);
app.use(emp_attendances);
app.use(emp_payrolls);
app.use(emp_projects);
app.use(emp_leaves);
//===========================================================
//                SERVER CONFIGURATIONS
//===========================================================
const PORT = 3000 || process.env.PORT;
server.listen(PORT, function() {
	console.log('EMS server is listening for requests...');
});
