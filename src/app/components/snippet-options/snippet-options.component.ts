import { Component, OnInit, TemplateRef, ElementRef, OnDestroy } from '@angular/core';

import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SnippetLoaderService } from '../../services/navigation/snippetLoader.service';
import { Snippet } from '../../services/resources/snippet.resource';
import { SnippetModalComponent } from '../../modals/snippet-modal/snippet-modal.component';
import { Label } from '../../services/resources/label.resource';
import { Observable, Subscription } from "rxjs";
import { SnippetLabelResource } from "../../services/resources/snippetlabel.resource";
import { AuthResource } from "../../services/resources/auth.resource";
import { User } from "../../services/resources/user.resource";
import { Select } from "@ngxs/store";
import { LabelState } from "../../state/label/label.state";


@Component({
  selector: 'app-snippet-options',
  templateUrl: './snippet-options.component.html',
  styleUrls: ['./snippet-options.component.scss']
})
export class SnippetOptionsComponent implements OnInit, OnDestroy {

  activeSnippet: ResourceModel<Snippet> = null;
  labels: Label[] = [];
  activeLabels: number[] = [];
  currentUser: ResourceModel<User>;

  availableLabelsSubscription: Subscription;
  snippetLoaderSubscription: Subscription;

  @Select(LabelState) labels$: Observable<Label[]>;

  constructor(private snippetLoaderService: SnippetLoaderService,
              private snippetLabelResource: SnippetLabelResource,
              private authResource: AuthResource,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.currentUser = this.authResource.currentUser;

    this.availableLabelsSubscription = this.snippetLoaderService.activeSnippetUpdated.subscribe((snippet) => {
      if (snippet) {
        this.activeSnippet = snippet;
        this.activeLabels = this.activeSnippet.labels;
      }
    });

    this.snippetLoaderSubscription = this.labels$.subscribe((data) => {
      this.labels = data;
    });
  }

  editSnippet() {
    const modalRef = this.modalService.open(SnippetModalComponent, {size: 'lg'});

    modalRef.componentInstance.snippet = this.activeSnippet;

    modalRef.result.then((result) => {
      this.snippetLoaderService.updateActiveSnippet(result);
    }, (reason) => {
      console.log(`Dismissed: ${reason}`);
    });
  }

  deleteSnippet() {
    this.activeSnippet.$remove().$promise
      .then(() => {
        this.snippetLoaderService.deleteSnippet(this.activeSnippet.pk);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  openDeleteModal(content: TemplateRef<ElementRef>) {
    this.modalService.open(content).result.then((result) => {
      this.deleteSnippet();
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
    });
  }

  toggleLabel(label: ResourceModel<Label>) {
    let index = this.activeLabels.indexOf(label.pk);

    if (index > -1) {
      this.snippetLabelResource.query({snippet: this.activeSnippet.pk, label: label.pk}).$promise
        .then((data) => {
          if (data.length == 1) {
            data[0].$remove().$promise
              .then(() => {
                this.activeLabels.splice(index, 1);
              })
              .catch((reason) => {
                console.log("Cannot delete snippet label");
                console.log(reason);
              })
          }
          else {
            console.log("Snippet label not found");
          }
        })
        .catch((reason) => {
          console.log("Cannot fetch snippet label");
          console.log(reason);
        })
    }
    else {
       this.snippetLabelResource.save({}, {snippet: this.activeSnippet.pk, label: label.pk}).$promise
         .then((data) => {
           this.activeLabels.push(label.pk);
         })
         .catch((reason) => {
            console.log("Cannot add snippet label");
            console.log(reason);
          })
    }
  }

  ngOnDestroy() {
    this.availableLabelsSubscription.unsubscribe();
    this.snippetLoaderSubscription.unsubscribe();
  }
}
