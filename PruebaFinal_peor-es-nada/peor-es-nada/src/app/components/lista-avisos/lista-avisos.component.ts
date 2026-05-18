import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonText, IonList, IonItem } from '@ionic/angular/standalone';
import { Aviso } from '../../models/model-aviso';
import { AvisoCardComponent } from '../aviso-card/aviso-card.component';

@Component({
  selector: 'app-lista-avisos',
  templateUrl: './lista-avisos.component.html',
  styleUrls: ['./lista-avisos.component.scss'],
  standalone: true,
  imports: [CommonModule, IonText, IonList, IonItem, AvisoCardComponent],
})
export class ListaAvisosComponent {
  // Lista de avisos recibida desde la pantalla principal
  @Input() avisos: Aviso[] = [];

  // Envía el id del aviso que se quiere eliminar
  @Output() eliminar = new EventEmitter<number>();

  // Pasa el id del aviso al componente padre
  eliminarAviso(id: number) {
    this.eliminar.emit(id);
  }
}
