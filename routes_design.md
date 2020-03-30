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
Name            Path                    Verb        Purpose                                Mongoose Method
----------------------------------------------------------------------------------------------------------------
INDEX           /departments            GET         list all departments                   Department.find()
NEW             /departments/new        GET         show a new department form             N/A
CREATE          /            POST        create a new department                Department.create()
SHOW            /departments/:id        GET         show info about one specific dept      Department.findById()
EDIT            /departments/:id/edit   GET         show edit form of one department       Department.findById()
UPDATE          /departments/:id        PUT         update a particular departments        Department.findByIdAndUpate()
DELETE          /departments/:id        DELETE      delete a particular departments        Department.findByIdAndRemove()