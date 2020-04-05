================================================================================================================
                                    ****          INDEX ROUTES          ****
================================================================================================================
Name            Path                 Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
SHOW            /register            GET         show register form                     N/A
                /register            POST        handle register logic                  User.register()  
SHOW            /login               GET         show login form                        N/A
                /login               POST        handle login logic                     N/A

================================================================================================================
                                    ****          ADMIN ROUTES          ****
================================================================================================================
Name            Path                 Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- ADMIN -->
INDEX           /homeadmin           GET        render admin home page                  User.find(), Company.find()


================================================================================================================
                                    ****          DEPARTMENTS ROUTES          ****
================================================================================================================
Name            Path                            Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
INDEX           /homeadmin/departments          GET         list all departments                   Department.find()
NEW             /homeadmin/departments/new      GET         show a new department form             N/A
CREATE          /homeadmin/departments          POST        create a new department                Department.create()
SHOW            /homeadmin/departments/:id      GET         show info about one specific dept      Department.findById()
EDIT            /homeadmin/departments/:id/edit GET         show edit form of one department       Department.findById()
UPDATE          /homeadmin/departments/:id      PUT         update a particular department         Department.findByIdAndUpate()
DELETE          /homeadmin/departments/:id      DELETE      delete a particular department         Department.findByIdAndRemove()


================================================================================================================
                                    ****          EMPLOYEES ROUTES          ****
================================================================================================================
Name            Path                            Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
INDEX           /homeadmin/employees            GET         list all employees                       Employee.find()
NEW             /homeadmin/employees/new        GET         show a new employees form                N/A
CREATE          /homeadmin/employees            POST        create a new employee                    Employee.create()
SHOW            /homeadmin/employees/:id        GET         show info about one specific employee    Employee.findById()
EDIT            /homeadmin/employees/:id/edit   GET         show edit form of one employee           Employee.findById()
UPDATE          /homeadmin/employees/:id        PUT         update a particular employee             Employee.findByIdAndUpate()
DELETE          /homeadmin/employees/:id        DELETE      delete a particular employee             Employee.findByIdAndRemove()


================================================================================================================
                                    ****          BLOGS ROUTES          ****
================================================================================================================
Name            Path                 Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
INDEX           /blogs               GET        list all blogs                          Blog.find()
NEW             /blogs/new           GET        Show a new blog form                    N/A
CREATE          /blogs               POST       Create a new blog                       Blog.create()
SHOW            /blogs/:id           GET        Show info about one specific blog       Blog.findById()
EDIT            /blogs/:id/edit      GET        Show edit form of one blog              Blog.findById()
UPDATE          /blogs/:id           PUT        Update a particular blog                Blog.findByIdAndUpdate()
DESTROY         /blogs/:id           DELETE     Delete a particular blog                Blog.findByIdAndRemove()



================================================================================================================
                                    ****          COMMENTS ROUTES          ****
================================================================================================================
Name            Path                                            Verb        Purpose                      Mongoose Method
----------------------------------------------------------------------------------------------------------------
CREATE          /homeadmin/blogs/:id/comments                   POST       Create a new comment          Comment.create() 
DESTROY         /homeadmin/blogs/:id/comments/:comment_id       DELETE     Delete a particular comment   Comment.findByIdAndRemove()