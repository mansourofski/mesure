import {Component, OnInit} from '@angular/core';
import {ClientsService} from '../../service/clients.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from '../../models/Client.model';

@Component({
  selector: 'app-single-client',
  templateUrl: './single-client.component.html',
  styleUrls: ['./single-client.component.css']
})
export class SingleClientComponent implements OnInit {
  client: Client;

  constructor(private clientService: ClientsService,
              private  route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.client = new Client('', '', '', '', '');
    const id = this.route.snapshot.params['id'];
    this.clientService.getSingleClient(+id).then(
      (client: Client) => {
        this.client = client;
      }
    );
    console.log(this.client.photo);
  }

  onBack(): void {
    this.router.navigate(['/clients']);
  }
}
