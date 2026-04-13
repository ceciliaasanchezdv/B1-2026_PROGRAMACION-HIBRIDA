import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonImg 
} from '@ionic/angular/standalone';
import { TrianguloEscaleno } from '../../models/figuras';

@Component({
  selector: 'app-triangulo',
  templateUrl: './triangulo.component.html',
  styleUrls: ['./triangulo.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonImg]
})

export class TrianguloComponent {
  ladoA: number = 0;
  ladoB: number = 0;
  ladoC: number = 0;
  resultado: number | null = null;

  calcular() {
    const triangulo = new TrianguloEscaleno(this.ladoA, this.ladoB, this.ladoC);
    this.resultado = triangulo.calcularPerimetro();
  }
}
