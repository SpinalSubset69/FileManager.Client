function Email(email:string){
  if(email.length === 0){
    throw new Error('Must Provide An Email');
  }

  const valid = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);

  if(!valid.test(email)){
    throw new Error('Type A Valid Amail Address');
  }

}

function Password(password:string){
  if (password.length == 0) {
    throw new Error('Must Provide A Password')
  }

  if(password.length <= 6 || password.length >= 16){
    throw new Error('Password Lenght Must Be Between 6 And 16 Characters');
  }
}

function RepeatPassword(password:string, rePassword:string){
  if(rePassword !== password){
    throw new Error("Password's Doesn't Match");
  }
}


export const validateUserInfo = {
  Email,
  Password,
  RepeatPassword
}
