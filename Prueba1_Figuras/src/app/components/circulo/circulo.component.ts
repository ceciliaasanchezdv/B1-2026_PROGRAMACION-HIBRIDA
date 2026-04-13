import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCardContent, IonInput, IonCard, IonImg, IonLabel, IonItem, IonCardTitle, IonCardHeader, IonCardSubtitle, IonButton } from "@ionic/angular/standalone";
import { Circulo } from '../../models/figuras';

@Component({
  selector: 'app-circulo',
  templateUrl: './circulo.component.html',
  styleUrls: ['./circulo.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonImg]
})

export class CirculoComponent {

  radio: number = 0;
  resultado: number | null = null;

  calcular() {
    const circulo = new Circulo(this.radio);
    this.resultado = circulo.calcularPerimetro();
  }
}
