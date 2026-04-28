import { Injectable } from '@angular/core';
import { Cita } from '../models/cita.modelo';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({providedIn: 'root'})

export class CitasService {

  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private dbLista: boolean = false;
  
  constructor() {}

  //Inicializa la base de datos
  async iniciarBD(): Promise<void> {
    //Evita abrir la base más de una vez
    if (this.dbLista) {
      return;
    }
  
    //Crea la conexión a la base de datos
    this.db = await this.sqlite.createConnection(
      'citasDB',
      false,
      'no-encryption',
      1,
      false
      );

      // Abre la base de datos
      await this.db.open();

      // Crea la tabla si no existe
      await this.db.execute(`
      CREATE TABLE IF NOT EXISTS citas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        frase TEXT NOT NULL,
        autor TEXT NOT NULL
        );
        `);
        
    //Inserta citas iniciales solo si la tabla está vacía
    const resultado = await this.db.query('SELECT COUNT(*) AS total FROM citas;');
    const total = resultado.values?.[0].total;

    if (total === 0) {
  await this.db.run(
    'INSERT INTO citas (frase, autor) VALUES (?, ?);',
    [
      'El éxito consiste en obtener lo que se desea. La felicidad en disfrutar lo que se obtiene.',
      'Ralph Waldo Emerson'
    ]
  );

  await this.db.run(
    'INSERT INTO citas (frase, autor) VALUES (?, ?);',
    [
      'Las personas no son recordadas por el número de veces que fracasan, sino por el número de veces que tienen éxito.',
      'Thomas Edison'
    ]
  );

  await this.db.run(
    'INSERT INTO citas (frase, autor) VALUES (?, ?);',
    [
      'Ningún viento es bueno para el barco que no sabe adónde va.',
      'Séneca'
    ]
  );
}

    this.dbLista = true;
  }

  //Devuelve todas las citas guardadas
  async obtenerCitas(): Promise<Cita[]> {
    await this.iniciarBD();

    const resultado = await this.db.query('SELECT * FROM citas;');
    return resultado.values as Cita[];
  }

  //Devuelve una cita aleatoria para mostrar en home
  async obtenerCitaAleatoria(): Promise<Cita | null> {
    const citas = await this.obtenerCitas();

    if (citas.length === 0) {
      return null;
    }

    const indice = Math.floor(Math.random() * citas.length);
    return citas[indice];
  }

  //Agrega una nueva cita
  async agregarCita(cita: Cita): Promise<void> {
    await this.iniciarBD();

    await this.db.run(
      'INSERT INTO citas (frase, autor) VALUES (?, ?);',
      [cita.frase, cita.autor]
    );
  }

  //Elimina una cita usando su id
  async eliminarCita(id: number): Promise<void> {
    await this.iniciarBD();

    await this.db.run(
      'DELETE FROM citas WHERE id = ?;',
      [id]
    );
  }
}