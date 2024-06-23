import { Database } from './database.types';

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

  export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];
  
export type tipoVaga = 'Especial' | 'Normal'

export type Perfil = {
  id: number;
  email: string;
  password: string;
};

export type Vaga = {
  id: number;
  local: string;
  tipo: tipoVaga;
  status: boolean;
  plano: number;
};

export type Estacionamento = {
  id: number;
  nome: string;
};

export type Reserva = {
  id: number;
  idUser: string;
  idVaga: number;
  horaInicial: string;
  horaFim: string;
  local: string;
};

