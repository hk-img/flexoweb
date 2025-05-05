import { ChangeDetectorRef, Component, OnInit, ViewContainerRef } from "@angular/core";
import { environment } from "src/environments/environment";
import { SpaceService } from "../services/space.service";
import { GlobalVariables } from "../global/global-variables";
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig, MatLegacyDialogRef as MatDialogRef } from "@angular/material/legacy-dialog";
import { DialogConfirmationPopUp } from "../shared/component/dialog-confirmation-popup/dialog-confirmation-popup.component";
import { ScheduleVisitComponent } from "../schedule-visit/schedule-visit.component";

@Component({
	selector: 'app-scheduled-visit-list',
	templateUrl: './scheduled-visit-list.component.html',
	styleUrls: ['./scheduled-visit-list.component.css'],
})
export class ScheduledVisitListComponent implements OnInit {

    public aws_base_url = 'https://s3.ap-south-1.amazonaws.com/' + environment.s3_bucket_path + '/details_images/';
    public webDomain = environment.webDomain
    public scheduleVisitListComplete: any  = []
    public scheduleVisitList: any  = []
    public typeOfSpaceList: any = GlobalVariables.resource_types;
    visits: any;
    
    constructor(
        private spaceService: SpaceService,
        private dtr: ChangeDetectorRef,
        public dialog: MatDialog,
        public scheduleVisit_dialogRef: MatDialogRef<any>,
        public scheduleVisit_viewContainerRef: ViewContainerRef,
        public scheduleVisit_dialog: MatDialog,
    ){ }

    workSpace = [
        { workSpaceName: 'Coworking Space', typeOfSpace: "Coworking" },
        { workSpaceName: 'Managed Office', typeOfSpace: "Long-Term" },
        { workSpaceName: 'Private Office', typeOfSpace: "Long-Term" },
        { workSpaceName: 'Shared Office', typeOfSpace: "Long-Term" },
        { workSpaceName: 'Virtual Office', typeOfSpace: "Long-Term" },
        { workSpaceName: 'Coworking Café/Restaurant', typeOfSpace: "Short-Term" },
        { workSpaceName: 'Shoot Studio', typeOfSpace: "Short-Term" },
        { workSpaceName: 'Recording Studio', typeOfSpace: "Short-Term" },
        { workSpaceName: 'Podcast Studio', typeOfSpace: "Short-Term" },
        { workSpaceName: 'Activity Space', typeOfSpace: "Short-Term" },
        { workSpaceName: 'Sports Turf', typeOfSpace: "Short-Term" },
        { workSpaceName: 'Sports Venue', typeOfSpace: "Short-Term" },
        { workSpaceName: 'Party Space', typeOfSpace: "Short-Term" },
        { workSpaceName: 'Banquet Hall', typeOfSpace: "Short-Term" },
        { workSpaceName: 'Gallery', typeOfSpace: "Short-Term" },
        { workSpaceName: 'Classroom', typeOfSpace: "Short-Term" },
        { workSpaceName: 'Private Cabin', typeOfSpace: "Short-Term" },
        { workSpaceName: 'Meeting Room', typeOfSpace: "Short-Term" },
        { workSpaceName: 'Training Room', typeOfSpace: "Short-Term" },
        { workSpaceName: 'Event Space', typeOfSpace: "Short-Term" },
      ]

      typeOfSpaces: any = [];
      ratingOffset=0; 
      spaceVisitScheduleList: any = [];

    ngOnInit() {
        this.getUserScheduleVisitList();
    }

