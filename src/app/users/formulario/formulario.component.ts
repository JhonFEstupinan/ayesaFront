import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/user.model';
import { UserService } from '../users.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  usuarioForm!: FormGroup;
  usuarioId!: number | null;
  esEdicion = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuarioForm = this.fb.group({
      tipo: ['', Validators.required],
      nif: ['', Validators.required],
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      genero: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      direccion: this.fb.group({
        calle: ['', Validators.required],
        numero: ['', Validators.required],
        puerta: [''],
        codigoPostal: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      estudios: this.fb.array([]),
      experiencia: this.fb.array([])
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.esEdicion = true;
        this.usuarioId = +id;
        const usuario = this.userService.obtenerUsuarioPorId(this.usuarioId);
        if (usuario) {
          this.usuarioForm.patchValue(usuario);
        }
      }
    });
  }

  guardarUsuario() {
    if (this.usuarioForm.invalid) {
      return;
    }

    if (this.esEdicion && this.usuarioId !== null) {
      this.userService.actualizarUsuario(this.usuarioId, this.usuarioForm.value);
    } else {
      this.userService.agregarUsuario(this.usuarioForm.value);
    }

    this.router.navigate(['/usuarios']);
  }
}
