import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppPicturePipe } from './appPicture/appPicture.pipe';
import { MailSearchPipe } from './search/mail-search.pipe';
import { SearchPipe } from './search/search.pipe';
import { KeepTextLineBreaks } from './keepTextLineBreaks/keepTextLineBreaks.pipe';
import { MonthInFull } from './monthInFull/monthInFull.pipe';
import { ProfilePicturePipe } from './profilePicture/profilePicture.pipe';
import { SanitizeHtml } from './sanitizeHtml/sanitizeHtml.pipe';
import { SanitizeURL } from './sanitizeUrl/sanitizeUrl.pipe';
import { CurrencyFormatPipe } from './pt-BR/currency.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AppPicturePipe,
        MailSearchPipe,
        SearchPipe,
        KeepTextLineBreaks,
        MonthInFull,
        ProfilePicturePipe,
        SanitizeHtml,
        SanitizeURL,
        CurrencyFormatPipe
    ],
    exports: [
        AppPicturePipe,
        MailSearchPipe,
        SearchPipe,
        KeepTextLineBreaks,
        MonthInFull,
        ProfilePicturePipe,
        SanitizeHtml,
        SanitizeURL,
        CurrencyFormatPipe
    ]
})
export class PipesModule { }
