import { Component, OnInit } from '@angular/core';
import { WinnersService } from '../../services/winners.service';

@Component({
  selector: 'app-view-winners',
  templateUrl: './view-winners.component.html',
  styleUrls: ['./view-winners.component.css']
})
export class ViewWinnersComponent implements OnInit {

  public winners: any[] = [];

  constructor(private winnerService: WinnersService) { }

  ngOnInit(): void {
    this.getWinners();
  }


  public getWinners(): void {
    this.winnerService.getWinners().subscribe({
      next: (response) => {
        this.winners = response.body;
        console.log(this.winners);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
