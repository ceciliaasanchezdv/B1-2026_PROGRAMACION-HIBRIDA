import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Aviso } from '../models/model-aviso';

@Injectable({
  providedIn: 'root',
})
export class ServicioAvisosService {
  // Llave donde se guardarán los avisos en Preferences
  private storageKey = 'avisos';

  constructor() { }

  // OBTENER
  // Obtiene la lista de avisos guardados
  async obtenerAvisos(): Promise<Aviso[]> {
    const resultado = await Preferences.get({ key: this.storageKey });

    // Si no hay avisos, retorna una lista vacía
    if (!resultado.value) {
      return [];
    }

    // Convierte el texto guardado en una lista de avisos
    return JSON.parse(resultado.value);
  }

  // GUARDAR
  // Guardar un nuevo aviso
  async guardarAviso(aviso: Aviso): Promise<void> {
    const avisos = await this.obtenerAvisos();

    // Agrega el aviso nuevo a la lista
    avisos.push(aviso);

    // Guarda la lista actualizada
    await Preferences.set({
      key: this.storageKey,
      value: JSON.stringify(avisos),
    });
  }

  // ELIMINAR
  // Eliminar un aviso según su id
  async eliminarAviso(id: number): Promise<void> {
    const avisos = await this.obtenerAvisos();

    // Crea una nueva lista sin el aviso eliminado
    const avisosActualizados = avisos.filter((aviso) => aviso.id !== id);

    // // Guarda la lista actualizada sin el aviso eliminado
    await Preferences.set({
      key: this.storageKey,
      value: JSON.stringify(avisosActualizados),
    });
  }
}
