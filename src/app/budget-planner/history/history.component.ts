import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SideNavComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {
  todoForm: any;
  selectedMonth: any;
  januaryExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 1000 },
    { expenseType: 'Light Bills', expenseAmount: 500 },
  ];
  FebruaryExpense: any[] = [
    { expenseType: 'Essentials', expenseAmount: 200 },
    { expenseType: 'Light Bills', expenseAmount: 400 },
  ];
  MarchExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 1100 },
    { expenseType: 'Essentials', expenseAmount: 250 },
  ];
  monthSelected: boolean = false;

  constructor(public fb: FormBuilder, public router: Router) {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', {
      month: 'long',
    });
    this.selectedMonth = currentMonth;
  }
  ngOnInit() {
    this.todoForm = this.fb.group({
      month: ['', Validators.required],
      expenseAmount: ['', Validators.required],
    });
  }

  onSubmitExpense() {
    if (this.todoForm.valid) {
      const newExpense = this.todoForm.value;
      this.getFilteredExpenses().push(newExpense);
      this.todoForm.reset();
    }
  }
  calculateTotalExpense(month: string): number {
    return this.getFilteredExpenses().reduce(
      (acc, curr) => acc + curr.expenseAmount,
      0
    );
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpenses();
  }

  getFilteredExpenses() {
    let filterExpense: any[] = [];
    switch (this.selectedMonth) {
      case 'January':
        return this.januaryExpense;
      case 'February':
        return this.FebruaryExpense;
      case 'March':
        return this.MarchExpense;
      default:
        return [];
    }
  }

  getTodoForMonth(month: string): any[] {
    switch (month) {
      case 'January':
        return this.januaryExpense;
      case 'February':
        return this.FebruaryExpense;
      case 'March':
        return this.MarchExpense;
      default:
        return [];
    }
  }

  onSave() {
    if (this.todoForm.valid) {
      this.todoForm.reset({ month: this.selectedMonth });
      this.getFilteredExpenses();
    }
  }

  saveForm() {
    console.log('Form Saved!');
  }
  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }
}
