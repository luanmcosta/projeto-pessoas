import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPersonById } from '../services/api';
import { Person } from '../types/api';
import { User, Calendar, MapPin, Info } from 'lucide-react';

const PersonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPerson(parseInt(id));
    }
  }, [id]);

  const fetchPerson = async (personId: number) => {
    try {
      setLoading(true);
      const data = await getPersonById(personId);
      setPerson(data);
    } catch (error) {
      console.error('Error fetching person details:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Data não informada';
    try {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return date.toLocaleString('pt-BR', options);
    } catch {
      return 'Data inválida';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-gray-600">Pessoa não encontrada</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="text-blue-700 hover:underline"
        >
          ← Voltar para lista
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={person.urlFoto || 'https://i.imgur.com/V4RclNb.png'}
            alt={person.nome}
            className="w-full h-64 object-cover"
          />
          <div
            className={`absolute top-4 right-4 px-4 py-2 rounded-full text-white font-semibold ${
              person.status === 'DESAPARECIDO' ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {person.status}
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-2">
              <User size={28} />
              {person.nome}
            </h1>
            <p className="text-xl text-gray-600">
              {person.idade === 0 ? 'Idade não informada' : `${person.idade} anos`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Informações do Desaparecimento</h2>
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-gray-600">
                    <Calendar size={18} />
                    Data: {formatDate(person.ultimaOcorrencia?.dtDesaparecimento)}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <MapPin size={18} />
                    Local: {person.ultimaOcorrencia?.localDesaparecimentoConcat || 'Local não informado'}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Última Ocorrência</h2>
                <div className="space-y-2 text-gray-600">
                  <p>Vestimentas: {person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimendasDesaparecido || 'Não informado'}</p>
                  <p>Última vez visto: {person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.ultimaVezVisto || 'Não informado'}</p>
                  <p>Informações adicionais: {person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.informacaoAdicional || 'Não informado'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => navigate(`/pessoa/${person.id}/informar`)}
              className="w-full md:w-auto px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 flex items-center justify-center gap-2"
            >
              <Info size={20} />
              Informar sobre esta pessoa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;