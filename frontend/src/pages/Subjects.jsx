import React, { useState, useEffect } from 'react';
import { getSubjects, createSubject, getSchools } from '../api/axios';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: '', school: '' });
  const itemsPerPage = 5;

  useEffect(() => {
    fetchSubjects();
    fetchSchools();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await getSubjects();
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchSchools = async () => {
    try {
      const response = await getSchools();
      setSchools(response.data);
    } catch (error) {
      console.error('Error fetching schools:', error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleAddSubject = async () => {
    try {
      await createSubject(newSubject);
      setNewSubject({ name: '', school: '' });
      setIsModalOpen(false);
      fetchSubjects();
    } catch (error) {
      console.error('Error adding subject:', error);
    }
  };

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedSubjects = filteredSubjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Subjects</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search subjects..."
          value={search}
          onChange={handleSearch}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Add Subject
      </button>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">School</th>
            <th className="border p-2">Teachers</th>
          </tr>
        </thead>
        <tbody>
          {paginatedSubjects.map((subject) => (
            <tr key={subject.id}>
              <td className="border p-2">{subject.name}</td>
              <td className="border p-2">{subject.school_name || subject.school}</td>
              <td className="border p-2">{subject.teachers?.join(', ') || 'None'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 p-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage * itemsPerPage >= filteredSubjects.length}
          className="bg-gray-300 p-2 rounded"
        >
          Next
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">Add New Subject</h2>
            <input
              type="text"
              placeholder="Subject Name"
              value={newSubject.name}
              onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
              className="w-full p-2 mb-2 border"
            />
            <select
              value={newSubject.school}
              onChange={(e) => setNewSubject({ ...newSubject, school: e.target.value })}
              className="w-full p-2 mb-2 border"
            >
              <option value="">Select School</option>
              {schools.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white p-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubject}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subjects;