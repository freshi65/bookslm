import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // this class encapsulates the interaction with the browser's localStorage

  // it makes sense, to store all persistent data of an app in one single object
  // to keep the storage clean and lucid
  private objName = 'Storage';

  constructor() {}

  /**
   * Reads the app's object from the storage, returns an empty object if nothing has been stored before.
   */
  private readStoreObject(): any {
    let obj = localStorage.getItem(this.objName);
    return obj !== null ? JSON.parse(obj) : {};
  }

  /**
   * Writes the object to the storage.
   * @param obj Object to be written.
   */
  private writeStoreObject(obj: any) {
    localStorage.setItem(this.objName, JSON.stringify(obj));
  }

  /**
   * Reads the JWT from the storage. returns an empty string, of no token is available.
   */
  getToken(): string {
    let store = this.readStoreObject();
    return store.token !== undefined ? store.token : '';
  }

  /**
   * Adds the token to the object in the storage.
   * @param token JWT to be stored.
   */
  setToken(token: string) {
    let store = this.readStoreObject();
    store['token'] = token;
    this.writeStoreObject(store);
  }

  /**
   * Performs a logout by deleting  token.
   */
  logout() {
    // delete both token and username
    let store = this.readStoreObject();
    delete store.token;

    this.writeStoreObject(store);
  }
}
