import {Component, OnDestroy, OnInit} from '@angular/core';
import {IdService} from "../../services/id.service";
import {Subscription} from "rxjs";
import {Id} from "../../models/id.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-id',
  templateUrl: './id.component.html',
  styleUrls: ['./id.component.scss']
})
export class IdComponent implements OnInit, OnDestroy {

  idsList: Id[] = [];
  idsSubscription: Subscription;

  constructor(private idsService: IdService,
              private router: Router) { }

  ngOnInit(): void {
    this.idsSubscription = this.idsService.idsSubject.subscribe(
      (idsList: Id[]) => {
        this.idsList = idsList;
      }
    );
    this.idsService.emitIdsSubject();
  }

  ngOnDestroy() {
    this.idsSubscription.unsubscribe();
  }

  onNewId(){
    this.router.navigate(['ids', 'new']);
  }

  onDelete(id: number){
    this.idsService.removeIds(this.idsService.getIdsById(id));
  }

  onNewIds(){
    this.router.navigate(['/ids', 'new']);
  }

  get sortData(){
    return this.idsList.sort((a, b) => (a.website < b.website) ? -1 : 1 );
  }

}
