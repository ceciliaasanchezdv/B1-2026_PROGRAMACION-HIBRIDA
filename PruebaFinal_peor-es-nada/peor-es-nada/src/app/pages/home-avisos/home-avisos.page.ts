import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonButton } from '@ionic/angular/standalone';
import { Aviso } from '../../models/model-aviso';
import { ServicioAvisosService } from '../../services/servicio-avisos';
import { ListaAvisosComponent } from '../../components/lista-avisos/lista-avisos.component';
import { ModalConfirmarComponent } from '../../components/modal-confirmar/modal-confirmar.component';

@Component({
  selector: 'app-home-avisos',
  templateUrl: './home-avisos.page.html',
  styleUrls: ['./home-avisos.page.scss'],
  standalone: true,
  imports: [CommonModule, IonButton, ListaAvisosComponent, ModalConfirmarComponent,],
})

export class HomeAvisosPage implements OnInit {
  // Lista de avisos que se muestra en pantalla
  avisos: Aviso[] = [];

  // Controla si se están cargando los avisos
  cargando = true;

  // Controla si se muestra el modal
  mostrarModal = false;

  // Guarda temporalmente el id del aviso que se quiere eliminar
  idAvisoEliminar: number | null = null;

  constructor(private servicioAvisos: ServicioAvisosService,
    private navCtrl: NavController
  ) { }

  // Se ejecuta al cargar la pantalla
  ngOnInit() {
    this.cargarAvisos();
  }

  // Se ejecuta cada vez que se entra a esta pantalla. Carga los avisos al entrar a la pantalla
  ionViewWillEnter() {
    this.cargarAvisos();
  }

  // Obtiene los avisos guardados
  async cargarAvisos() {
    this.cargando = true;

    this.avisos = await this.servicioAvisos.obtenerAvisos();

    this.cargando = false;
  }

  // Navega a la pantalla crear aviso
  irCrearAviso() {
    this.navCtrl.navigateForward('/crear-aviso');
  }

  // Muestra el modal antes de eliminar
  eliminarAviso(id: number) {
    this.idAvisoEliminar = id;
    this.mostrarModal = true;
  }

  // Cierra el modal sin eliminar
  cancelarEliminacion() {
    this.idAvisoEliminar = null;
    this.mostrarModal = false;
  }

  // Elimina el aviso después de confirmar
  async confirmarEliminacion() {
    if (this.idAvisoEliminar !== null) {
      await this.servicioAvisos.eliminarAviso(this.idAvisoEliminar);
      await this.cargarAvisos();
    }

    this.idAvisoEliminar = null;
    this.mostrarModal = false;
  }
}