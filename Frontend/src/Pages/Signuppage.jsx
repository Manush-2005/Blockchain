import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {useQuery} from "react-query";
import {
  Card,
  Spacer,
  Button,
  Input,
} from '@nextui-org/react';
const SignupForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    interests: [],
  });
 const id = useParams();

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { checked, value } = e.target;
    setFormData({
      ...formData,
      interests: checked
        ? [...formData.interests, value]
        : formData.interests.filter((interest) => interest !== value),
    });
  };

  const handleSubmit = async () =>{
    console.log(formData.interests);
    const response = await axios.post("http://127.0.0.1:8000/signupuserwithaddress",{
      "name":formData.name,
      "interests":formData.interests,
      "walletaddress":id.id
    });
    console.log(response.data);
    if(response.status === 200){
      window.location.href = "/home/" + id.id;
    };
  }

 
  return (
   
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
    
    <form className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      {step === 1 && (


        <div>
          <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800">Welcome</h1>
      <p className="text-md text-gray-600">Please sign up to continue.</p>
    </div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your name"
          />
          <button
            type="button"
            onClick={handleNext}
            className="mt-4 w-full px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            Next
          </button>
          
        </div>
      )}
  
        {step === 2 && (
        <>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">We want to understand you.</h1>
          <p className="text-md text-gray-600">Please select your interests</p>
        </div>
      
        <div className="mb-4 px-4 py-6 bg-white shadow-md rounded-lg">
          <span className="block text-gray-700 text-sm font-bold mb-4">Interests</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="interests"
                value="DAPP"
                onChange={handleCheckboxChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">DAPP</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="interests"
                value="NFT"
                onChange={handleCheckboxChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">NFT</span>
            </label>
          </div>
          <button
            type="button"
            className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </>
        )}
      </form>
    </div>
  );
};

export default SignupForm;