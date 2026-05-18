import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {IonButton,IonImg} from '@ionic/angular/standalone';
import { Aviso } from '../../models/model-aviso';

@Component({
  selector: 'app-aviso-card',
  templateUrl: './aviso-card.component.html',
  styleUrls: ['./aviso-card.component.scss'],
  standalone: true,
  imports: [CommonModule,IonButton,IonImg,],
})

export class AvisoCardComponent {
  // Recibe un aviso desde el componente padre
  @Input() aviso!: Aviso;

  // Envía el id del aviso que se quiere eliminar
  @Output() eliminar = new EventEmitter<number>();

  // Método que avisa al componente padre qué aviso eliminar
  eliminarAviso() {
    this.eliminar.emit(this.aviso.id);
  }
}
