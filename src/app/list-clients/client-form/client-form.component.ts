import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientsService} from '../../service/clients.service';
import {Router} from '@angular/router';
import {Client} from '../../models/Client.model';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private  clientService: ClientsService,
              private  router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.clientForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      adresse: ['', Validators.required]
    });
  }

  onSaveClient(): void {
    const gender = this.clientForm.get('gender').value;
    const nom = this.clientForm.get('nom').value;
    const prenom = this.clientForm.get('prenom').value;
    const dateNaissance = this.clientForm.get('dateNaissance').value;
    const adresse = this.clientForm.get('adresse').value;
    const newClient = new Client(gender, nom, prenom, dateNaissance, adresse);
    {
      newClient.photo = this.fileUrl;
    }
    console.log(newClient.photo);
    this.clientService.createClient(newClient);
    this.router.navigate(['clients']);
  }

  onUploadFile(file: File): void {
    this.fileIsUploading = true;
    this.clientService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event): void {
    this.onUploadFile(event.target.files[0]);
  }

}
