import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { IonButton, IonImg } from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-foto-aviso',
  templateUrl: './foto-aviso.component.html',
  styleUrls: ['./foto-aviso.component.scss'],
  standalone: true,
  imports: [CommonModule, IonButton, IonImg],
})

export class FotoAvisoComponent {
  // Input para seleccionar imagen desde archivos
  @ViewChild('inputFoto') inputFoto!: ElementRef<HTMLInputElement>;

  // Input para intentar tomar foto desde navegador móvil
  @ViewChild('inputCamara') inputCamara!: ElementRef<HTMLInputElement>;

  // Foto recibida desde el formulario padre. Foto que se muestra en pantalla
  @Input() foto = '';

  // Envía la foto al componente padre
  @Output() fotoCambiada = new EventEmitter<string>();

  // Toma foto en app móvil o intenta abrir cámara en navegador móvil
  async tomarFoto() {
    try {
      const imagen = await Camera.getPhoto({
        quality: 50,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      if (imagen.dataUrl) {
        this.foto = await this.reducirImagen(imagen.dataUrl);
        this.fotoCambiada.emit(this.foto);
      }
    } catch (error) {
      console.log('No se tomó foto', error);
    }
  }

  // Abre el selector de archivos
  seleccionarFoto() {
    this.inputFoto.nativeElement.click();
  }

  // Carga la imagen seleccionada
  cargarFoto(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const archivo = input.files[0];
    const lector = new FileReader();

    lector.onload = async () => {
      const imagenBase64 = lector.result as string;

      // Reducimos la imagen antes de guardarla
      this.foto = await this.reducirImagen(imagenBase64);

      // Enviamos la foto al formulario
      this.fotoCambiada.emit(this.foto);
    };

    lector.readAsDataURL(archivo);
  }

  // Quita la imagen seleccionada
  quitarFoto() {
    this.foto = '';

    // Avisa al padre que ya no hay foto
    this.fotoCambiada.emit('');

    if (this.inputFoto) {
      this.inputFoto.nativeElement.value = '';
    }

    if (this.inputCamara) {
      this.inputCamara.nativeElement.value = '';
    }
  }
  
  // Reduce el tamaño de la imagen para poder guardarla en Preferences
  reducirImagen(imagenBase64: string): Promise<string> {
    return new Promise((resolve) => {
      const imagen = new Image();

      imagen.onload = () => {
        const canvas = document.createElement('canvas');

        const maxAncho = 400;
        const maxAlto = 400;

        let ancho = imagen.width;
        let alto = imagen.height;

        if (ancho > alto && ancho > maxAncho) {
          alto = alto * (maxAncho / ancho);
          ancho = maxAncho;
        } else if (alto > maxAlto) {
          ancho = ancho * (maxAlto / alto);
          alto = maxAlto;
        }

        canvas.width = ancho;
        canvas.height = alto;

        const contexto = canvas.getContext('2d');
        contexto?.drawImage(imagen, 0, 0, ancho, alto);

        const imagenReducida = canvas.toDataURL('image/jpeg', 0.6);

        resolve(imagenReducida);
      };

      imagen.src = imagenBase64;
    });
  }
}
