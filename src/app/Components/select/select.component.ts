import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Type } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  @Input() type: any[] = []
}
