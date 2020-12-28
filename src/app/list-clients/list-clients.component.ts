import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {Client} from '../models/Client.model';
import {ClientsService} from '../service/clients.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent  implements OnInit, OnDestroy {

  clients: Client[];
  clientsSubscription: Subscription;

  constructor(private clientsService: ClientsService, private router: Router) {
  }

  ngOnInit(): void {
    this.clientsSubscription = this.clientsService.clientSubject.subscribe(
      (client: Client[]) => {
        this.clients = client;
      }
    );
    this.clientsService.getClients();
    this.clientsService.emitClients();
  }

  onNewClient(): void {
    this.router.navigate(['/clients', 'new']);
  }

  onDeleteClient(client: Client): void {
    this.clientsService.removeClient(client);
  }

  onViewClient(id: number): void {
    this.router.navigate(['clients', 'view', id]);
  }

  ngOnDestroy(): void {
    this.clientsSubscription.unsubscribe();
  }

}