    getUserScheduleVisitList(){
        this.spaceService.getUserScheduleVisitList().subscribe((response:any)=> {
            if(response.result.success){
                this.scheduleVisitListComplete = []; 
                this.visits = response.result.visit ? response.result.visit : [];
               
                for(let i = 0; i < this.visits.length; i++){

                    let actual_name = this.visits[i]?.spaceName ? this.visits[i]?.spaceName.replace(/ /g,"-") : "";
                    let location_name = this.visits[i]?.spaceLocation ? this.visits[i]?.spaceLocation.replace(/ /g,"-") : "";
                    let link_name = `${actual_name}-${location_name}-${this.visits[i].spaceId}`;

                    let visitDate = this.visits[i]?.visitDate ? this.visits[i]?.visitDate: "";
                    let visitTime = this.visits[i]?.visitTime ? this.visits[i]?.visitTime: "";
                    let visitTimeNew = visitTime.split(':');
                    let visitDateNew = new Date(visitDate).setHours(visitTimeNew[0]);
                    visitDateNew = new Date(visitDateNew).setMinutes(visitTimeNew[1]);

                    let visitSpaceTypeName = "";
                    if(this.visits[i]?.visitSpaceTypeId != undefined && this.visits[i]?.visitSpaceTypeId != null){
                        let vistiSpaceType = this.typeOfSpaceList.filter(res => res.id == this.visits[i]?.visitSpaceTypeId);
                        visitSpaceTypeName = vistiSpaceType.length > 0 ? vistiSpaceType[0].name : ""
                    }
  
                    this.scheduleVisitListComplete.push({
                        visitId: this.visits[i]?.id ? this.visits[i]?.id: null,
                        spaceId: this.visits[i]?.spaceId ? this.visits[i]?.spaceId: null,
                        spacename: this.visits[i]?.spaceName ? this.visits[i]?.spaceName : "",
                        locationName: this.visits[i]?.spaceLocation ? this.visits[i]?.spaceLocation: "",
                        spaceNameLocation: `${actual_name}`,
                        spaceLocationName: `${location_name}`,
                        spaceImages: this.visits[i]?.spaceImages ? this.visits[i]?.spaceImages : [],
                        linkName: link_name.toLowerCase(),
                        visitDate: visitDate,
                        visitTime: visitTime,
                        howManyPeopleInYourSpace:this.visits[i]?.spaceDetails.howManyPeopleInYourSpace,
                        coworkingSpaceType:this.visits[i]?.coworkingSpaceType,
                        howManyPeople:this.visits[i]?.howManyPeople,
                        spaceSquareFt:this.visits[i]?.spaceDetails.spacesqft,
                        visitDateTime: visitDateNew,
                        spaceType: this.visits[i]?.spaceDetails.spaceType,
                        visitSpaceTypeName: visitSpaceTypeName,
                        visitSpaceTypeId: this.visits[i]?.visitSpaceTypeId ? this.visits[i]?.visitSpaceTypeId: null,
                        visitDescription: this.visits[i]?.visitDiscription ? this.visits[i]?.visitDiscription: "",
                        visitSpaceType: this.visits[i]?.visitSpaceType,
                        images: this.visits[i]?.images,
                        spaceStatus: this.visits[i]?.spaceDetails.spaceStatus
                    });
                }

                
                this.scheduleVisitList = this.scheduleVisitListComplete.slice(this.ratingOffset, 5); 
                this.ratingOffset += 5;
            }
            this.dtr.detectChanges();
        }, error => {
        })
    }

    nextReviewList() {
        if (this.scheduleVisitListComplete.length > this.scheduleVisitList.length) {
            const endIndex = Math.min(this.ratingOffset+5, this.scheduleVisitListComplete.length);
            const nextReviews = this.scheduleVisitListComplete.slice(this.ratingOffset, endIndex);
            this.scheduleVisitList.push(...nextReviews);
            this.ratingOffset += 5;
        }
    }

    onCancelScheduledVisit(item){
        let payload = {
            component: "scheduled-visit-list",
            title: 'Cancel scheduled visit',
            message: 'Are you sure you want to cancel this scheduled visit?',
            componentData: item
        }
        this.dialog.open(DialogConfirmationPopUp, { data: payload ,width: '500px'});

    }
    
    onEditScheduledVisit(item){
        let config = new MatDialogConfig();
        config.viewContainerRef = this.scheduleVisit_viewContainerRef;
        config.panelClass = 'dialogClass';
        config.width = '550px';
        config.data = {
            spaceId: item.spaceId,
            scheduleVisitDetails: item
        }

        this.scheduleVisit_dialogRef = this.scheduleVisit_dialog.open(ScheduleVisitComponent, config);
        this.scheduleVisit_dialogRef.componentInstance.ref = this.scheduleVisit_dialogRef;
        this.scheduleVisit_dialogRef.componentInstance.flag = 1;
        this.scheduleVisit_dialogRef.afterClosed().subscribe((result) => {
            if (result && result.success) {
            window.location.reload();
            }
            this.scheduleVisit_dialogRef = null;
        });
    }

    handleImageError(event:any){

        const imgElement=event.target as HTMLImageElement
        imgElement.src = 'assets/images/details_placeholder_image.jpg';
        imgElement.alt = 'Failed to Load Image';
    }
}