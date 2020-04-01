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
                                    ****          DEPARTMENT ROUTES          ****
================================================================================================================
Name            Path                    Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
INDEX           /departments            GET         list all departments                   Department.find()
NEW             /departments/new        GET         show a new department form             N/A
CREATE          /departments            POST        create a new department                Department.create()
SHOW            /departments/:id        GET         show info about one specific dept      Department.findById()
EDIT            /departments/:id/edit   GET         show edit form of one department       Department.findById()
UPDATE          /departments/:id        PUT         update a particular department         Department.findByIdAndUpate()
DELETE          /departments/:id        DELETE      delete a particular department         Department.findByIdAndRemove()


================================================================================================================
                                    ****          EMPLOYEE ROUTES          ****
================================================================================================================
Name            Path                    Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
INDEX           /employees            GET         list all employees                       Employee.find()
NEW             /employees/new        GET         show a new employees form                Department.find()
CREATE          /employees            POST        create a new employee                    Employee.create()
SHOW            /employees/:id        GET         show info about one specific employee    Employee.findById()
EDIT            /employees/:id/edit   GET         show edit form of one employee           Employee.findById()
UPDATE          /employees/:id        PUT         update a particular employee             Employee.findByIdAndUpate()
DELETE          /employees/:id        DELETE      delete a particular employee             Employee.findByIdAndRemove()