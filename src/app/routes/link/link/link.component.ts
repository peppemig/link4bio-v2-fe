import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingHandler } from 'src/app/shared/handlers/loading-handler';
import { Page } from 'src/app/shared/models/page.model';
import { PageService } from 'src/app/shared/services/page.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit, OnDestroy {
  pageData: Page | undefined;
  subs: Subscription[] = [];
  loadingPage = new LoadingHandler();
  pageDoesNotExist = false;

  constructor(
    private pageSvc: PageService,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.getPageData();
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  getPageData() {
    this.loadingPage.start();
    this.pageSvc.getPageDataByUri(this.route.snapshot.params['uri']).subscribe({
      next: (res) => {
        this.pageData = res;
        if (this.pageData?.theme) {
          this.setBodyBackgroundColor(this.pageData.theme.backgroundColor);
        }
        this.loadingPage.stop();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.pageDoesNotExist = true;
        }
        this.loadingPage.stop();
      },
    });
  }

  private setBodyBackgroundColor(color: string) {
    this.renderer.setStyle(document.body, 'background-color', color);
  }
}
