import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitasService } from '../../services/citas.service';
import { Cita } from '../../models/cita.modelo';
import { CitaComponent } from '../../components/cita/cita.component';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonLabel, IonItem, IonButton, IonList, IonButtons } from "@ionic/angular/standalone";

@Component({
  selector: 'app-gestionar-citas',
  templateUrl: './gestionar-citas.page.html',
  styleUrls: ['./gestionar-citas.page.scss'],
  imports: [RouterLink, IonButtons, CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, CitaComponent]
})

export class GestionarCitasPage implements OnInit {

  //Lista de citas que se mostrarán
  citas: Cita[] = [];

  //Variables para guardar lo que escribe el usuario
  nuevaFrase: string = '';
  nuevoAutor: string = '';

  //Mensajes de error para mostrar en la interfaz
  errorFrase: string = '';
  errorAutor: string = '';

  constructor(private citasService: CitasService) {}
    //Carga las citas al iniciar la página e inicia la BD
    async ngOnInit(): Promise<void> {
     await this.citasService.iniciarBD();
    await this.cargarCitas();
    }

  //Obtiene todas las citas del servicio
  async cargarCitas(): Promise<void> {
  this.citas = await this.citasService.obtenerCitas();
  }

  //Agrega una nueva cita
  async agregarCita(): Promise<void> {
    
    //Limpia mensajes anteriores
    this.errorFrase = '';
    this.errorAutor = '';

    //Elimina espacios innecesarios
    const frase = this.nuevaFrase.trim();
    const autor = this.nuevoAutor.trim();

    //Valida que la frase no esté vacía
    if (!frase) {
      this.errorFrase = 'La cita es obligatoria.';
    } else if (frase.length < 5) {
      this.errorFrase = 'La cita debe tener al menos 5 caracteres.';
    }

   // Valida que el autor no esté vacío
    if (!autor) {
      this.errorAutor = 'El autor es obligatorio.';
    } else if (autor.length < 2) {
      this.errorAutor = 'El autor debe tener al menos 2 caracteres.';
    }

    //Si hay errores, no agrega la cita
    if (this.errorFrase || this.errorAutor) {
      return;
    }

    //Construye el objeto Cita y lo pasa al servicio
    const nuevaCita: Cita = { id: 0, frase: this.nuevaFrase, autor: this.nuevoAutor};
  
    await this.citasService.agregarCita(nuevaCita);

    //Limpia los campos del formulario
    this.nuevaFrase = '';
    this.nuevoAutor = '';

    //Recarga la lista
    await this.cargarCitas();
  }

  //Elimina una cita
  async eliminarCita(id: number): Promise<void> {
  await this.citasService.eliminarCita(id);
  await this.cargarCitas();
 }
}

