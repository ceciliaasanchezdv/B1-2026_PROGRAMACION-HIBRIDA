import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonImg, IonText } from '@ionic/angular/standalone';
import { TrianguloEscaleno } from '../../models/figuras';

@Component({
  selector: 'app-triangulo',
  templateUrl: './triangulo.component.html',
  styleUrls: ['./triangulo.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonImg, IonText]
})

export class TrianguloComponent {
  //Variables que almacenan los tres lados ingresados por el usuario
  ladoA: number = 0;
  ladoB: number = 0;
  ladoC: number = 0;
  //Resultado parte en null para no mostrarse hasta que se calcule
  resultado: number | null = null;

  calcular() {
    //Se instancia la clase TrianguloEscaleno con los lados ingresados (uso de POO)
    const triangulo = new TrianguloEscaleno(this.ladoA, this.ladoB, this.ladoC);
    //Se delega el cálculo del perímetro a la clase de dominio
    this.resultado = triangulo.calcularPerimetro();
  }
}
