import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Icontact } from '../model/icontact';
import { Igroup } from '../model/igroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private serverurl: string = `http://localhost:9000`; //json server url

  constructor(private httpclient: HttpClient) { }


  // Get-all Conatacts
  public getAllContacts(): Observable<Icontact[]> {
    let dataURL: string = `${this.serverurl}/contacts`;
    return this.httpclient.get<Icontact[]>(dataURL).pipe(catchError(this.handleError));
  }

 
  //Get single Contact
  public getContact(conatctId: string): Observable<Icontact> {
    let dataURL: string = `${this.serverurl}/contacts/${conatctId}`;
    return this.httpclient.get<Icontact>(dataURL).pipe(catchError(this.handleError));
  }
 
  //Create Contact
  public createContact(contact: Icontact): Observable<Icontact> {
    let dataURL: string = `${this.serverurl}/contacts`;
    return this.httpclient.post<Icontact>(dataURL, contact).pipe(catchError(this.handleError));

  }


  // Update Contact
  public updateContact(contactId: string, conatct: Icontact): Observable<Icontact> {
    let dataURL: string = `${this.serverurl}/contacts/${contactId}`;

    return this.httpclient.put<Icontact>(dataURL, conatct).pipe(catchError(this.handleError));
  }


  
  //Delete Contact
  public deleteContact(contactId: string): Observable<{}> {
    let dataURL: string = `${this.serverurl}/contacts/${contactId}`;
    return this.httpclient.delete<{}>(dataURL).pipe(catchError(this.handleError));
  }

// For serch data 
  searchContacts(query: string): Observable<Icontact[]> {
    let dataURL:string=`${this.serverurl}/search?q=${query}`;
   return this.httpclient.get<Icontact[]>(this.serverurl).pipe(catchError(this.handleError));
    
  }

  


  // Get-all Groups
  public getAllGroups(): Observable<Igroup[]> {
    let dataURL: string = `${this.serverurl}/groups`;
    return this.httpclient.get<Igroup[]>(dataURL).pipe(catchError(this.handleError));
  }


  //Get single Groups
  public getGroups(contact: Icontact): Observable<Igroup> {
    let dataURL: string = `${this.serverurl}/groups/${contact.groupId}`;
    return this.httpclient.get<Igroup>(dataURL).pipe(catchError(this.handleError));
  }



  // error handaling
  public handleError(error: HttpErrorResponse) {
    let errrorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      //client Side
      errrorMessage = 'Error : ${error.error.errrorMessage}'
    } else {
      //server side
      errrorMessage = 'Status : ${error.Status} \n Message : ${error.Message}'
    }
    return throwError(errrorMessage);

  }
}



