import Header from "./components/header";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Success from "./success";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [activeSkillIndices, setActiveSkillIndices] = useState([]);
  const [skillList, setSkillList] = useState([]);

  const navigate = useNavigate();

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "ReactJS",
    "NodeJS",
    "Wordpress",
    "NextJS",
    "C++",
    "Java",
    "Python",
    "Git",
    "Github",
    "SQL",
    "PostgreSQL",
    "MongoDB",
    "ExpressJS",
  ];

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const handleSkillClick = (index) => {
    if (activeSkillIndices.includes(index)) {
      setActiveSkillIndices(activeSkillIndices.filter((i) => i !== index));
    } else {
      setActiveSkillIndices([...activeSkillIndices, index]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const first = document.querySelector(".first").value;
    const last = document.querySelector(".last").value;
    const email = document.querySelector(".email").value;
    const phone = document.querySelector(".phone").value;
    const pin = document.querySelector(".pin").value;
    const address = document.querySelector(".address").value;
    const state = document.querySelector(".state").value;
    const gender = document.querySelector(".gender").value;
    const fileInput = document.querySelector('input[type="file"]');

    if (state === "" && gender === "") {
      document.querySelector(".error").innerHTML = "Invalid State and Gender";
    } else if (gender === "") {
      document.querySelector(".error").innerHTML = "Invalid Gender";
    } else if (state === "") {
      document.querySelector(".error").innerHTML = "Invalid State";
    } else {
      document.querySelector(".error").innerHTML = "";

      const selectedSkills = activeSkillIndices.map((index) => skills[index]);

      const formData = new FormData();
      formData.append("firstName", first);
      formData.append("lastName", last);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("state", state);
      formData.append("pin", pin);
      formData.append("address", address);
      formData.append("gender", gender);
      formData.append("skills", selectedSkills.join(", "));

      if (fileInput.files.length > 0) {
        formData.append("resume", fileInput.files[0]);
      }

      try {
        const result = await axios.post(
          "https://job-application-form-2.onrender.com/apply",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(result.data);
        navigate("/success");
      } catch (error) {
        if (error.response.status === 400) {
          document.querySelector(".error").innerHTML = "Alredy Applied";
        } else {
          document.querySelector(".error").innerHTML = "Server Error";
          console.log(error);
        }
      }
    }
  };

  return (
    <div>
      <Header />
      <h1 className="text-4xl font-bold font-mont text-slate-800 text-center mt-5">
        Software Developer Intern
      </h1>
      <h1 className="text-xl font-mont text-slate-600 text-center mt-3">
        Application Form
      </h1>
      <div className="error text-center w-1/3 mt-5 p-3 text-red-700 font-medium text-lg m-auto"></div>
      <form
        className="w-2/5 m-auto flex flex-col space-y-4 mt-5"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex space-x-4">
          <div className="flex flex-col w-1/2">
            <label className="mb-2">First Name:</label>
            <input
              placeholder="First Name"
              className="bg-blue-200 placeholder:text-blue-400 px-5 py-2 rounded-lg outline-none text-blue-600 font-semibold first"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="mb-2">Last Name:</label>
            <input
              placeholder="Last Name"
              className="bg-blue-200 placeholder:text-blue-400 px-5 py-2 rounded-lg outline-none text-blue-600 font-semibold last"
            />
          </div>
        </div>
        <div className="w-full flex space-x-4">
          <div className="flex flex-col w-1/2">
            <label className="mb-2">Email:</label>
            <input
              placeholder="Email"
              type="email"
              className="bg-blue-200 placeholder:text-blue-400 px-5 py-2 rounded-lg outline-none text-blue-600 font-semibold email"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="mb-2">Phone:</label>
            <input
              placeholder="Phone"
              type="tel"
              className="bg-blue-200 placeholder:text-blue-400 px-5 py-2 rounded-lg outline-none text-blue-600 font-semibold phone"
            />
          </div>
        </div>
        <div className="w-full flex space-x-4">
          <div className="flex flex-col w-1/2">
            <label className="mb-2">State:</label>
            <select className="bg-blue-200 text-blue-600 font-semibold px-5 py-2 rounded-lg outline-none state">
              <option value="">*Select a state*</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-1/2">
            <label className="mb-2">Postal Code:</label>
            <input
              placeholder="Postal Code"
              type="number"
              className="bg-blue-200 placeholder:text-blue-400 px-5 py-2 rounded-lg outline-none text-blue-600 font-semibold pin"
            />
          </div>
        </div>
        <div className="w-full flex space-x-4">
          <div className="flex flex-col w-1/2">
            <label className="mb-2">Address:</label>
            <input
              type="text"
              placeholder="Address"
              className="bg-blue-200 placeholder:text-blue-400 px-5 py-2 rounded-lg outline-none text-blue-600 font-semibold address"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="mb-2">Gender:</label>
            <select className="bg-blue-200 placeholder:text-blue-400 px-5 py-2 rounded-lg outline-none text-blue-600 font-semibold gender">
              <option value="">*Select a Gender*</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div>
          <label className="mb-2">Skills:</label>
          <ul className="flex flex-row flex-wrap gap-4">
            {skills.map((skill, index) => (
              <li key={index} className="flex">
                <div
                  onClick={() => handleSkillClick(index)}
                  className={`w-24 text-center p-2 rounded-lg cursor-pointer ${
                    activeSkillIndices.includes(index)
                      ? "bg-blue-500 text-blue-50"
                      : "bg-blue-200 text-blue-500"
                  }`}
                >
                  {skill}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex">
          <label className="mb-2">Resume:</label>
          <input type="file" className="ml-6" />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-blue-50 px-5 py-2 w-28 rounded-lg m-auto mt-20"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
