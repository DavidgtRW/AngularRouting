import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  server: {id: number, name: string, status: string};

  paramsSubcription: Subscription;

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {


    this.paramsSubcription = this.route.data
      .subscribe(
        (data: Data) => {
          this.server = data['server'] //Resolver's name
        }
      );
    // It was commented because I use a resolver for this. (Routing Component)
    // const id = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);

    // this.paramsSubcription = this.route.params.subscribe(
    //   (params: Params) => {
    //     this.server = this.serversService.getServer(+params['id']);

    //   }
    // );
  }

  ngOnDestroy() {
    this.paramsSubcription.unsubscribe();
  }

  onEdit () {
    this.router.navigate(['edit'], {relativeTo: this.route,
      queryParamsHandling: 'preserve'});
  }

}
