import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
const navigate=useNavigate()
const startGame1=()=>{
  navigate("/startgame1")

}
  const [formData, setFormData] = useState({
    fname:'',
    lname:'',
    email: '',
    phone:'',
    password: '',
    confirmPassword: '',
    checkbox1:'',
    checkbox2:'',
    checkbox3:'',

  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData, [name] : value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = {}
    if(!formData.fname.trim()) {
        validationErrors.fname = "firstname is required";
    }
    if(!formData.lname.trim()) {
      validationErrors.lname = "lastname is required"
  }
    if(!formData.email.trim()) {
        validationErrors.email = "email is required"
    } else if(!/\S+@\S+\.\S+/.test(formData.email)){
        validationErrors.email = "email is not valid"
    }
    if(!formData.phone.trim()) {
      validationErrors.phone = "phone number is required"
  } 

    if(!formData.password.trim()) {
        validationErrors.password = "password is required"
    } else if(formData.password.length < 6){
        validationErrors.password = "password should be at least 6 char"
    }

    if(formData.confirmPassword !== formData.password) {
        validationErrors.confirmPassword = "password not matched"
    }

    if(!formData.checkbox1.trim()) {
      validationErrors.checkbox1 = "checkbox is required";
  }
   
  if(!formData.checkbox2.trim()) {
    validationErrors.checkbox2 = "checkbox is required";
}

if(!formData.checkbox3.trim()) {
  validationErrors.checkbox3 = "checkbox is required";
}
    setErrors(validationErrors)

    if(Object.keys(validationErrors).length === 0) {
        alert("Form Submitted successfully")
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Hello!</h2>
      <p>Register to Get Started</p>
      <div>
      <i class="fa-regular fa-user"></i>
        <input
          type="text"
          name="fname"
          placeholder='First Name'  
          autoComplete='off'  
          onChange={handleChange} 
          className='input'  
        />
          {errors.fname && <span>{errors.fname}</span>}  
      </div>
      <div>
  
      <i class="fa-regular fa-user"></i>
        <input
          type="text"
          name="lname"
          placeholder='Last Name'  
          autoComplete='off'  
          onChange={handleChange}   
          className='input'  
        />
          {errors.lname && <span>{errors.lname}</span>}  
      </div>
      <div>
      <i class="fa-regular fa-envelope"></i>
        <input
          type="email"
          name="email"
          placeholder='example@gmail.com'
          autoComplete='off'
          onChange={handleChange} 
          className='input'  
        />
          {errors.email && <span>{errors.email}</span>}  
      </div>

      <div>
  
      <i class="fa-solid fa-phone"></i>
  <input
    type="text"
    name="phone"
    placeholder='Mobile Number'  
    autoComplete='off'  
    onChange={handleChange}   
    className='input'  
  />
    {errors.phone && <span>{errors.phone}</span>}  
</div>

      <div>
      <i class="fa-solid fa-lock"></i>
        <input
          type="password"
          name="password"
          placeholder='******'
          onChange={handleChange} 
          className='input'  
        />
          {errors.password && <span>{errors.password}</span>}  
      </div>
      <div>
      <i class="fa-solid fa-lock"></i>
        <input
          type="password"
          name="confirmPassword"
          placeholder='******'
          onChange={handleChange} 
          className='input'  
        />
          {errors.confirmPassword && <span>{errors.confirmPassword}</span>}  
      </div>

      <div>
      <i class="fa-solid fa-globe"></i>
<input
  type="text"
  name="country"
  placeholder='country'
  onChange={handleChange} 
  className='input'  
/>

</div>


<div className="form-check">
 
    <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={handleChange} name="checkbox1"/>
  
    <label className="form-check-label" for="exampleCheck1">i agree to the processing of personal data 
    according to <a href="">PRIVACY POLICY</a></label><br/>
    {errors.checkbox1 && <span>{errors.checkbox1}</span>}
  </div>

 

  


 




      <button onClick={startGame1} className='btn btn-primary w-100 mt-3' type="submit">Submit</button>
      <div className='text-center'>
      <p>Already have on Account? <a href=''>Sign in</a></p>
      </div>
    </form>
  );
};

export default RegisterForm;
