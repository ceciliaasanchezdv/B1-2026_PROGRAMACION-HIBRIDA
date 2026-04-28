import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardContent, IonText, IonButton } from '@ionic/angular/standalone';
import { Cita } from '../../models/cita.modelo';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss'],
  imports: [CommonModule, IonButton, IonCard, IonCardContent, IonText]
})

export class CitaComponent {

  //Recibe una cita desde el pagina padre (home)
  @Input() cita!: Cita;
  //Decide si se muestra o no el botón eliminar
  @Input() mostrarbtnEliminar: boolean = false;
  //Envía al padre el id de la cita que se quiere eliminar
  @Output() eliminar = new EventEmitter<number>();

   //Método que avisa al padre que se debe eliminar esta cita
  eliminarCita(): void {
    if (this.cita.id !== undefined) {
    this.eliminar.emit(this.cita.id);
  }
 }
}
