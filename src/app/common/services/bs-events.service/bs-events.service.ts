import { fromEvent, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable() export class BsEventsService {

    private static BS_COLLAPSIBLE_SHOWN = 'shown.bs.collapse';
    private static BS_COLLAPSIBLE_HIDDEN = 'hidden.bs.collapse';

    constructor() {
        this.registerEvent(BsEventsService.BS_COLLAPSIBLE_SHOWN);
        this.registerEvent(BsEventsService.BS_COLLAPSIBLE_HIDDEN);
    }

    onCollapsibleShown(): Observable<Event> {
        return fromEvent(document, BsEventsService.BS_COLLAPSIBLE_SHOWN);
    }
    onCollapsibleHidden(): Observable<Event> {
        return fromEvent(document, BsEventsService.BS_COLLAPSIBLE_HIDDEN);
    }

    private registerEvent(event) {
        let script = document.createElement('script');
        script.innerHTML = 'eventRelay(\'' + event + '\');';
        document.body.appendChild(script);
    }

}
