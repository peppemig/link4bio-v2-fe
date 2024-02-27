import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/shared/models/page.model';
import { Subscription } from 'rxjs';
import { PageService } from 'src/app/shared/services/page.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  pageData: Page | undefined;
  subs: Subscription[] = [];

  constructor(private pageSvc: PageService, private router: Router) {}

  ngOnInit(): void {
    this.checkIfUserHasPage();
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  checkIfUserHasPage() {
    this.subs.push(
      this.pageSvc.checkIfUserHasPage().subscribe((hasPage) => {
        if (hasPage) {
          this.getPageData();
        } else {
          this.router.navigate(['/profile/create']);
        }
      })
    );
  }

  getPageData() {
    this.subs.push(
      this.pageSvc.getPageDataByUserId().subscribe((data) => {
        this.pageData = data;
      })
    );
  }
}
