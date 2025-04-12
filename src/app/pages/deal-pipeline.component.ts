import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { DealService } from '../services/deal.service';
import { Deal, DealStage } from '../models/deal.model';
import { AuthService } from '../services/auth.service';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

const STAGES: DealStage[] = [
  'Prospecting', 'Qualifying', 'Proposing', 'Negotiating', 'Closed Won', 'Closed Lost'
];

@Component({
  selector: 'app-deal-pipeline',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule, NgChartsModule],
  templateUrl: './deal-pipeline.component.html',
  styleUrls: ['./deal-pipeline.component.scss']
})
export class DealPipelineComponent implements OnInit {
  // pipeline
  deals: Deal[] = [];
  stages = STAGES;
  stageColumns: Record<DealStage, Deal[]> = {} as any;
  dropListIds: string[] = [];

  newDealTitle = '';
  newDealValue = 0;
  userId = '';

  selectedDeal: Deal | null = null;
  editingTitle = '';
  editingValue = 0;

  // dashboard filters
  selectedRange = '6m';
  dateRanges = ['1m', '3m', '6m', '1y'];

  // metrics
  totalValue = 0;
  totalDeals = 0;
  avgValue = 0;
  velocity = 0;
  conversionRate = 0;

  // charts
  pieChartLabels: string[] = STAGES;
  pieChartData: number[] = [];
  pieChartConfig: ChartConfiguration<'pie'> = {
    type: 'pie',
    data: {
      labels: this.pieChartLabels,
      datasets: [{ data: this.pieChartData }]
    }
  };

  lineChartLabels: string[] = [];
  lineChartData: number[] = [];
  lineChartConfig: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      labels: this.lineChartLabels,
      datasets: [{
        label: 'Revenue',
        data: this.lineChartData,
        fill: true,
        borderColor: '#42A5F5',
        tension: 0.3
      }]
    }
  };

  constructor(private dealService: DealService, private auth: AuthService) {}

  ngOnInit(): void {
    this.dropListIds = this.stages.map(stage => `stage-${stage}`);
    this.auth.user$.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.loadDeals();
      }
    });
  }

  loadDeals() {
    this.dealService.getDealsForUser(this.userId).subscribe(deals => {
      this.deals = deals;
      this.groupDealsByStage();
      this.computeMetrics();
    });
  }

  groupDealsByStage() {
    this.stageColumns = {} as any;
    for (const stage of this.stages) {
      this.stageColumns[stage] = this.deals.filter(d => d.stage === stage);
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

  startEdit(deal: Deal) {
    this.selectedDeal = deal;
    this.editingTitle = deal.title;
    this.editingValue = deal.value;
  }

  saveEdit() {
    if (this.selectedDeal?.id) {
      this.dealService.updateContact(this.selectedDeal.id, {
        title: this.editingTitle,
        value: this.editingValue
      }).then(() => {
        this.selectedDeal = null;
      });
    }
  }

  deleteDealInline() {
    if (this.selectedDeal?.id) {
      this.dealService.deleteDeal(this.selectedDeal.id).then(() => {
        this.selectedDeal = null;
      });
    }
  }

  // Dashboard 🧠
  filterByRange(deals: Deal[], range: string): Deal[] {
    const now = Date.now();
    const ranges: Record<string, number> = {
      '1m': 30, '3m': 90, '6m': 180, '1y': 365
    };
    const msBack = (ranges[range] || 180) * 24 * 60 * 60 * 1000;
    return deals.filter(d => d.createdAt >= now - msBack);
  }

  groupByMonth(deals: Deal[]) {
    const grouped: Record<string, number> = {};
    deals.forEach(d => {
      const date = new Date(d.createdAt);
      const label = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      grouped[label] = (grouped[label] || 0) + d.value;
    });
    return grouped;
  }

  computeMetrics() {
    const filtered = this.filterByRange(this.deals, this.selectedRange);
    const stageTotals = this.stages.map(stage => {
      return filtered.filter(d => d.stage === stage).reduce((sum, d) => sum + d.value, 0);
    });

    this.pieChartConfig.data.datasets[0].data = stageTotals;

    this.totalValue = filtered.reduce((sum, d) => sum + d.value, 0);
    this.totalDeals = filtered.length;
    this.avgValue = this.totalDeals ? this.totalValue / this.totalDeals : 0;
    this.velocity = Math.round(this.totalValue / 30);
    const closedWon = filtered.filter(d => d.stage === 'Closed Won').length;
    const closed = filtered.filter(d => d.stage === 'Closed Won' || d.stage === 'Closed Lost').length;
    this.conversionRate = closed ? Math.round((closedWon / closed) * 10000) / 100 : 0;

    const monthly = this.groupByMonth(filtered.filter(d => d.stage === 'Closed Won'));
    this.lineChartLabels = Object.keys(monthly);
    this.lineChartData = Object.values(monthly);

    this.lineChartConfig.data.labels = this.lineChartLabels;
    this.lineChartConfig.data.datasets[0].data = this.lineChartData;
  }

  onRangeChange(range: string) {
    this.selectedRange = range;
    this.computeMetrics();
  }
}
