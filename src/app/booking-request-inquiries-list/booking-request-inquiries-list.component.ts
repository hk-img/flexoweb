import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GlobalVariables } from '../global/global-variables';
import { SpaceService } from '../services/space.service';
import { DialogConfirmationPopUp } from '../shared/component/dialog-confirmation-popup/dialog-confirmation-popup.component';

@Component({
  selector: 'app-booking-request-inquiries-list',
  templateUrl: './booking-request-inquiries-list.component.html',
  styleUrls: ['./booking-request-inquiries-list.component.css'],
})
export class BookingRequestInquiriesListComponent implements OnInit {
  public aws_base_url =
    'https://s3.ap-south-1.amazonaws.com/' +
    environment.s3_bucket_path +
    '/details_images/';
  public webDomain = environment.webDomain;
  bookingRequestInquiriesList = [];
  public typeOfSpaceList: any = GlobalVariables.resource_types;
  displayedColumns: string[] = [
    'userName',
    'userEmail',
    'userMobile',
    'spaceName',
    'inquirySpaceTypeId',
    'spaceType',
    'inquirySpaceCapacity',
  ];
  dataSource: any[] = [];
  linkName:any;

  constructor(private spaceService: SpaceService, public dialog: MatDialog, public router: Router) { }

  ngOnInit() {
    this.getBookingRequestInquiries();
  }

  getBookingRequestInquiries() {
    this.bookingRequestInquiriesList = [];
    this.spaceService.getBookingRequestInquiriesList().subscribe(
      (response: any) => {
        if (response?.result.success) {
          let requestInquiries = response.result.inquiries
            ? response.result.inquiries
            : [];

          for (let i = 0; i < requestInquiries.length; i++) {
            
            let actual_name = requestInquiries[i]?.spaceName
              ? requestInquiries[i]?.spaceName.replace(/ /g, '-')
              : '';
            let location_name = requestInquiries[i]?.spaceLocation
              ? requestInquiries[i]?.spaceLocation.replace(/ /g, '-')
              : '';
            let link_name = `${actual_name}-${location_name}-${requestInquiries[i].spaceId}`;

            /* this.bookingRequestInquiriesList.push({
        spaceId: requestInquiries[i]?.spaceId ? requestInquiries[i]?.spaceId: null,
        spacename: requestInquiries[i]?.spaceName ? requestInquiries[i]?.spaceName : "",
        locationName: requestInquiries[i]?.spaceLocation ? requestInquiries[i]?.spaceLocation: "",
        spaceNameLocation: `${actual_name} ${location_name}`,
        spaceImages: requestInquiries[i]?.spaceImages ? requestInquiries[i]?.spaceImages : [],
        linkName: link_name.toLowerCase()
      }); */
            this.bookingRequestInquiriesList.push({
              inquiryId: requestInquiries[i]?.id
                ? requestInquiries[i]?.id
                : null,
              spaceId: requestInquiries[i]?.spaceId
                ? requestInquiries[i]?.spaceId
                : null,
              spaceName: requestInquiries[i]?.spaceName
                ? requestInquiries[i]?.spaceName
                : '',
              userName: requestInquiries[i]?.userName
                ? requestInquiries[i]?.userName
                : '',
              userEmail: requestInquiries[i]?.userEmail
                ? requestInquiries[i]?.userEmail
                : '',
              userMobile: requestInquiries[i]?.userMobile
                ? requestInquiries[i]?.userMobile
                : '',
              linkName: link_name.toLowerCase(),
              inquirySpaceTypeId: requestInquiries[i].spaceType
                ? requestInquiries[i].spaceType
                : '',
              spaceType: requestInquiries[i]
                .spaceType
                ? requestInquiries[i].spaceType
                : '',
              inquirySpaceCapacity: requestInquiries[i].inquirySpaceCapacity !== '0' && requestInquiries[i].inquirySpaceCapacity
                ? requestInquiries[i].inquirySpaceCapacity
                : 'N/A',

              inquiryCompanyName: requestInquiries[i].inquiryCompanyName
                ? requestInquiries[i].inquiryCompanyName
                : '',
              coworkingSpaceType: requestInquiries[i].coworkingSpaceType
              ? requestInquiries[i].coworkingSpaceType
              : '',
              location_name: requestInquiries[i].location_name
              ? requestInquiries[i].location_name
              : '',
              images: requestInquiries[i].images
              ? requestInquiries[i].images
              : '',
            });
          }
        }
        // this.dataSource = this.bookingRequestInquiriesList;
      },
      (error) => {
      }
    );
  }

  onEditInquiry(item) {
    let query_params = {
      space_id: item.spaceId,
      type_space_id: item.inquirySpaceTypeId,
      inquiry_id: item.inquiryId
    }
    this.router.navigate(['/contact-form'], { queryParams: query_params });
  }

  onCancelInquiry(item) {
    let payload = {
      component: 'booking-request-inquiries',
      title: 'Cancel inquiry',
      message: 'Are you sure you want to cancel this inquiry?',
      componentData: item,
    };
    this.dialog.open(DialogConfirmationPopUp, {
      data: payload,
      width: '500px',
    });
  }

  handleImageError(event:any){
    const imgElement=event.target as HTMLImageElement
    imgElement.src = 'assets/images/details_placeholder_image.jpg';
    imgElement.alt = 'Failed to Load Image';
  }

}