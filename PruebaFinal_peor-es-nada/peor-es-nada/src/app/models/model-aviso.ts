// Modelo que representa un aviso de la comunidad
export interface Aviso {
  id: number; // Identificador único del aviso
  titulo: string; // Título del aviso
  descripcion: string; // Descripción del aviso
  fecha: string; // Fecha en que se crea el aviso
  foto: string; // Foto del aviso guardada como texto
}