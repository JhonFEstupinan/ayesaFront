import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/user.model';
import { UserService } from '../users.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  usuarios: Usuario[] = [];
  filtroTipo: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.usuarios$.subscribe(data => this.usuarios = data);
  }

  eliminarUsuario(id: number) {
    if (confirm(`¿Está seguro de que desea borrar el usuario?`)) {
      this.userService.eliminarUsuario(id);
    }
  }

  filtrarUsuarios() {
    this.userService.usuarios$.subscribe(data => {
      this.usuarios = this.filtroTipo ? data.filter(u => u.tipo === this.filtroTipo) : data;
    });
  }
}
