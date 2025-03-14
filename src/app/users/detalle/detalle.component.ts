import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/user.model';
import { UserService } from '../users.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  usuario: Usuario | null = null;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.usuario = this.userService.obtenerUsuarioPorId(id) || null;
    }
  }
}