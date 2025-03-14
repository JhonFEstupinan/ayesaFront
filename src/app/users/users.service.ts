import { Injectable } from '@angular/core';
import { Usuario } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usuarios: Usuario[] = [
    { 
      id: 1, tipo: 'Demandante', nif: '12345678A', nombre: 'Juan', 
      primerApellido: 'Pérez', genero: 'Masculino', fechaNacimiento: new Date(),
      direccion: { calle: 'Gran Vía', numero: 10, puerta: 'B', codigoPostal: '28001', ciudad: 'Madrid' },
      estudios: [{ institucion: 'UCM', titulacion: 'Informática', fecha: new Date() }]
    },
    { 
      id: 2, tipo: 'Empleado', nif: '87654321B', nombre: 'María', 
      primerApellido: 'Gómez', genero: 'Femenino', fechaNacimiento: new Date(),
      direccion: { calle: 'Serrano', numero: 20, puerta: '3A', codigoPostal: '28002', ciudad: 'Madrid' },
      experiencia: [{ empresa: 'Tech S.A.', puesto: 'Desarrollador', fecha: new Date() }]
    }
  ];

  private usuariosSubject = new BehaviorSubject<Usuario[]>(this.usuarios);
  usuarios$ = this.usuariosSubject.asObservable();

  constructor() {
    this.cargarUsuarios();
  }

  private cargarUsuarios() {
    const datos = localStorage.getItem('usuarios');
    this.usuarios = datos ? JSON.parse(datos) : [];
  }

  private guardarUsuarios() {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  agregarUsuario(usuario: Usuario) {
    usuario.id = this.usuarios.length + 1;
    this.usuarios.push(usuario);
    this.guardarUsuarios();
  }

  eliminarUsuario(id: number) {
    this.usuarios = this.usuarios.filter(u => u.id !== id);
    this.guardarUsuarios();
  }

  obtenerUsuarios() {
    return this.usuarios$;
  }

  actualizarUsuario(id: number, usuarioActualizado: Usuario) {
    const index = this.usuarios.findIndex(u => u.id === id);
    if (index !== -1) {
      this.usuarios[index] = usuarioActualizado;
      this.usuariosSubject.next(this.usuarios);
    }
  }

  obtenerUsuarioPorId(id: number) {
    return this.usuarios.find(u => u.id === id);
  }
}
