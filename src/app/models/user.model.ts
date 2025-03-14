export interface Usuario {
    id: number;
    tipo: 'Demandante' | 'Empleado';
    nif: string;
    nombre: string;
    primerApellido: string;
    segundoApellido?: string;
    genero: string;
    fechaNacimiento: Date;
    direccion: {
      calle: string;
      numero: string;
      puerta: string;
      codigoPostal: string;
      ciudad: string;
    };
    estudios?: { institucion: string; titulacion: string; fecha: Date }[];
    experiencia?: { empresa: string; puesto: string; fecha: Date }[];
  }
  