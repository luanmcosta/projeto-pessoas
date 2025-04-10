export interface Person {
  id: number;
  nome: string;
  status: 'DESAPARECIDO' | 'LOCALIZADO';
  urlFoto: string | null;
  idade: number;
  sexo: string;
  ultimaOcorrencia: {
    dtDesaparecimento: string;
    localDesaparecimentoConcat: string;
    ocorrenciaEntrevDesapDTO: {
      idade: number;
      vestimendasDesaparecido: string;
      ultimaVezVisto: string;
      informacaoAdicional: string;
    };
  };
}