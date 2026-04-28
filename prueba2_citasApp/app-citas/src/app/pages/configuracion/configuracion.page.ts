import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonToggle, IonButtons, IonButton } from '@ionic/angular/standalone';
import { ConfiguracionService } from '../../services/configuracion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  imports: [RouterLink, IonButton, IonButtons, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonToggle]
})

export class ConfiguracionPage implements OnInit {

  //Variable que guarda si se puede borrar en inicio
  permitirBorrarInicio: boolean = false;

  constructor(private configuracionService: ConfiguracionService) {}

  //Al cargar la página, recupera el valor guardado en Preferences
  async ngOnInit(): Promise<void> {
    this.permitirBorrarInicio =
      await this.configuracionService.permitirBorrarInicio();
  }

  //Guarda el valor del toggle en Preferences
  async guardarConfiguracion(): Promise<void> {
    await this.configuracionService.guardarPermitirBorrar(
      this.permitirBorrarInicio
    );
  }
}