import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css',
})
export class IncomeComponent {
  incomeForm: any;
  selectedMonth: any;
  januaryIncomes: any[] = [
    { source: 'Salary', amount: 5000, investment: '401(k)' },
    { source: 'Freelancing', amount: 1000, investment: 'Stocks' },
  ];
  FebruaryIncomes: any[] = [
    { source: 'Salary', amount: 5500, investment: '401(k)' },
    { source: 'Rental Income', amount: 700, investment: 'Real Estate' },
  ];
  MarchIncomes: any[] = [
    { source: 'Salary', amount: 5500, investment: '401(k)' },
    { source: 'Freelancing', amount: 1200, investment: 'Stocks' },
    { source: 'Rental Income', amount: 600, investment: 'Real Estate' },
  ];
  monthSelected: boolean = false;

  constructor(public fb: FormBuilder, public router: Router) {
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', {
      month: 'long',
    });
  }
  ngOnInit() {
    this.incomeForm = this.fb.group({
      month: ['', Validators.required],
      source: ['', Validators.required],
      amount: ['', Validators.required],
      investments: ['', Validators.required],
    });
  }
  calculateTotalMonth(month: string): number {
    let totalIncome = 0;
    for (const income of this.getIncomesForMonth(month)) {
      totalIncome += income.amount;
    }
    return totalIncome;
  }

  getIncomesForMonth(month: string): any[] {
    switch (month) {
      case 'January':
        return this.januaryIncomes;
      case 'February':
        return this.FebruaryIncomes;
      case 'March':
        return this.MarchIncomes;
      default:
        return [];
    }
  }
  onChange(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredIncomes();
  }
  getFilteredIncomes() {
    let filteredIncomes: any[] = [];
    switch (this.selectedMonth) {
      case 'January':
        filteredIncomes = [...this.januaryIncomes];
        break;
      case 'February':
        filteredIncomes = [...this.FebruaryIncomes];
        break;
      case 'March':
        filteredIncomes = [...this.MarchIncomes];
        break;
      default:
        break;
    }
    return filteredIncomes;
  }
  onSubmit() {
    if (this.incomeForm.valid) {
      const newIncome = this.incomeForm.value;
      switch (this.selectedMonth) {
        case 'January':
          this.januaryIncomes.push(newIncome);
          break;
        case 'February':
          this.FebruaryIncomes.push(newIncome);
          break;
        case 'March':
          this.MarchIncomes.push(newIncome);
          break;
        default:
          break;
      }
      this.incomeForm.reset();
      this.incomeForm.patchValue({
        month: '',
        source: '',
        amount: '',
        investments: '',
      });
    }
  }

  saveForm() {
    console.log('Form Saved!');
  }
  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }
}
