import { Database } from './database.types';

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

  export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

export type RootStackParamList = {
    Info: {
      id: number; 
  };
};

export type tipoVaga = 'Especial' | 'Normal'

export type Vaga = {
  id: number;
  local: string; // nome do estacionamento
  tipo: tipoVaga;
  status: boolean; // True = Disponível | False = Ocupada
  plano: number;
};

export type Perfil = {
  id: number;
  email: string;
  password: string;
};

export type Estacionamento = {
  id: number;
  nome: string;
};

export type Reserva = {
  id: number;
  idUser: number;
  idVaga: number;
  horaInicial: string;
  horaFim: string;
  local: string;
};

