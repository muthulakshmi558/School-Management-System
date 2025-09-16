import React, { useState, useEffect } from 'react';
import { getSchools } from '../api/axios';
import { FiSearch, FiLoader } from 'react-icons/fi';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Schools = () => {
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    getSchools()
      .then(response => {
        setSchools(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSchools = filteredSchools.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage);

  const openModal = (school) => setSelectedSchool(school);
  const closeModal = () => setSelectedSchool(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FiLoader className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-primary mb-6">Schools</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search schools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Schools Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {currentSchools.map(school => (
            <div key={school.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer" onClick={() => openModal(school)}>
              <h2 className="text-xl font-bold text-primary mb-2">{school.name}</h2>
              <p className="text-gray-600 mb-4">{school.address}</p>
              <p className="text-sm text-green-600 font-semibold">Students: {school.students.length}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Modal for Details */}
        <Modal
          isOpen={!!selectedSchool}
          onRequestClose={closeModal}
          className="bg-white m-4 max-w-md mx-auto rounded-lg p-6 outline-none"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h2 className="text-2xl font-bold mb-4">{selectedSchool?.name}</h2>
          <p className="mb-4">{selectedSchool?.address}</p>
          <h3 className="font-bold mb-2">Students:</h3>
          <ul className="space-y-1">
            {selectedSchool?.students.map(student => (
              <li key={student.id} className="text-sm">{student.name}</li>
            ))}
          </ul>
          <button onClick={closeModal} className="mt-4 bg-primary text-white px-4 py-2 rounded">Close</button>
        </Modal>
      </div>
    </div>
  );
};

export default Schools;