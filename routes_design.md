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
                                            <!-- Global -->
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
                                    ****          PAYROLLS ROUTES          ****
================================================================================================================
Name            Path                          Verb        Purpose                               Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Admin -->
INDEX           /homeadmin/payrolls           GET         display all payrolls                  Payroll.find() 
EDIT            /homeadmin/payrolls/:id/edit  GET         display edit form of a payroll        Payroll.findById()
UPDATE          /homeadmin/payrolls/:id       PUT         update a particular payroll status    Payroll.findByIdAndUpdate()
DESTROY         /homeadmin/payrolls/:id       DELETE      delete a particular payroll           Payroll.findByIdAndRemove()

================================================================================================================
                                    ****          APPLICATIONS ROUTES          ****
================================================================================================================
Name            Path                               Verb        Purpose                               Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Admin -->
INDEX           /homeadmin/applications            GET         display all applications              Application.find()
NEW             /homeadmin/applications/new        GET         display new application form          N/A
CREATE          /homeadmin/applications            POST        create a new application              Application.create()
SHOW            /homeadmin/applications/:id        GET         show infos a particular application   Application.findById()
EDIT            /homeadmin/applications/:id/edit   GET         display edit form of a application    Application.findById()
UPDATE          /homeadmin/applications/:id        PUT         update a particular application       Application.findByIdAndUpdate()
DESTROY         /homeadmin/applications/:id        DELETE      delete a particular application       Application.findByIdAndRemove()


================================================================================================================
                                    ****          EMPLOYEES HOME PAGE ROUTES          ****
================================================================================================================
Name            Path                 Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Emp -->
INDEX           /homeemployee        GET        render employee home page                  Employee.findById()


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
INDEX           /homeemployee/employees/:id/payrolls           GET         display all payrolls             Payroll.find()     


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
                                                <!-- Global -->
INDEX           /emschat            GET         display chat index page                 N/A
SHOW            /emschat/chatroom   GET         show chat room                          N/A


================================================================================================================
                                    ****          ABOUT US ROUTES          ****
================================================================================================================
Name            Path                 Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Global -->
SHOW           /about            GET         display about us show page               N/A


================================================================================================================
                                    ****          LEAVES ROUTES          ****
================================================================================================================
Name            Path                        Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- emp -->
INDEX           /homeemployee/leaves/employees/:id       GET        list all leaves                         
NEW             /homeemployee/leaves/employees/:id/new   GET        Show a new leave form                    
CREATE          /homeemployee/leaves/employees/:id       POST       Create a new leave                       
SHOW            /homeemployee/leaves/:id                 GET        Show info about one specific leave       
EDIT            /homeemployee/leaves/:id/edit            GET        Show edit form of one leave              
UPDATE          /homeemployee/leaves/:id                 PUT        Update a particular leave                
DESTROY         /homeemployee/leaves/:id                 DELETE     Delete a particular leave                


================================================================================================================
                                    ****          TASKS ROUTES          ****
================================================================================================================
Name            Path                        Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- emp -->
INDEX           /homeemployee/tasks       GET           list all tasks                     
SHOW            /homeemployee/tasks/:id   GET           Show info about one specific task               

================================================================================================================
                                    ****          HRS HOME PAGE ROUTES          ****
================================================================================================================
Name            Path               Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Hr -->
INDEX           /homehr            GET         render hr home page                     Employee.find()



================================================================================================================
                                    ****          EMPLOYEES ROUTES          ****
================================================================================================================
Name            Path                            Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Hr -->

INDEX           /homehr/employees            GET         list all employees                       Employee.find()
NEW             /homehr/employees/new        GET         show a new employees form                N/A
CREATE          /homehr/employees            POST        create a new employee                    Employee.create()
SHOW            /homehr/employees/:id        GET         show info about one specific employee    Employee.findById()
EDIT            /homehr/employees/:id/edit   GET         show edit form of one employee           Employee.findById()
UPDATE          /homehr/employees/:id        PUT         update a particular employee             Employee.findByIdAndUpate()
DELETE          /homehr/employees/:id        DELETE      delete a particular employee             Employee.findByIdAndRemove()


