<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
=======
import { Component } from '@angular/core';
>>>>>>> 3cb4bd9814ae655b23ad68bba5e7d9541b05a639

@Component({
  selector: 'app-presons-details',
  imports: [],
  templateUrl: './presons-details.component.html',
  styleUrl: './presons-details.component.scss'
})
<<<<<<< HEAD
export class PresonsDetailsComponent implements OnInit {
  personId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.personId = this.route.snapshot.paramMap.get('id')!;
    // استخدمي personId لجلب بيانات الشخص من الخدمة
  }
=======
export class PresonsDetailsComponent {

>>>>>>> 3cb4bd9814ae655b23ad68bba5e7d9541b05a639
}
