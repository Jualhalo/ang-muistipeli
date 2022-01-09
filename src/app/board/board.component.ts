import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  squares: any[];
  values: any[]; // tähän taulukkoon tallennetaan kirjaimet
  done: boolean; //tämä kertoo onko jo klikattu kahta alkiota
  firstMove: boolean; //tämä kertoo onko klikattu ensimmäistä alkiota
  firstSquareToCheck: number; //tähän tallennetaan ensimmäinen klikattu alkio
  secondSquareToCheck: number; //tähän tallennetaan toinen klikattu alkio
  moves: number; //pelaajan klikkausparien määrä tallennetaan tähän
  win: boolean; //tämä kertoo kun pelaaja on voittanut pelin

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  // newGame() -metodin suoritus käynnistää uuden pelin
  newGame() {
    // Kun uusi peli alkaa, pelin muuttujat alustetaan.
    // Squares-taulukkoon laitetaan 16 tyhjää paikkaa
    this.squares = Array(16).fill(null);

    // asetetaan values-taulukkoon kaksi kappaletta kirjaimia A-H
    this.values = ['A','A','B','B','C','C','D','D',
          'E','E','F','F','G','G','H','H'];

    // randomisoidaan kirjaimien paikka values-taulukossa
    for (let i = this.values.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.values[i], this.values[j]] = [this.values[j], this.values[i]];
    }
    // alustetaan muuttujat pelin alussa
    this.win = false;
    this.done = false;
    this.firstMove = false;
    this.moves = 0;
  }

  makeMove(index: number) {

    // Paikan johon kirjain laitetaan pitää olla tyhjä, eli null
    if (!this.squares[index] && !this.done) {
      if (!this.firstMove)
      {
        this.firstMove = true;
        // splice-metodi poistaa indeksistä alkion ja laittaa
        // tilalle yhden alkion joka tulee this.values -taulukosta
        this.squares.splice(index, 1, this.values[index]);
        // tallennetaan ensimmäinen klikattu alkio muuttujaan
        this.firstSquareToCheck = index;
        return;
      }
      this.squares.splice(index, 1, this.values[index]);
      // tallennetaan toinen klikattu alkio muuttujaan
      this.secondSquareToCheck = index;
      this.done = true;
      this.moves++;
      // viiveen päästä suoritetaan checkIfSquaresMatch -metodi
      setTimeout(() => {
        this.checkIfSquaresMatch(this.firstSquareToCheck, this.secondSquareToCheck)
      }, 500)     
    }
  }

  checkIfSquaresMatch(firstSquare, secondSquare) {
    // jos klikatut alkiot ovat pari, tarkistetaan checkFor Winner
    // -metodilla onko pelaaja voittanut pelin
    if (this.values[firstSquare] === this.values[secondSquare]) {
      this.checkForWinner();
    }
    // jos klikatut alkiot eivät ole pari, piiloitetaan ne
    else if (this.values[firstSquare] !== this.values[secondSquare]) {
      this.squares[firstSquare] = null;
      this.squares[secondSquare] = null;
    }
    // vaihdetaan nämä falseksi jotta pelaaja 
    // voi klikata uuden parin ruutuja
    this.firstMove = false;
    this.done = false;
  }

  checkForWinner() {
    // jos ei löydetä yhtään tyhjää ruutua,
    // katsotaan peli voitetuksi
    for (let i = 0; i< this.squares.length; i++)
    {
      if (this.squares[i] === null)
      {
        return;
      }
    }
    this.win = true;
  }
}
