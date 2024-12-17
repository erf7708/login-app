import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import "./LoginForm.css";
import logo from "../assets/logo.png";
import icon from "../assets/icon.png";

const schema = yup.object().shape({
  username: yup.string().required("نام کاربری الزامی است"),
  password: yup.string().required("رمز عبور الزامی است"),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      const { username, password } = data; 
      const response = await axios.post("https://cicd.datamoon.ir/api/users/auth", {
        username,
        password,
      });
      if(response?.data?.result){
        alert(`ورود موفقیت‌آمیز بود خوش آمدید!`);
      }
    } catch (error) {
      if(error.response?.data?.result == false){
        alert(`ورود با شکست مواجحه شد!`);
      }
    }
  };

  return (
    <div className={`container ${darkMode ? "dark-mode" : ""}`}>
        <button className="dark-mode-toggle " onClick={toggleDarkMode}>
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className="card">
        <div className="card-header">
          <h1>ورود</h1>
          <img src={icon} alt="آیکون" className="icon" width={100} height={30} />
        </div>
        <p className="welcome-text">
          به <span> سامانه ثبت تردد </span> خوش آمدید
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <input
              type="text"
              placeholder="نام کاربری"
              {...register("username")}
            />
            <i className="fas fa-user input-icon"></i>
            <p className="error-message">{errors.username?.message}</p>
          </div>

          <div className="input-group password-group">
          <span className="toggle-password" onClick={togglePasswordVisibility}>
              <i className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"} input-icon`}></i>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="رمز عبور"
              {...register("password")}
            />
            
            <p className="error-message">{errors.password?.message}</p>
          </div>

          <div className="input-group">
            <i className="fas fa-globe input-icon"></i>
            <select>
              <option>فارسی</option>
              <option>English</option>
            </select>
          </div>

          <div className="input-group">
            <select>
              <option>آبی</option>
              <option>قرمز</option>
            </select>
            <i className="fas fa-palette input-icon"></i>
          </div>

          <div className="remember">
            <input type="checkbox" id="remember" defaultChecked />
            <label htmlFor="remember">مرا به خاطر بسپار</label>
          </div>

          <button type="submit">ورود</button>
        </form>
      </div>

      <div className="brand-container">
        <p className="brand-title">هوش داده مهتاب</p>
        <p className="website">www.datamoon.ir</p>
      </div>

      <div className="left-section">
        <img src={logo} alt="لوگو" className="logo" />
      </div>
    </div>
  );
};

export default LoginForm;
