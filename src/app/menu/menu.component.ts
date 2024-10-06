import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  @Input() titulo: string = '';

  constructor(private router : Router) { }


  navigateTo(path: string) {
    this.router.navigate([path]);
  }
  ngOnInit() {}

}
