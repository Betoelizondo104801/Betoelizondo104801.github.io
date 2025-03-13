import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchUsers();
    }, [page]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/usuarios?page=${page}&limit=10`);
            setUsers(res.data.data);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            toast.error('Error al obtener los usuarios');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4 text-center">Gestión de Usuarios</h2>
            <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Usuario</th>
                        <th className="border px-4 py-2">Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border text-center">
                            <td className="border px-4 py-2">{user.id}</td>
                            <td className="border px-4 py-2">{user.username}</td>
                            <td className="border px-4 py-2">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center space-x-2 mt-4">
                <button onClick={() => setPage(page > 1 ? page - 1 : 1)} disabled={page === 1} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                    Anterior
                </button>
                <span className="text-lg">Página {page} de {totalPages}</span>
                <button onClick={() => setPage(page < totalPages ? page + 1 : totalPages)} disabled={page === totalPages} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default UserManagement;
