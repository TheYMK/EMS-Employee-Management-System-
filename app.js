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
	session = require('express-session'),
	chartjs = require('chart.js');

//routes importations
const indexRoutes = require('./routes/index');
const emschatsRoutes = require('./routes/emschats');
const aboutRoutes = require('./routes/about');
const adminRoutes = require('./routes/admin/admin');
const empRoutes = require('./routes/employee/emp');
const hrRoutes = require('./routes/hr/hr');
const hodRoutes = require('./routes/hod/hod');
const departmentsRoutes = require('./routes/admin/departments');
const employeesRoutes = require('./routes/admin/employees');
const blogsRoutes = require('./routes/admin/blogs');
const commentsRoutes = require('./routes/admin/comments');
const projectsRoutes = require('./routes/admin/projects');
const companiesRoutes = require('./routes/admin/companies');
const payrollsRoutes = require('./routes/admin/payrolls');
const emp_departmentRoutes = require('./routes/employee/departments');
const emp_attendancesRoutes = require('./routes/employee/attendances');
const emp_payrollsRoutes = require('./routes/employee/payrolls');
const emp_projectsRoutes = require('./routes/employee/projects');
const emp_leavesRoutes = require('./routes/employee/leaves');
const hr_employeesRoutes = require('./routes/hr/employees');
const hr_attendancesRoutes = require('./routes/hr/attendances');
const hr_payrollsRoutes = require('./routes/hr/payrolls');
const hr_leavesRoutes = require('./routes/hr/leaves');
const hod_departmentsRoutes = require('./routes/hod/departments');
const hod_projectsRoutes = require('./routes/hod/projects');

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
//                PASSPORT.JS CONFIGURATIONS
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

// ===========================================================
//                FLASH CONFIGURATIONS
// ===========================================================
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
app.use(hrRoutes);
app.use(hodRoutes);
app.use(departmentsRoutes);
app.use(employeesRoutes);
app.use(blogsRoutes);
app.use(commentsRoutes);
app.use(projectsRoutes);
app.use(companiesRoutes);
app.use(payrollsRoutes);
app.use(emp_departmentRoutes);
app.use(emp_attendancesRoutes);
app.use(emp_payrollsRoutes);
app.use(emp_projectsRoutes);
app.use(emp_leavesRoutes);
app.use(hr_employeesRoutes);
app.use(hr_attendancesRoutes);
app.use(hr_payrollsRoutes);
app.use(hr_leavesRoutes);
app.use(hod_departmentsRoutes);
app.use(hod_projectsRoutes);
//===========================================================
//                SERVER CONFIGURATIONS
//===========================================================
const PORT = 3000 || process.env.PORT;
server.listen(PORT, function() {
	console.log('EMS server is listening for requests...');
});
