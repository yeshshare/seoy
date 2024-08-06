import React, { useState, useEffect } from 'react';
import api from '../services/apiService';

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [changePassword, setChangePassword] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    const handleCreateUser = () => {
        setName('');
        setEmail('');
        setPassword('');
        setIsActive(true);
        setCurrentUserId(null);
        setChangePassword(false);
        setShowModal(true);
    };

    const handleEditUser = (user) => {
        setName(user.name);
        setEmail(user.email);
        setIsActive(user.isActive);
        setCurrentUserId(user.id);
        setChangePassword(false);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { name, email, isActive };

            if (currentUserId) {
                // Atualizar usuário
                if (changePassword && password) {
                    userData.password = password;
                }
                await api.put(`/api/users/${currentUserId}`, userData);
            } else {
                // Criar novo usuário
                if (!password) {
                    throw new Error('Senha é obrigatória ao criar um novo usuário');
                }
                userData.password = password;
                await api.post('/api/users/register', userData);
            }

            fetchUsers();
            setShowModal(false);
        } catch (error) {
            console.error('Erro ao salvar usuário:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await api.delete(`/api/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
        }
    };

    return (
        <div className="container mt-4">
            <button className="btn btn-primary mb-3" onClick={handleCreateUser}>
                Criar Novo Usuário
            </button>
            <ul className="list-group">
                {users.map((user) => (
                    <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {user.name} ({user.email})
                        <div>
                            <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEditUser(user)}>
                                Editar
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user.id)}>
                                Excluir
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{currentUserId ? 'Editar Usuário' : 'Criar Novo Usuário'}</h5>
                                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            placeholder="Nome"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="Email"
                                            className="form-control"
                                        />
                                    </div>
                                    {currentUserId ? (
                                        <>
                                            <div className="form-group form-check">
                                                <input
                                                    type="checkbox"
                                                    name="changePassword"
                                                    checked={changePassword}
                                                    onChange={(e) => setChangePassword(e.target.checked)}
                                                    className="form-check-input"
                                                />
                                                <label className="form-check-label" htmlFor="changePassword">
                                                    Alterar Senha
                                                </label>
                                            </div>
                                            {changePassword && (
                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required={changePassword} // Senha obrigatória se o checkbox estiver marcado
                                                        placeholder="Senha"
                                                        className="form-control"
                                                    />
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                name="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required // Senha obrigatória ao criar um novo usuário
                                                placeholder="Senha"
                                                className="form-control"
                                            />
                                        </div>
                                    )}
                                    <div className="form-group form-check">
                                        <input
                                            type="checkbox"
                                            name="isActive"
                                            checked={isActive}
                                            onChange={(e) => setIsActive(e.target.checked)}
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label" htmlFor="isActive">
                                            Ativo
                                        </label>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        {currentUserId ? 'Atualizar' : 'Salvar'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserPage;
