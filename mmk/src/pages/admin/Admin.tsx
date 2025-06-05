import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

interface CarData {
    id: string;
    nome: string;
    preco: string;
    ano: string;
    km: string;
    imagem: string;
    descricao: string;
}

export function Admin() {
    const [formData, setFormData] = useState<CarData>({
        id: '',
        nome: '',
        preco: '',
        ano: '',
        km: '',
        imagem: '',
        descricao: ''
    });
    const [carros, setCarros] = useState<CarData[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Carregar carros do localStorage quando o componente montar
        const savedCars = JSON.parse(localStorage.getItem('cars') || '[]');
        setCarros(savedCars);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Gerar ID único
        const newCar = {
            ...formData,
            id: Date.now().toString()
        };

        // Atualizar estado local e localStorage
        const updatedCars = [...carros, newCar];
        setCarros(updatedCars);
        localStorage.setItem('cars', JSON.stringify(updatedCars));

        // Limpar formulário
        setFormData({
            id: '',
            nome: '',
            preco: '',
            ano: '',
            km: '',
            imagem: '',
            descricao: ''
        });
        setPreviewImage(null);

        alert('Carro adicionado com sucesso!');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir este carro?')) {
            const updatedCars = carros.filter(car => car.id !== id);
            setCarros(updatedCars);
            localStorage.setItem('cars', JSON.stringify(updatedCars));
        }
    };

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                setPreviewImage(result);
                setFormData(prev => ({
                    ...prev,
                    imagem: result
                }));
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                setPreviewImage(result);
                setFormData(prev => ({
                    ...prev,
                    imagem: result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Painel Administrativo</h1>
                <button onClick={handleLogout} className="logout-button">
                    Sair
                </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                    <label htmlFor="nome">Nome do Carro:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="preco">Preço:</label>
                    <input
                        type="text"
                        id="preco"
                        name="preco"
                        value={formData.preco}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="ano">Ano:</label>
                    <input
                        type="text"
                        id="ano"
                        name="ano"
                        value={formData.ano}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="km">Quilometragem:</label>
                    <input
                        type="text"
                        id="km"
                        name="km"
                        value={formData.km}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="descricao">Descrição:</label>
                    <textarea
                        id="descricao"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div
                    className={`image-upload-area ${isDragging ? 'dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        id="imagem"
                        name="imagem"
                        accept="image/*"
                        onChange={handleFileInput}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="imagem">
                        {previewImage ? (
                            <img src={previewImage} alt="Preview" className="image-preview" />
                        ) : (
                            <div className="upload-placeholder">
                                <span>Arraste uma imagem ou clique para selecionar</span>
                            </div>
                        )}
                    </label>
                </div>

                <button type="submit" className="submit-button">
                    Adicionar Carro
                </button>
            </form>

            <div className="cars-list">
                <h2>Carros Cadastrados</h2>
                {carros.map(car => (
                    <div key={car.id} className="car-item">
                        <img src={car.imagem} alt={car.nome} className="car-thumb" />
                        <div className="car-info">
                            <h3>{car.nome}</h3>
                            <p>Preço: {car.preco}</p>
                            <p>Ano: {car.ano}</p>
                            <p>Quilometragem: {car.km}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(car.id)}
                            className="delete-button"
                        >
                            Excluir
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
} 