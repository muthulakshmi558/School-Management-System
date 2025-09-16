import React, { useState, useEffect } from 'react';
import { getSchools, getStudents, getTeachers, getSubjects } from '../api/axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiAward } from 'react-icons/fi';

const Home = () => {
  const [stats, setStats] = useState({ schools: 0, students: 0, teachers: 0, subjects: 0 });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    Promise.all([getSchools(), getStudents(), getTeachers(), getSubjects()])
      .then(([schoolsRes, studentsRes, teachersRes, subjectsRes]) => {
        setStats({
          schools: schoolsRes.data.length,
          students: studentsRes.data.length,
          teachers: teachersRes.data.length,
          subjects: subjectsRes.data.length,
        });
        // Sample chart data: Students per school (mock for demo; fetch real if needed)
        setChartData([
          { school: 'School A', students: 50 },
          { school: 'School B', students: 30 },
          { school: 'School C', students: 40 },
        ]);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Welcome to School Management System</h1>
          <p className="text-lg text-gray-600">Dashboard to showcase your talent!</p>
          <FiAward className="mx-auto text-6xl text-yellow-500 mt-4" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-primary">{stats.schools}</h3>
            <p className="text-gray-600">Schools</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-secondary">{stats.students}</h3>
            <p className="text-gray-600">Students</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-green-600">{stats.teachers}</h3>
            <p className="text-gray-600">Teachers</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-purple-600">{stats.subjects}</h3>
            <p className="text-gray-600">Subjects</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Students per School</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="school" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="students" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;