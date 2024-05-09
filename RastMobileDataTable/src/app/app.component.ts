import { ChangeDetectorRef, Component } from '@angular/core';
import DataTable from 'datatables.net-dt';
import { ModalComponent } from './CreateAccountModal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface SocialMediaData {
  socialMediaLink: string;
  socialMediaName: string;
  description: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', "../assets/styles/datatablestyle1.css", "../assets/styles/datatablestyles2.css"],
  styles: `body{
    background-color:aliceblue;
  }
  ngb-modal-window{
    z-index: 10000
  }
`
})
export class AppComponent {
  constructor(private modalService: NgbModal , private cdr: ChangeDetectorRef) { }

  isModalOpen: boolean = false;
  title = 'RastMobileDataTable';
  table: any ;
  data: SocialMediaData[] = [
    { socialMediaLink: 'https://github.com/muttafa', socialMediaName: 'Github', description: 'Mustafa Uçar' },
  ];
  perPage = 10;
  search: any;
  currentPage = 1;
  totalPage: number = Math.ceil(this.data.length / this.perPage);
  ngOnInit() {
    this.totalPage = Math.ceil(this.data.length / this.perPage);

    if (this.data.length < 10) {
      this.perPage = this.data.length
    }
    this.table = new DataTable('#myTable', {
      data: this.data,
      searching: false,
      paging: false,
      info: false,
      columns: [
        { title: 'Social Media Link', data: 'socialMediaLink' },
        { title: 'Social Media Name', data: 'socialMediaName' },
        { title: 'Description', data: 'description' },
      ]
    });
  }

  changeCount() {
    this.currentPage = 1;
    if (this.perPage > this.data.length) {
      this.perPage = this.data.length;
    }
    if (this.perPage < 1) {
      this.perPage = 1;
    }
    this.totalPage = Math.ceil(this.data.length / this.perPage);
    this.refreshDataTable();
  }

  searchData() {
    const filteredData = this.data.filter(item => {
      const searchTerm = this.search.toLowerCase();
      return Object.values(item).some(value => value.toLowerCase().includes(searchTerm));
    });

    this.currentPage = 1; 
    this.totalPage = Math.ceil(filteredData.length / this.perPage); 

    this.table.clear().draw();
    this.table.rows.add(filteredData).draw();
  }

  openModal() {
    const options = { windowClass: 'custom-ngb-modal-window', backdropClass: 'custom-ngb-modal-backdrop' };
    const modalRef = this.modalService.open(ModalComponent, options);

    modalRef.result.then((result) => {
      if (result) {
        this.data.push(result);
        this.refreshDataTable();
      }
    }).catch((error) => {
      console.log(error);
    });
  }
  changePage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPage) {
      this.currentPage = pageNumber;
      this.refreshDataTable();
    }
  }
  refreshDataTable() {
    const start = (this.currentPage - 1) * this.perPage;
    const end = start + this.perPage;
    const displayedData = this.data.slice(start, end);

    this.table.clear().draw();
    this.table.rows.add(displayedData).draw();
  }
  closeModal() {
    this.isModalOpen = false;
  }

}
