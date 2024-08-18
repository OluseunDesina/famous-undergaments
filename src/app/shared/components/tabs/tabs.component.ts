import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  @Input() tabs: any[] = [];
  @Output() tabSelect: EventEmitter<any> = new EventEmitter<any>();
  @Input() activeTab: any;

  onTabSelect(tab: any) {
    this.tabSelect.emit(tab)
  }

}
