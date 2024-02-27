import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { Neo4jd3Options, Highlight } from '../../../../common/components/charts/neo4jd3/models/neo4jd3-options.model';
import { BsEventsService } from '../../../../common/services/bs-events.service/bs-events.service';
import { Subscription } from 'rxjs';
import { latLng, LatLng } from 'leaflet';
declare var $: any;
import { gradativeIncreasedScam } from '../../../../../assets/gradative-increased-scam';


@Component({
  selector: 'zr-health-investigation-alerts',
  templateUrl: './health-investigation-alerts.component.html',
  styleUrls: ['./health-investigation-alerts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BsEventsService],
  animations: [routerTransition()]
})
export class HealthInvestigationAlertsComponent implements OnInit, OnDestroy {

  showAlert: Boolean[];
  suspectBoardOptions: Neo4jd3Options;
  alertFraudSharedLocationOptions: Neo4jd3Options;
  gradativeIncreasedScam: any;

  markers: LatLng[] = [];

  private onCllapsibleShownSubject: Subscription;

  // bubble
  bubble: any;

  constructor(private cd: ChangeDetectorRef, private bsEventsService: BsEventsService) {
    this.gradativeIncreasedScam = gradativeIncreasedScam;

    this.showAlert = [false, false, false, false, false, false];
  }

  onShowAlert(index: number) {

    this.showAlert[index] = !this.showAlert[index];

  }

  ngOnInit() {

    this.onCllapsibleShownSubject = this.bsEventsService.onCollapsibleShown().subscribe((event: any) => {
      if (event.target.id === 'group-of-rows-2') {

        this.makeAlertFraudSharedLocationChart();
        if (!this.cd['destroyed']) {
          this.cd.detectChanges();
        }
      }

      if (event.target.id === 'group-of-rows-4') {
        // console.log('shown: ' + event.target.id);

        const markers = [];
        const marker1 = latLng(-19.9227061, -43.9232844);
        const marker2 = latLng(-19.9260205, -43.9216318);
        const marker3 = latLng(-19.9236899, -43.9248302);
        const marker4 = latLng(-19.9240875, -43.9163805);
        const marker5 = latLng(-19.928397, -43.921528);
        const marker6 = latLng(-19.9268356, -43.9271538);

        markers.push(marker1);
        markers.push(marker2);
        markers.push(marker3);
        markers.push(marker4);
        markers.push(marker5);
        markers.push(marker6);

        this.markers = markers.slice(0);
        this.cd.detectChanges();
      }
    });

    this.makeHealthSuspectBoardChart();
  }

  ngOnDestroy() {
    this.cd.detach(); // do this

    // for me I was detect changes inside "subscribe" so was enough for me to just unsubscribe;
    // this.authObserver.unsubscribe();
  }

  private makeHealthSuspectBoardChart() {

    const highlights: Highlight[] = [];
    const highlight1 = new Highlight('Project', 'name', 'neo4jd3');
    const highlight2 = new Highlight('User', 'userId', 'eisman');
    highlights.push(highlight1);
    highlights.push(highlight2);

    const icons = new Map<string, string>();

    icons.set('Localização', 'map-marker-alt');
    icons.set('Prestador', 'user-md,doctor');
    icons.set('Medicamento', 'pills');
    icons.set('Tratamento', 'medkit');
    icons.set('Exame', 'vial,test');
    icons.set('Advogado', 'gavel,lawyer');
    icons.set('Laboratorio', 'vials,lab');

    const images = new Map<string, string>();
    images.set('Localização', 'assets/icons/icon-suspect.svg');
    images.set('Prestador', 'assets/icons/icon-suspect.svg');
    images.set('Medicamento', 'assets/icons/icon-suspect.svg');
    images.set('Tratamento', 'assets/icons/icon-suspect.svg');
    images.set('Exame', 'assets/icons/icon-suspect.svg');
    images.set('Advogado', 'assets/icons/icon-suspect.svg');
    images.set('Laboratorio', 'assets/icons/icon-suspect.svg');


    this.suspectBoardOptions = new Neo4jd3Options(0, [], highlights, icons, images, true, 60, '',
      'assets/neo4j-health-data.json', '', 25, '', true, null, null, null, null, null, null, null, true);
  }

  private makeAlertFraudSharedLocationChart() {

    const highlights: Highlight[] = [];
    const highlight1 = new Highlight('Project', 'name', 'neo4jd3');
    const highlight2 = new Highlight('User', 'userId', 'eisman');
    highlights.push(highlight1);
    highlights.push(highlight2);

    const icons = new Map<string, string>();
    icons.set('Localização', 'map-marker-alt');
    icons.set('Prestador', 'user-md,doctor');
    icons.set('Medicamento', 'pills');
    icons.set('Tratamento', 'medkit');
    icons.set('Exame', 'vial,test');
    icons.set('Advogado', 'gavel,lawyer');
    icons.set('Laboratorio', 'vials,lab');

    const images = new Map<string, string>();
    images.set('Localização', 'assets/icons/icon-suspect.svg');
    images.set('Prestador', 'assets/icons/icon-suspect.svg');
    images.set('Medicamento', 'assets/icons/icon-suspect.svg');
    images.set('Tratamento', 'assets/icons/icon-suspect.svg');
    images.set('Exame', 'assets/icons/icon-suspect.svg');
    images.set('Advogado', 'assets/icons/icon-suspect.svg');
    images.set('Laboratorio', 'assets/icons/icon-suspect.svg');


    this.alertFraudSharedLocationOptions = new Neo4jd3Options(0, [], highlights, icons, images, true, 60, '',
      'assets/neo4j-health-alert-shared-location-data.json', '', 25, '', true, null, null, null, null, null, null, null, true);
  }

  private makeDemoSuspectBoardChart() {

    const highlights: Highlight[] = [];
    const highlight1 = new Highlight('Project', 'name', 'neo4jd3');
    const highlight2 = new Highlight('User', 'userId', 'eisman');
    highlights.push(highlight1);
    highlights.push(highlight2);

    const icons = new Map<string, string>();
    icons.set('Api', 'gear');
    icons.set('BirthDate', 'birthday-cake');
    icons.set('Cookie', 'paw');
    icons.set('Email', 'at');
    icons.set('Git', 'git');
    icons.set('Github', 'github');
    icons.set('Ip', 'map-marker');
    icons.set('Issues', 'exclamation-circle');
    icons.set('Language', 'language');
    icons.set('Options', 'sliders');
    icons.set('Password', 'asterisk');
    icons.set('Phone', 'phone');
    icons.set('Project', 'folder-open');
    icons.set('SecurityChallengeAnswer', 'commenting');
    icons.set('User', 'user');
    icons.set('zoomFit', 'arrows-alt');
    icons.set('zoomIn', 'search-plus');
    icons.set('zoomOut', 'search-minus');

    const images = new Map<string, string>();
    images.set('Address', 'assets/icons/icon-suspect.svg');
    images.set('BirthDate', 'assets/icons/icon-suspect.svg');
    images.set('Cookie', 'assets/icons/icon-suspect.svg');
    images.set('CreditCard', 'assets/icons/icon-suspect.svg');
    images.set('Device', 'assets/icons/icon-suspect.svg');
    images.set('Email', 'assets/icons/icon-suspect.svg');
    images.set('Git', 'assets/icons/icon-suspect.svg');
    images.set('Github', 'assets/icons/icon-suspect.svg');
    images.set('icons', 'assets/icons/icon-suspect.svg');
    images.set('Ip', 'assets/icons/icon-suspect.svg');
    images.set('Issues', 'assets/icons/icon-suspect.svg');
    images.set('Language', 'assets/icons/icon-suspect.svg');
    images.set('Options', 'assets/icons/icon-suspect.svg');
    images.set('Password', 'assets/icons/icon-suspect.svg');
    images.set('Project|name|d3', 'assets/icons/icon-suspect.svg');
    images.set('Project|name|neo4j', 'assets/icons/icon-suspect.svg');
    images.set('Project|name|neo4jd3', 'assets/icons/icon-suspect.svg');
    images.set('User', 'assets/icons/icon-suspect.svg');


    this.suspectBoardOptions = new Neo4jd3Options(0, [], highlights, icons, images, true, 60, '',
      'assets/neo4j-health-data.json', '', 25, '', true, null, null, null, null, null, null, null, true);
  }
}
