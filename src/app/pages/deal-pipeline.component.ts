import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { DealService } from '../services/deal.service';
import { Deal, DealStage } from '../models/deal.model';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

const STAGES: DealStage[] = [
  'Prospecting',
  'Qualifying',
  'Proposing',
  'Negotiating',
  'Closed Won',
  'Closed Lost'
];

@Component({
  selector: 'app-deal-pipeline',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule],
  templateUrl: './deal-pipeline.component.html',
  styleUrls: ['./deal-pipeline.component.scss'],
})
export class DealPipelineComponent implements OnInit {
  deals: Deal[] = [];
  stages = STAGES;
  stageColumns: Record<DealStage, Deal[]> = {} as any;

  newDealTitle = '';
  newDealValue = 0;

  userId = '';
  dropListIds: string[] = [];

  constructor(private dealService: DealService, private auth: AuthService) {}

  ngOnInit() {
    this.dropListIds = this.stages.map(stage => `stage-${stage}`);

    this.auth.user$.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.dealService.getDealsForUser(user.uid).subscribe((deals) => {
          this.deals = deals;
          this.groupDealsByStage();
        });
      }
    });
  }

  groupDealsByStage() {
    this.stageColumns = {} as any;
    for (const stage of this.stages) {
      this.stageColumns[stage] = this.deals.filter((d) => d.stage === stage);
    }
  }

  drop(event: CdkDragDrop<Deal[]>, targetStage: DealStage) {
    if (event.previousContainer === event.container) return;

    const deal = event.previousContainer.data[event.previousIndex];
    deal.stage = targetStage;

    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

    this.dealService.updateDealStage(deal.id!, targetStage);
  }

  addNewDeal() {
    if (!this.userId || !this.newDealTitle) return;

    const newDeal: Deal = {
      title: this.newDealTitle,
      value: this.newDealValue,
      stage: 'Prospecting',
      userId: this.userId,
      createdAt: Date.now(),
    };

    this.dealService.addDeal(newDeal);
    this.newDealTitle = '';
    this.newDealValue = 0;
  }
}
