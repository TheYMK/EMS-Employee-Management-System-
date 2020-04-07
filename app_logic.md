1- LANDING PAGE: {
    Sign Up: {
        - Full Name
        - Email
        - Role
        - Password
        - Company informations {
            - name
            - city
            - type
            - address
            - email
            - phone
            - description
            - size: {
                - SMB (Small and Medium-Sized Businesses)
                - SME (Small and Medium Enterprises)
                - Large
            }
        }

      

    }

    Login: {
        - Company Name
        - Username
        - Password

         if(login === 'Success'){
            if(role === 'Admin'){
                goto('Admin home page')
            }else if(role === 'HR'){
                goto('HR home page')
            }else if(role === 'HOD'){
                goto('HOD home page')
            }else {
                goto('Employee home page')
            }
        }
    }


    

}

Project: {
    
    name:
    start:
    end:
    description:
    projectManager:
    department:
    state:
    company:
    rating:
    employee: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Employee'
		}
	]


}

<!-- TO FIX PROJECT DELETION ON DEPARTMENT DELETION: push each new project to projects array inside departmentSchema -->