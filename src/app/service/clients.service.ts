import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import {Client} from '../models/Client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor() {
  }

  clients: Client [] = [];
  clientSubject = new Subject<Client[]>();

  emitClients(): void {
    this.clientSubject.next(this.clients);
  }

  saveClients(): void {
    firebase.default.database().ref('/clients').set(this.clients);
  }

  // tslint:disable-next-line:typedef
  getClients() {
    firebase.default.database().ref('/clients')
      .on('value', (data) => {
        this.clients = data.val() ? data.val() : [];
        this.emitClients();
      });
  }

  // tslint:disable-next-line:typedef
  getSingleClient(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.default.database().ref('/clients/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createClient(newClient: Client): void {
    this.clients.push(newClient);
    this.saveClients();
    this.emitClients();
  }

  // tslint:disable-next-line:typedef
  removeClient(client: Client) {
    if (client.photo) {
      const storageRef = firebase.default.storage().refFromURL(client.photo);
      storageRef.delete().then(
        () => {
          console.log('photo supprimée!');
        }
      ).catch(
        (error) => {
          console.log('fichier non trouvé : ' + error);
        }
      );
    }
    const clientIndexToRemove = this.clients.findIndex(
      (clientEle) => {
        if (clientEle === client) {
          return true;
        }
      }
    );
    this.clients.splice(clientIndexToRemove, 1);
    this.saveClients();
    this.emitClients();
  }

  // tslint:disable-next-line:typedef
  uploadFile(file: File) {
    return new Promise(
      (resolve, rejects) => {
        const uniqueFileName = Date.now().toString();
        const upload = firebase.default.storage().ref()
          .child('images/' + uniqueFileName + file.name)
          .put(file);
        upload.on(firebase.default.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('changement...');
          },
          (error) => {
            console.log('erreur de chargement : ' + error);
            rejects();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
}
