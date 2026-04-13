//Clase abstracta base
export abstract class FiguraGeometrica {
    nombre: string;
    
    constructor(nombre: string) {
        this.nombre = nombre;}

  //Método abstracto que todas las figuras deben implementar
  abstract calcularPerimetro(): number;
}

//Círculo
export class Circulo extends FiguraGeometrica {
  radio: number;

  constructor(radio: number) {
    super('Círculo');
    this.radio = radio;}

  //Perímetro = 2 * π * radio
  calcularPerimetro(): number {
    return 2 * Math.PI * this.radio;}
}

//Triángulo Escaleno
export class TrianguloEscaleno extends FiguraGeometrica {
  ladoA: number;
  ladoB: number;
  ladoC: number;

  constructor(ladoA: number, ladoB: number, ladoC: number) {
    super('Triángulo Escaleno');
    this.ladoA = ladoA;
    this.ladoB = ladoB;
    this.ladoC = ladoC;
  }

  //Perímetro = suma de los 3 lados
  calcularPerimetro(): number {
    return this.ladoA + this.ladoB + this.ladoC;
  }
}

//Triángulo Equilátero (hereda de TrianguloEscaleno)
export class TrianguloEquilatero extends TrianguloEscaleno {

  constructor(ladoA: number) {
    //Los 3 lados son iguales
    super(ladoA, ladoA, ladoA);
  }
}