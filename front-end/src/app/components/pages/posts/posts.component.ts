import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

export interface allposts{
  transaction: number;
  name: string;
  want:number;
  currencysymbol: string;
  exchangeCurrency: string;
  exchangerate: number;
}

const ELEMENT_DATA: allposts[] = [
  {transaction: 1, name: 'Guanyu', want: 100, currencysymbol: 'CAD',exchangeCurrency: 'USD', exchangerate: 0.72},
  {transaction: 2, name: 'Guanyu', want: 100, currencysymbol: 'CAD',exchangeCurrency: 'USD', exchangerate: 0.72},
  {transaction: 3, name: 'Guanyu', want: 100, currencysymbol: 'CAD',exchangeCurrency: 'USD', exchangerate: 0.72},
  {transaction: 4, name: 'Guanyu', want: 100, currencysymbol: 'CAD',exchangeCurrency: 'USD', exchangerate: 0.72},
  {transaction: 5, name: 'Guanyu', want: 100, currencysymbol: 'CAD',exchangeCurrency: 'USD', exchangerate: 0.72},
  {transaction: 6, name: 'Guanyu', want: 100, currencysymbol: 'CAD',exchangeCurrency: 'USD', exchangerate: 0.72},
  {transaction: 7, name: 'Guanyu', want: 100, currencysymbol: 'CAD',exchangeCurrency: 'USD', exchangerate: 0.72},
  {transaction: 8, name: 'Guanyu', want: 100, currencysymbol: 'CAD',exchangeCurrency: 'USD', exchangerate: 0.72},
  {transaction: 9, name: 'Guanyu', want: 100, currencysymbol: 'CAD',exchangeCurrency: 'USD', exchangerate: 0.72},
  {transaction: 10, name: 'Guanyu', want: 100, currencysymbol: 'CAD',exchangeCurrency: 'USD', exchangerate: 0.72},
];
@Component({
  selector: 'posts',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  displayedColumns: string[] = ['transaction', 'name','want','currencysymbol','excchangCurrency','exchangerate'];
  dataSource = ELEMENT_DATA;
}
