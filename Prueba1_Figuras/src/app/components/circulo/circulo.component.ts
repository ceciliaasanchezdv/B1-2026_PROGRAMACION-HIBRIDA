import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCardContent, IonInput, IonCard, IonImg, IonLabel, IonItem, IonCardTitle, IonCardHeader, IonCardSubtitle, IonButton, IonText} from "@ionic/angular/standalone";
import { Circulo } from '../../models/figuras';

@Component({
  selector: 'app-circulo',
  templateUrl: './circulo.component.html',
  styleUrls: ['./circulo.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonImg, IonText]
})

export class CirculoComponent {
//Variable que almacena el radio ingresado por el usuario
  radio: number = 0;
//Resultado parte en null para no mostrarse hasta que se calcule
  resultado: number | null = null;

  calcular() {
  //Se instancia la clase Circulo con el radio ingresado (uso de POO)
    const circulo = new Circulo(this.radio);
  //Se delega el cálculo del perímetro a la clase de dominio
    this.resultado = circulo.calcularPerimetro();
  }
}
