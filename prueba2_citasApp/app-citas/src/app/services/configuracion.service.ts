import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {

  //Clave con la que se guardará la configuración
  private keyBorrarInicio = 'permitir_borrar_inicio';

  constructor() {}

  //Obtiene si se permite borrar citas desde el inicio
  async permitirBorrarInicio(): Promise<boolean> {
    const resultado = await Preferences.get({
      key: this.keyBorrarInicio
    });

  //Si no hay nada guardado, retorna false por defecto
    return resultado.value ? JSON.parse(resultado.value) : false;
  }

  //Guarda si se permite borrar citas desde el inicio
  async guardarPermitirBorrar(valor: boolean): Promise<void> {
    await Preferences.set({
      key: this.keyBorrarInicio,
      value: JSON.stringify(valor)
    });
  }
}
