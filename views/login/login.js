//Constructors
class User {
  constructor(userName, email, password) {
    this.userName = userName
    this.email = email
    this.password = password
  }
}

class UI {
	
	//Add user to list
	addUsertoList(user) {
		const list = document.getElementById("list");
		//create a user
		const li = document.createElement("li");
		console.log(li);
		//insert InnerHTml
		li.innerHTML = `<li>${user.userName}</li>`;
		list.appendChild(li);

	}
    //validations with regular expressions
    validateUserName(){
        const userName=document.getElementById("name");
        const re=/^[a-zA-Z]{2,10}$/;
		const users =LocalStorage.getUsers();
		//check if user is already stored
		users.forEach( function(user) {
		if(user.userName===userName.value){
			const div=document.createElement("div");
				div.innerHTML=`<div class="alert alert-danger" role="alert">User ${userName.value} already exists</div>`
				const container = document.querySelector("#containerForm");
				const form = document.querySelector("#userForm");
				container.insertBefore(div, form);
				

				
				setTimeout(function () {
				document.querySelector(".alert").remove();
				}, 3000);
				userName.value="";
				
				

			}else if(!re.test(userName.value)){
           		userName.classList.add("is-invalid");

        	}else{
            	userName.classList.remove("is-invalid");
        	}
		})
	}
	

	
    validateEmail(){
        const email=document.getElementById("email");
        const re=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
		const users =LocalStorage.getUsers();
		//check if email exists
		users.forEach( function(user) {
			if(user.email===email.value){
				const div=document.createElement("div");
					div.innerHTML=`<div class="alert alert-danger" role="alert">Email ${email.value} has already been used</div>`
					const container = document.querySelector("#containerForm");
					const form = document.querySelector("#userForm");
					container.insertBefore(div, form);
					
	
					
					setTimeout(function () {
					document.querySelector(".alert").remove();
					}, 2000);
					email.value="";
					
					
	
				}else if(!re.test(email.value)){
           			email.classList.add("is-invalid");
				}else{
           		 email.classList.remove("is-invalid");
        		}
    	})
	}
	
    validatePassword(){
        const password=document.getElementById("password");
        const re=/^[a-zA-Z]{2,10}$/;

        if(!re.test(password.value)){
           password.classList.add("is-invalid");

        }else{
            password.classList.remove("is-invalid");
        }
    }
  
	//Show alert
	showAlert(message, className) {
		//Create element
		const div = document.createElement("div");
		//add classes
		div.className = `alert ${className}`;
		//Add textNode
		div.appendChild(document.createTextNode(message));
		//get parent
		const container = document.querySelector("#containerForm");
		//get Form
		const form = document.querySelector("#userForm");
		//Insert alert
		container.insertBefore(div, form);

		//Timeout  function
		setTimeout(function () {
			document.querySelector(".alert").remove();
		}, 2000);

	}

	//Clear all inputs
	clearInputs() {
		document.getElementById('name').value = "";
		document.getElementById('email').value = "";
		document.getElementById('password').value = "";
	}
}

class LocalStorage{
    //Get users from LS
	static getUsers(){
		let users;
		if(localStorage.getItem("users")===null){
			users=[];
		}else{
			users=JSON.parse(localStorage.getItem("users"));
		}
		return users;
	}
	//Add users to LS
	static addUser(user){
		const users=LocalStorage.getUsers();
		users.push(user);

		localStorage.setItem("users",JSON.stringify(users));

	}
	

	
}

	



//Instantiate UI
const ui=new UI();
//Event listeners

document.getElementById("name").addEventListener("blur",ui.validateUserName);
document.getElementById("email").addEventListener("blur",ui.validateEmail);
document.getElementById("password").addEventListener("blur",ui.validatePassword);

document.getElementById('userForm').addEventListener('submit', (e) => {
  //form values
  const userName = document.getElementById('name').value,
    email = document.getElementById('email').value,
    password = document.getElementById('password').value


  //Instantiate a user
  const user = new User(userName.toLowerCase(), email, password)

  
  

  //Validations
   ui.validateUserName();
   ui.validateEmail();
   ui.validatePassword();

    if(userName==="" || email==="" || password===""){
		//Error message
		ui.showAlert("Please complete all the fields");

	

	}else{
		 //Add to LS
		 LocalStorage.addUser(user);

		 //User added message
		 ui.showAlert("User added!","alert-success");

		 //Clear all input fields
		 ui.clearInputs();
	}
  e.preventDefault()
})


