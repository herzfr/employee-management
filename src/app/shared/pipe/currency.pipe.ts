import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rupiah'
})

export class CurrencyRupiahPipe implements PipeTransform {
    transform(value: number): any {
        let val = Math.ceil(value)
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 2,
        }).format(val);
    }
}