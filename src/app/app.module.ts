import { NgModule, ErrorHandler } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular'
import { MyApp } from './app.component'

import { AboutPage } from '../pages/about/about'
import { ListagemPage } from '../pages/listagem/listagem'
import { HomePage } from '../pages/home/home'
import { TabsPage } from '../pages/tabs/tabs'
import { CriarBanheiroPage } from '../pages/criar-banheiro/criar-banheiro'
import { BanheiroInfoPage } from '../pages/banheiro-info/banheiro-info'
import { TestePage } from '../pages/teste/teste'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { Geolocation } from '@ionic-native/geolocation'
import { GoogleMaps } from '@ionic-native/google-maps'
import { AdMobFree } from '@ionic-native/admob-free'
import { HTTP } from '@ionic-native/http'
import { BanheirosProvider } from '../providers/banheiros/banheiros'
import { MapsProvider } from '../providers/maps/maps'
import { UserProvider } from '../providers/user/user'
import { IonicStorageModule } from '@ionic/storage'
import { RatesProvider } from '../providers/rates/rates'

import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database'

import { StarRatingModule } from 'angular-star-rating'

export const firebaseConfig = {
  apiKey: "AIzaSyAMpPTtksWD6aqg0kI2MOswL6q5MiKk1a8",
  authDomain: "ipoo-here.firebaseapp.com",
  databaseURL: "https://ipoo-here.firebaseio.com",
  projectId: "ipoo-here",
  storageBucket: "",
  messagingSenderId: "883981288431"
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ListagemPage,
    HomePage,
    TabsPage,
    CriarBanheiroPage,
    BanheiroInfoPage,
    TestePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    StarRatingModule.forRoot(),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ListagemPage,
    HomePage,
    TabsPage,
    CriarBanheiroPage,
    BanheiroInfoPage,
    TestePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    AdMobFree,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BanheirosProvider,
    MapsProvider,
    AngularFireDatabase,
    UserProvider,
    RatesProvider,
    StatusBar
  ]
})
export class AppModule {}
