"use client";

import React, { useState } from 'react';
import axios from 'axios';
import router from 'next/router';
import { redirect } from 'next/dist/server/api-utils';

export function Login({ setShowLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', { // API 경로는 제작후 넣을것
        email,
        password,
        // method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        // body: JSON.stringify({ email, password }),
      });

      // if (response.ok) {
      //   console.log(response);
      //   // 로그인 성공 처리
      //   setShowLogin(false);
      // } else {
      //   // 에러 처리
      //   console.error('Login failed');
      // }
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);


      window.location.href = '/list';
      console.log('a')

    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold mb-2">아이디</label>
          <input 
            id="email" 
            type="text" 
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="pw" className="block text-sm font-bold mb-2">비밀번호</label>
          <input 
            id="pw" 
            type="password" 
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            로그인
          </button>
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            회원가입
          </button> {/* 임시 땜빵용 이 부분은 회원가입 호출 연결로 바꿔야 함 */}
          <button 
            type="button" 
            onClick={() => setShowLogin(false)}
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            닫기
          </button>
        </div>
      </form>
    </div>
  );
}