================================================================================================================
                                    ****          ATTENDANCES ROUTES          ****
================================================================================================================
Name            Path                           Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Hr -->

INDEX           /homehr/attendances            GET         list all attendances                   Attendances.find()


================================================================================================================
                                    ****          PAYROLLS ROUTES          ****
================================================================================================================
Name            Path                          Verb        Purpose                               Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Hr -->
INDEX           /homehr/payrolls           GET         display all payrolls                  Payroll.find() 
SHOW            /homehr/payrolls/:id       GET         display edit form of a payroll        Payroll.findById()
UPDATE          /homehr/payrolls/:id       PUT         update a particular payroll status    Payroll.findByIdAndUpdate()
DESTROY         /homehr/payrolls/:id       DELETE      delete a particular payroll           Payroll.findByIdAndRemove()


================================================================================================================
                                    ****          LEAVES ROUTES          ****
================================================================================================================
Name            Path                          Verb        Purpose                               Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Hr -->
INDEX           /homehr/leaves           GET         display all leaves                  Leave.find() 
UPDATE          /homehr/leaves/:id       PUT         update a particular leave status    Leave.findByIdAndUpdate()
DESTROY         /homehr/leaves/:id       DELETE      delete a particular leave           Leave.findByIdAndRemove()


================================================================================================================
                                    ****          APPLICATIONS ROUTES          ****
================================================================================================================
Name            Path                             Verb        Purpose                               Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Hr -->
INDEX           /homehr/applications             GET         display all applications              Application.find()
SHOW            /homehr/applications/:id         GET         show infos a particular application   Application.findById()
EDIT            /homehr/applications/:id/edit    GET         display edit form of a application    Application.findById()
UPDATE          /homehr/applications/:id/approve PUT         update a particular application       Application.findByIdAndUpdate()
UPDATE          /homehr/applications/:id/reject  PUT         update a particular application       Application.findByIdAndUpdate()
DESTROY         /homehr/applications/:id         DELETE      delete a particular application       Application.findByIdAndRemove()



================================================================================================================
                                    ****          HODS HOME PAGE ROUTES          ****
================================================================================================================
Name            Path               Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Hod -->
INDEX           /homehod            GET         render hod home page                     Employee.find()


================================================================================================================
                                    ****          DEPARTMENTS ROUTES          ****
================================================================================================================
Name            Path                            Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Hod -->
SHOW            /homehod/departments/:id        GET         show info about one specific dept       Department.findById()
EDIT            /homehod/departments/:id/edit   GET         show edit form of a department          Department.findById()
UPDATE          /homehod/departments/:id        PUT         update a particular department          Department.findByIdAndUpdate()


================================================================================================================
                                    ****          PROJECTS ROUTES          ****
================================================================================================================
Name            Path                            Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Hod -->

INDEX           /homehod/projects               GET        list all projects                       Project.find()
NEW             /homehod/projects/new           GET        Show a new project form                 N/A
CREATE          /homehod/projects               POST       Create a new project                    Project.create()
SHOW            /homehod/projects/:id           GET        Show info about one specific project    Project.findById()
EDIT            /homehod/projects/:id/edit      GET        Show edit form of one project           Project.findById()
UPDATE          /homehod/projects/:id           PUT        Update a particular project             Project.findByIdAndUpdate()
DESTROY         /homehod/projects/:id           DELETE     Delete a particular project             Project.findByIdAndRemove()


================================================================================================================
                                    ****          TASKS ROUTES          ****
================================================================================================================
Name            Path                            Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
                                                <!-- Hod -->

INDEX           /homehod/tasks                  GET        list all tasks                          Task.find()
NEW             /homehod/tasks/new              GET        Show a new task form                    N/A
CREATE          /homehod/tasks                  POST       Create a new task                       Task.create()
SHOW            /homehod/tasks/:id              GET        Show info about one specific task       Task.findById()
EDIT            /homehod/tasks/:id/edit         GET        Show edit form of one task              Task.findById()
UPDATE          /homehod/tasks/:id              PUT        Update a particular task                Task.findByIdAndUpdate()
DESTROY         /homehod/tasks/:id              DELETE     Delete a particular projetaskct         Task.findByIdAndRemove()