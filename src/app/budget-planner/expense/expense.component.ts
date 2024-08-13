import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css',
})
export class ExpenseComponent {
  expenseForm: any;
  selectedMonth: any;
  januaryExpense: any[] = [
    { expenseType: 'Rent', expenseAmount: 5000 },
    { expenseType: 'Groceries', expenseAmount: 1000 },
  ];
  FebruaryExpense: any[] = [
    { expenseType: 'Utilities', expenseAmount: 200 },
    { expenseType: 'Groceries', expenseAmount: 400 },
  ];
  MarchExpense: any[] = [
    { expenseType: 'Rent', expenseAmount: 1100 },
    { expenseType: 'Utilities', expenseAmount: 250 },
  ];
  monthSelected: boolean = false;

  constructor(public fb: FormBuilder, public router: Router) {
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', {
      month: 'long',
    });
  }
  ngOnInit() {
    this.expenseForm = this.fb.group({
      month: ['', Validators.required],
      source: ['', Validators.required],
      expenseAmount: ['', Validators.required],
      expenseType: ['', Validators.required],
    });
  }
  calculateTotalExpense(month: string): number {
    return this.getFilteredExpenses().reduce(
      (acc, curr) => acc + curr.expenseAmount,
      0
    );
  }

  onSubmitExpense() {
    if (this.expenseForm.valid) {
      const newExpense = this.expenseForm.value;
      console.log(newExpense);
      this.getFilteredExpenses().push(newExpense);
      this.expenseForm.reset();
    }
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpenses();
  }

  getFilteredExpenses() {
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

  onSave() {
    if (this.expenseForm.valid) {
      this.expenseForm.reset({ month: this.selectedMonth });
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
