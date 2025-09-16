import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiBook, FiUsers, FiUser, FiSearch } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <FiBook /> School Management
          </Link>
          <ul className="flex space-x-6">
            <li><Link to="/" className="flex items-center space-x-1 hover:text-gray-200 transition"><FiHome /> <span>Home</span></Link></li>
            <li><Link to="/schools" className="flex items-center space-x-1 hover:text-gray-200 transition"><FiBook /> <span>Schools</span></Link></li>
            <li><Link to="/teachers" className="flex items-center space-x-1 hover:text-gray-200 transition"><FiUsers /> <span>Teachers</span></Link></li>
            <li><Link to="/students" className="flex items-center space-x-1 hover:text-gray-200 transition"><FiUser /> <span>Students</span></Link></li>
            <li><Link to="/subjects" className="flex items-center space-x-1 hover:text-gray-200 transition"><FiSearch /> <span>Subjects</span></Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;