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
                                    ****          ADMIN HOME PAGE ROUTES          ****
================================================================================================================
Name            Path                 Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Admin -->
INDEX           /homeadmin           GET        render admin home page                  User.find(), Company.find()


================================================================================================================
                                    ****          DEPARTMENTS ROUTES          ****
================================================================================================================
Name            Path                            Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Admin -->

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
                                                <!-- Admin -->

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
                                            <!-- Admin -->
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
                                                <!-- Admin -->

CREATE          /homeadmin/blogs/:id/comments                   POST       Create a new comment          Comment.create() 
DESTROY         /homeadmin/blogs/:id/comments/:comment_id       DELETE     Delete a particular comment   Comment.findByIdAndRemove()


================================================================================================================
                                    ****          PROJECTS ROUTES          ****
================================================================================================================
Name            Path                              Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Admin -->

INDEX           /homeadmin/projects               GET        list all projects                       Project.find()
NEW             /homeadmin/projects/new           GET        Show a new project form                 N/A
CREATE          /homeadmin/projects               POST       Create a new project                    Project.create()
SHOW            /homeadmin/projects/:id           GET        Show info about one specific project    Project.findById()
EDIT            /homeadmin/projects/:id/edit      GET        Show edit form of one project           Project.findById()
UPDATE          /homeadmin/projects/:id           PUT        Update a particular project             Project.findByIdAndUpdate()
DESTROY         /homeadmin/projects/:id           DELETE     Delete a particular project             Project.findByIdAndRemove()


================================================================================================================
                                    ****          COMPANIES ROUTES          ****
================================================================================================================
Name            Path                              Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Admin -->

SHOW            /homeadmin/companies/:id            GET        Show info about one specific company    Company.findById()
EDIT            /homeadmin/companies/:id/edit       GET        Show edit form of one company           Company.findById()
UPDATE          /homeadmin/companies/:id            PUT        Update a particular company             Company.findByIdAndUpdate()
DESTROY         /homeadmin/companies/:id            DELETE     Delete a particular company             Company.findByIdAndRemove()


================================================================================================================
                                    ****          Employee HOME PAGE ROUTES          ****
================================================================================================================
Name            Path                 Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Emp -->
INDEX           /homeemployee        GET        render admin home page                  Employee.findById()


================================================================================================================
                                    ****          DEPARTMENTS ROUTES          ****
================================================================================================================
Name            Path                            Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Emp -->
SHOW            /homeemployee/departments/:id    GET         show info about one specific dept      Department.findById()

================================================================================================================
                                    ****          ATTENDANCES ROUTES          ****
================================================================================================================
Name            Path                                          Verb        Purpose                           Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Emp -->
INDEX           /homeemployee/employees/:id/attendances       GET         render index page                 
UPDATE          /homeemployee/employees/:id/attendances       PUT         update employee attendances       


================================================================================================================
                                    ****          PAYROLLS ROUTES          ****
================================================================================================================
Name            Path                                          Verb        Purpose                           Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Emp -->
INDEX           /homeemployee/employees/:id/payrolls           GET         display all payrolls             Payrolls.find()     


================================================================================================================
                                    ****          PROJECTS ROUTES          ****
================================================================================================================
Name            Path                              Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Emp -->

INDEX           /homeemployee/projects             GET        list all projects                       Project.find()
SHOW            /homeemployee/projects/:id           GET        Show info about one specific project    Project.findById()

================================================================================================================
                                    ****          BLOGS ROUTES          ****
================================================================================================================
Name            Path                 Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Emp -->
INDEX           /blogs               GET        list all blogs                          Blog.find()
NEW             /blogs/new           GET        Show a new blog form                    N/A
CREATE          /blogs               POST       Create a new blog                       Blog.create()
SHOW            /blogs/:id           GET        Show info about one specific blog       Blog.findById()
EDIT            /blogs/:id/edit      GET        Show edit form of one blog              Blog.findById()
UPDATE          /blogs/:id           PUT        Update a particular blog                Blog.findByIdAndUpdate()
DESTROY         /blogs/:id           DELETE     Delete a particular blog                Blog.findByIdAndRemove()

================================================================================================================
                                    ****          CHAT ROUTES          ****
================================================================================================================
Name            Path                 Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Emp -->
INDEX           /emschat            GET         display chat index page                
SHOW            /emschat/chatroom   GET         show chat room