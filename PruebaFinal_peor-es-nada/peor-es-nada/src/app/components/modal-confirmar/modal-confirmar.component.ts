import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirmar',
  templateUrl: './modal-confirmar.component.html',
  styleUrls: ['./modal-confirmar.component.scss'],
  standalone: true,
})

export class ModalConfirmarComponent {
  // Avisa al componente padre que se canceló la eliminación
  @Output() cancelar = new EventEmitter<void>();

  // Avisa al componente padre que se confirmó la eliminación
  @Output() confirmar = new EventEmitter<void>();

  // Envía evento para cerrar sin borrar
  cancelarEliminacion() {
    this.cancelar.emit();
  }

  // Envía evento para confirmar el borrado
  confirmarEliminacion() {
    this.confirmar.emit();
  }
}