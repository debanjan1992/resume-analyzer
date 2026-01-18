import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  imports: [RouterModule],
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class App {
  private readonly translate = inject(TranslateService);

  constructor() {
    this.translate.setDefaultLang('en-US');

    const browserLang = this.translate.getBrowserCultureLang();
    const supportedLangs = ['en-US', 'es'];
    const langToUse =
      browserLang && supportedLangs.includes(browserLang)
        ? browserLang
        : 'en-US';

    this.translate.use(langToUse);
  }
}
