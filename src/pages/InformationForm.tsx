import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { submitInformation } from '../services/api';
import { MapPin, Upload, Send } from 'lucide-react';

const InformationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    informacao: '',
    dataVisto: '',
    localVisto: '',
  });
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      setLoading(true);
      const data = new FormData();
      data.append('informacao', formData.informacao);
      data.append('dataVisto', formData.dataVisto);
      data.append('localVisto', formData.localVisto);

      if (files) {
        Array.from(files).forEach((file) => {
          data.append('fotos', file);
        });
      }

      await submitInformation(parseInt(id), data);
      alert('Informação enviada com sucesso!');
      navigate(`/pessoa/${id}`);
    } catch (error) {
      console.error('Error submitting information:', error);
      alert('Erro ao enviar informação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(`/pessoa/${id}`)}
          className="text-blue-700 hover:underline"
        >
          ← Voltar para detalhes
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Informar sobre Pessoa Desaparecida
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Informações
            </label>
            <textarea
              required
              className="w-full px-4 py-2 border rounded-lg"
              rows={4}
              value={formData.informacao}
              onChange={(e) => setFormData(prev => ({ ...prev, informacao: e.target.value }))}
              placeholder="Descreva as informações que você tem sobre esta pessoa..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data em que viu a pessoa
            </label>
            <input
              type="date"
              required
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.dataVisto}
              onChange={(e) => setFormData(prev => ({ ...prev, dataVisto: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Local onde viu a pessoa
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={formData.localVisto}
                onChange={(e) => setFormData(prev => ({ ...prev, localVisto: e.target.value }))}
                placeholder="Digite o endereço ou local..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fotos
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-700 hover:text-blue-800"
                  >
                    <span>Selecione arquivos</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      accept="image/*"
                      onChange={(e) => setFiles(e.target.files)}
                    />
                  </label>
                  <p className="pl-1">ou arraste e solte</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF até 10MB
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <Send size={20} className="mr-2" />
                Enviar Informação
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InformationForm;