import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PromoterloginService } from 'src/app/services/promoterlogin.service';
import { Subscription } from 'rxjs';
import { Gig } from 'src/app/classes/gig';
import { Band } from 'src/app/models/band';
import { PromoterhomeService } from 'src/app/services/promoterhome.service';



@Component({
  selector: 'app-promoterhome',
  templateUrl: './promoterhome.component.html',
  styleUrls: ['./promoterhome.component.css']
})

export class PromoterhomeComponent implements OnInit {
  gigs = new Array<Gig>();
  createResponse: Subscription;
  lastStatus = 200;
  loginResponse: Subscription;
  promoterStats;
  promoter;
  allBands = new Array<Band>();
  gigId: number;
  emptyBandArray = new Array<Band>();


  constructor(private modalRef: BsModalRef, private modalService: BsModalService, private promoterLoginService: PromoterloginService,
      private promoterHomeService : PromoterhomeService) { }


  ngOnInit() {
        this.promoter = this.promoterLoginService.promoter;
        this.gigs = this.promoterLoginService.gigs;
        this.allBands = this.promoterLoginService.allBands;
        console.log(this.gigs);
  }

  openGig(template: TemplateRef<any>) {
      console.log(template);
      this.modalRef = this.modalService.show(template,
        {
          class: 'modal-dialog-centered modal-lg'
        });
  }

  openBand(template: TemplateRef<any>, id: number) {
    console.log(template);
    this.promoterHomeService.$bandsAtGig.length = 0;
    this.modalRef = this.modalService.show(template,
      {
        class: 'modal-dialog modal-dialog-centered modal-lg'
      });
      this.gigId = id;
      console.log(id);
      this.promoterHomeService.bandExists(this.gigId);
      

  }
  
  inviteBands(gigId: number, bandId: number){
    console.log(gigId);
    console.log(bandId);
    this.promoterHomeService.inviteBands(gigId,bandId);
  }

  checkBand(bandId: number): boolean{
    let bandExists: boolean = false;
    let idList = new Set<Number>();
    for(let i = 0; i<this.promoterHomeService.$bandsAtGig.length; i++){
      idList.add(this.promoterHomeService.$bandsAtGig[i].id);
    }
    console.log(idList);
    if(idList.has(bandId)){bandExists = true;}
    idList.clear();
    return bandExists;
  }
}
