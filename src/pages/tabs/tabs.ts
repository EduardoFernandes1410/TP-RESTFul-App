import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { ListagemPage } from '../listagem/listagem';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ListagemPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
