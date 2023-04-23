import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Icontact } from 'src/app/model/icontact';
import { Igroup } from 'src/app/model/igroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-vies-contact',
  templateUrl: './vies-contact.component.html',
  styleUrls: ['./vies-contact.component.css']
})
export class ViesContactComponent implements OnInit {

  public contactId: string | null = null;
  public loading: boolean = false;
  public contact: Icontact = {} as Icontact;
  public group: Igroup={} as Igroup;
  public errorMessage: string | null = null;

  constructor(private activatedroute: ActivatedRoute, private contactservice: ContactService) { }
  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((param: ParamMap) => {
      this.contactId = param.get('contactId');
    });

    if (this.contactId) {
      this.loading = true;
      this.contactservice.getContact(this.contactId).subscribe((data: Icontact) => {
        this.contact = data;
        this.loading = false;
        this.contactservice.getGroups(data).subscribe((data:Igroup)=>{
         this.group=data;
        });
      }, (error: string) => {
        this.errorMessage = error;
        this.loading = false;
      });
    }

  }
  
public isNotEmpty(){
  return Object.keys(this.contact).length>0 && Object.keys(this.group).length>0;
}

}
