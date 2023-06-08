import { NgModule } from '@angular/core';
import { GetSetAuthService } from './service/auth.service';
import { CurrencyRupiahPipe } from './pipe/currency.pipe';


@NgModule({
    imports: [],
    exports: [CurrencyRupiahPipe],
    declarations: [CurrencyRupiahPipe],
    providers: [GetSetAuthService],
})
export class SharedModule { }
