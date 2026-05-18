import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { IonButton, IonInput, IonText, IonTextarea, } from '@ionic/angular/standalone';
import { Aviso } from '../../models/model-aviso';
import { ServicioAvisosService } from '../../services/servicio-avisos';
import { FotoAvisoComponent } from '../../components/foto-aviso/foto-aviso.component';

@Component({
  selector: 'app-crear-aviso',
  templateUrl: './crear-aviso.page.html',
  styleUrls: ['./crear-aviso.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonInput, IonTextarea, IonButton, IonText, FotoAvisoComponent,],
})

export class CrearAvisoPage {
  // Datos del formulario
  titulo = '';
  descripcion = '';
  foto = '';

  // Se activa cuando el usuario intenta guardar
  formularioEnviado = false;

  constructor(
    private servicioAvisos: ServicioAvisosService,
    private navCtrl: NavController
  ) { }

  // Recibe la foto enviada desde el componente foto-aviso
  recibirFoto(fotoRecibida: string) {
    this.foto = fotoRecibida;
  }

  // Valida que el título tenga al menos 5 caracteres
  tituloInvalido(): boolean {
    return this.titulo.trim().length < 5;
  }

  // Valida que la descripción tenga al menos 20 caracteres
  descripcionInvalida(): boolean {
    return this.descripcion.trim().length < 20;
  }

  // Valida que exista una foto seleccionada
  fotoInvalida(): boolean {
    return this.foto.trim() === '';
  }

  // Limpia los campos del formulario
  limpiarFormulario() {
    this.titulo = '';
    this.descripcion = '';
    this.foto = '';
    this.formularioEnviado = false;
  }

  // Guarda el aviso si todos los datos son válidos
  async guardarAviso() {
    this.formularioEnviado = true;

    const tituloLimpio = this.titulo.trim();
    const descripcionLimpia = this.descripcion.trim();
    const fotoActual = this.foto || '';

    if (tituloLimpio.length < 5) {
      alert('El título debe tener mínimo 5 caracteres');
      return;
    }

    if (descripcionLimpia.length < 20) {
      alert('La descripción debe tener mínimo 20 caracteres');
      return;
    }

    if (fotoActual === '') {
      alert('Debes seleccionar una fotografía');
      return;
    }

    const nuevoAviso: Aviso = {
      id: Date.now(),
      titulo: this.titulo.trim(),
      descripcion: this.descripcion.trim(),
      fecha: new Date().toISOString(),
      foto: this.foto,
    };
    try {
      await this.servicioAvisos.guardarAviso(nuevoAviso);

      alert('Aviso guardado correctamente');

      this.titulo = '';
      this.descripcion = '';
      this.foto = '';
      this.formularioEnviado = false;

      this.navCtrl.navigateRoot('/home-avisos');
    } catch (error) {
      alert('Ocurrió un error al guardar el aviso');
      console.log(error);
    }
  }

  // Vuelve a la pantalla principal
  volver() {
    this.navCtrl.navigateRoot('/home-avisos');
  }
}