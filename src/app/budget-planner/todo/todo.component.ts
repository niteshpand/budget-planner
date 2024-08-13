import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
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
      const newIncome = this.todoForm.value;
      console.log(newIncome);
      switch (this.selectedMonth) {
        case 'January':
          this.januaryExpense.push(newIncome);
          break;
        case 'February':
          this.FebruaryExpense.push(newIncome);
          break;
        case 'March':
          this.MarchExpense.push(newIncome);
          break;
        default:
          break;
      }
      this.todoForm.reset();
      this.todoForm.patchValue({
        month: '',
        source: '',
        amount: '',
        investments: '',
      });
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
        filterExpense = [...this.januaryExpense];
        break;
      case 'February':
        filterExpense = [...this.FebruaryExpense];
        break;
      case 'March':
        filterExpense = [...this.MarchExpense];
        break;
      default:
        break;
    }
    return filterExpense;
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

  toggleSelection(event: any) {}
  onSave() {
    if (this.todoForm.valid) {
      const incomeData = this.todoForm.value;
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
