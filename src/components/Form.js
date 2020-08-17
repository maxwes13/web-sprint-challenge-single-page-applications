import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom"
import * as yup from "yup";
import axios from "axios";



export default function Form() {


      const [formState, setFormState] = useState({
        name: "",
        size: "",
        pepperoni: false,
        bacon: false,
        mushrooms: false,
        ham: false,
        instructions: ""
      });

      const [serverError, setServerError] = useState("");

      
      
      const [errors, setErrors] = useState({
            name: "",
      });
      
      const [post, setPost] = useState([]);

      const validateChange = (e) => {

        yup
          .reach(formSchema, e.target.name)
          .validate(e.target.name  ? e.target.value : null) 
          .then((valid) => {
      
            setErrors({
              ...errors,
              [e.target.name]: ""
            });
          })
          .catch((err) => {
            console.log(err);
      
            setErrors({
              ...errors,
              [e.target.name]: err.errors[0]
            });
          });
      };
      
        const formSubmit = e => {
            e.preventDefault();
            console.log("it's submitted");
       
        axios
          .post("https://reqres.in/api/users", formState)
          .then((res) => {
            console.log("success!", res.data);
            setPost(res.data);
      
            setServerError(null); 
      
            setFormState({
                name: "",
                size: "",
                pepperoni: "",
                bacon: "",
                mushrooms: "",
                ham: "",
                instructions: ""
            });
          })
          .catch((err) => {
          
            setServerError("oops! something happened!");
          });
        };
      
        const inputChange = (e) => {
            e.persist();
            const newFormData = {
              ...formState,
              [e.target.name]:
                e.target.type === "checkbox" ? e.target.checked : e.target.value
            };
          
            validateChange(e); 
            setFormState(newFormData); 
          };

          const formSchema = yup.object().shape({
            name: yup.string().min(2, "Minimum 2 characters").required("Name is required"),

            size: yup.string().oneOf(["8 inch", "12 inch", "16 inch", "24 inch"], "Please select size"),

            pepperoni: yup.boolean(),

            bacon: yup.boolean(),

            mushrooms: yup.boolean(),

            ham: yup.boolean(),

            instructions: yup.string(),
          });



        return ( 



        <form onSubmit={formSubmit}>
                {serverError ? <p className="error">{serverError}</p> : null}

            <label htmlFor="nameInput">
              Name
              <input 
                id="nameInput" 
                type="name" 
                name="name" 
                placeholder="Name" 
                value={formState.name} 
                onChange={inputChange} 
                />
              {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>
            <label htmlFor="size">
              What Size?
              <select 
                id="size" 
                type="size" 
                name="size" 
                placeholder="Email" 
                value={formState.size} 
                onChange={inputChange}>
                    <option value="choice">Choose a size</option>
                    <option value="8 inch">8 inch</option>
                    <option value="12 inch">12 inch</option>
                    <option value="16 inch">16 inch</option>
                    <option value="24 inch">24 inch</option>
              </select>
            </label>
            <label htmlFor="toppings">
                Toppings:
                <input
                id="pepperoni"
                type="checkbox"
                name="pepperoni"
                value={formState.pepperoni}
                onChange={inputChange}
                />Pepperoni
                <input
                id="bacon"
                type="checkbox"
                name="bacon"
                value={formState.bacon}
                onChange={inputChange}
                />Bacon
                <input
                id="mushrooms"
                type="checkbox"
                name="mushrooms"
                value={formState.mushrooms}
                onChange={inputChange}
                />Mushrooms
                <input
                id="ham"
                type="checkbox"
                name="ham"
                value={formState.ham}
                onChange={inputChange}
                />Ham
            </label>
            
            <label htmlFor="instructions">
                Special Instructions:
                <textarea
                    id="instructions" 
                    type="instructions" 
                    name="name" 
                    placeholder="Special Instructions" 
                    value={formState.instructions} 
                    onChange={inputChange} />
            </label>



            <button type="submit">
              Add to Order
            </button>
            <pre>{JSON.stringify(post, null, 2)}</pre>
          </form>


        );
}







