import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-presons-details',
  imports: [],
  templateUrl: './presons-details.component.html',
  styleUrl: './presons-details.component.scss'
})
export class PresonsDetailsComponent implements OnInit {
  personId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.personId = this.route.snapshot.paramMap.get('id')!;
    // استخدمي personId لجلب بيانات الشخص من الخدمة
  }
}
