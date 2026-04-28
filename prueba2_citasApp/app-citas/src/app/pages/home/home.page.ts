import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CitaComponent } from '../../components/cita/cita.component';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons } from '@ionic/angular/standalone';
import { Cita } from '../../models/cita.modelo';
import { CitasService } from '../../services/citas.service';
import { ConfiguracionService } from '../../services/configuracion.service'; // ← correcto

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonButtons, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, CitaComponent],
})

export class HomePage implements OnInit {
  citaActual: Cita | null = null; //Cita que se muestra en pantalla
  puedeEliminar: boolean = false; //Controla si se muestra el botón eliminar

  constructor(
    private citasSvc: CitasService,
    private configSvc: ConfiguracionService  // ← servicio, no página
  ) {}

  async ngOnInit(): Promise<void> {
    //Al iniciar carga una cita aleatoria y la configuración
    await this.citasSvc.iniciarBD();
    this.citaActual = await this.citasSvc.obtenerCitaAleatoria();
    this.puedeEliminar = await this.configSvc.permitirBorrarInicio();
}

  //Obtiene una nueva cita aleatoria del servicio
  async nuevaCita(): Promise<void> {
  const cita = await this.citasSvc.obtenerCitaAleatoria();

  if (cita) {
    this.citaActual = cita;
  }
}

  //Recibe el id desde el componente hijo y elimina la cita
  async onEliminarCita(id: number): Promise<void> {
  await this.citasSvc.eliminarCita(id);
  await this.nuevaCita();
 }
}