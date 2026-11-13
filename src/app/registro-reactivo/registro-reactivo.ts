import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-registro-reactivo',
  imports: [ReactiveFormsModule],
  templateUrl: './registro-reactivo.html',
  styleUrl: './registro-reactivo.css'
})
export class RegistroReactivo {

  // ===== Construcción del formulario con FormGroup, FormControl y Validators =====
  registroForm = new FormGroup({

    nombre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),

    apellidos: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),

    correo: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]
    }),

    telefono: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[0-9]{10}$/)]
    }),

    contrasena: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    })
  });

  datosRegistrados: any = null;

  // ===== Atajos para usar cada campo en el HTML =====
  get nombre()     { return this.registroForm.controls.nombre; }
  get apellidos()  { return this.registroForm.controls.apellidos; }
  get correo()     { return this.registroForm.controls.correo; }
  get telefono()   { return this.registroForm.controls.telefono; }
  get contrasena() { return this.registroForm.controls.contrasena; }

  // Muestra el mensaje de error si el campo es inválido y el usuario ya lo tocó
  mostrarError(control: FormControl): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  // Muestra el mensaje "Válido" si el campo ya es correcto y el usuario ya lo tocó
  mostrarValido(control: FormControl): boolean {
    return control.valid && (control.touched || control.dirty);
  }

  // ===== Envío del formulario =====
  registrar(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    const datos = this.registroForm.getRawValue();
    console.log('Usuario registrado:', datos);

    this.datosRegistrados = {
      nombre: datos.nombre,
      apellidos: datos.apellidos,
      correo: datos.correo,
      telefono: datos.telefono
    };

    this.registroForm.reset();
  }
}