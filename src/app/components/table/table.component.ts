import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() actionBtn: string;
  @Input() tableOpts: any;
  @Input() tableData: any[];
  @Input() displayedColumns: string[];
  @Input() columnTitles: any;

  @Output() viewItem = new EventEmitter();
  @Output() actionClick = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<object>;

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  view(id: string) {
    this.viewItem.emit(id);
  }
}
