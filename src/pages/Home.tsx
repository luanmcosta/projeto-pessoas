import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, MapPin, Calendar, Filter } from 'lucide-react';
import { getPersons } from '../services/api';
import type { Person, SearchParams } from '../types/api';
import { clsx } from 'clsx';

const Home = () => {
  const navigate = useNavigate();
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    pagina: 0,
    tamanhoPagina: 10,
    status: '',
    nome: '',
    idadeMin: undefined,
    idadeMax: undefined,
    sexo: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchPersons();
  }, [searchParams]);

  const fetchPersons = async () => {
    try {
      setLoading(true);
      const response = await getPersons(searchParams);
      setPersons(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching persons:', error);
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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Pessoas Desaparecidas</h1>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Buscar por nome..."
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={searchParams.nome}
                onChange={(e) => setSearchParams(prev => ({ ...prev, nome: e.target.value, pagina: 0 }))}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={clsx(
                "px-4 py-2 border rounded-lg flex items-center gap-2 transition-all duration-200",
                showFilters ? "bg-blue-50 border-blue-500 text-blue-700" : "bg-white hover:bg-gray-50"
              )}
            >
              <Filter size={20} />
              Filtros
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchParams.status}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, status: e.target.value, pagina: 0 }))}
                >
                  <option value="">Todos</option>
                  <option value="DESAPARECIDO">Desaparecidos</option>
                  <option value="LOCALIZADO">Localizados</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sexo
                </label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchParams.sexo}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, sexo: e.target.value, pagina: 0 }))}
                >
                  <option value="">Todos</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Idade Mínima
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchParams.idadeMin || ''}
                    onChange={(e) => setSearchParams(prev => ({ 
                      ...prev, 
                      idadeMin: e.target.value ? parseInt(e.target.value) : undefined,
                      pagina: 0 
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Idade Máxima
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchParams.idadeMax || ''}
                    onChange={(e) => setSearchParams(prev => ({ 
                      ...prev, 
                      idadeMax: e.target.value ? parseInt(e.target.value) : undefined,
                      pagina: 0 
                    }))}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {persons.map((person) => (
            <div
              key={person.id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              onClick={() => navigate(`/pessoa/${person.id}`)}
            >
              <div className="relative">
                <img
                  src={person.urlFoto || 'https://i.imgur.com/V4RclNb.png'}
                  alt={person.nome}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className={clsx(
                  'absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-md',
                  person.status === 'DESAPARECIDO' 
                    ? 'bg-red-500/90 text-white' 
                    : 'bg-green-500/90 text-white'
                )}>
                  {person.status}
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                  <User size={20} className="text-gray-500" />
                  {person.nome}
                </h3>
                <p className="text-gray-600 mb-4 font-medium">
                  {person.idade === 0 ? 'Idade não informada' : `${person.idade} anos`}
                </p>
                
                <div className="space-y-3 text-gray-600">
                  <p className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-gray-400" />
                    {formatDate(person.ultimaOcorrencia?.dtDesaparecimento)}
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <MapPin size={16} className="text-gray-400" />
                    {person.ultimaOcorrencia?.localDesaparecimentoConcat || 'Local não informado'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center gap-4">
        <button
          className="px-6 py-2 bg-blue-700 text-white rounded-lg disabled:opacity-50 transition-colors hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={searchParams.pagina === 0}
          onClick={() => setSearchParams(prev => ({ ...prev, pagina: Math.max(0, (prev.pagina || 0) - 1) }))}
        >
          Anterior
        </button>
        <span className="px-4 py-2 text-gray-700">
          Página {(searchParams.pagina || 0) + 1} de {totalPages}
        </span>
        <button
          className="px-6 py-2 bg-blue-700 text-white rounded-lg disabled:opacity-50 transition-colors hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={(searchParams.pagina || 0) >= totalPages - 1}
          onClick={() => setSearchParams(prev => ({ ...prev, pagina: (prev.pagina || 0) + 1 }))}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default Home;