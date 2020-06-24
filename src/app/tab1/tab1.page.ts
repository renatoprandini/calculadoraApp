import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  valorUm: number;
  valorDois: number;
  resultado: number;

  constructor() {}

  public soma(){
    this.resultado = this.valorUm + this.valorDois;
  }

  public subtracao(){
    this.resultado = this.valorUm - this.valorDois;
  }

  public multiplicacao(){
    this.resultado = this.valorUm * this.valorDois;
  }

  public divisao(){
    this.resultado = this.valorUm / this.valorDois;
  }

  public limpar(){
    this.resultado = null;
    this.valorUm = null;
    this.valorDois = null;
  }
}
