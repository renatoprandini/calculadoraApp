import { Component } from "@angular/core";
import { AlertController } from '@ionic/angular';

import { evaluate } from 'mathjs';

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  public calculo = ''; // vazia
  public resultado: string; // null

  private ponto = false; // começa o programa declarando que o ponto ainda não existe

  private operacoes = ['+', '-', "*", "/"]; // array com todas as operações




  constructor( public alertController: AlertController) {}



  public adicionarNumero(valor: string) {
    if(this.resultado) { // se houver um cálculo já resolvido no visor, ele apaga e começa de novo
      this.limpar();
    }


    this.calculo += valor; // adiciona um número no visor
    this.ponto = false; // deixa adicionar outro ponto
  }

  public adicionarPonto() {
    if (this.ponto){ // condição para se o ponto existir, não seja possível adicionar outro
      return;
    }

    this.ponto = true; // avisa o programa que o ponto foi adicionado
    this.calculo += '.'; // adiciona o ponto no visor
  }

  public adicionarOperacao(operacao) {
    if(this.resultado){
      this.calculo = this.resultado.toString(); // traz o resultado para o visor do cálculo, quando é pressionado o botão de alguma operação
      this.resultado = null; // limpa o resultado
    }


    const ultimo = this.calculo.slice(this.calculo.length - 1); // armazena o último caracter do visor na constante
    if (this.operacoes.indexOf(ultimo) > -1) { // condição para não ser possível adicionar dois operadores seguidos
      return;
    }

    this.ponto = false; // deixa adicionar outro ponto
    this.calculo += operacao; // adiciona um operador  
  }
  
  public calcular() {
    try {
      this.resultado = evaluate(this.calculo); // usa a biblioteca mathjs para efetuar o calculo
    } catch (e) { // confere se há erros
      this.resultado = ""; // limpa o resultado
      this.presentAlert('ERRO', 'Cálculo inválido! Verifique.') // avisa o usuário que houve um erro na conta
    }
  }
  

  public deletar() {
    const ultimo = this.calculo.slice(-1); // faz uma constante para armazenar o último número do visor
    if (ultimo == '.') {
      this.ponto = false; // se o ponto for apagado, ele avisa o programa que é possível colocar outro ponto
    }

    this.calculo = this.calculo.slice(0 , -1);  // tira o último caracter do visor 
  }

  public limpar() {
    this.calculo = ""; // limpa o visor da calculadora
    this.resultado = null; // limpa a tela de resultado
    this.ponto = false; // deixa adicionar outro ponto
  }

  async presentAlert(titulo: string, mensagem: string) {  // método para criação do alert
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }

}
