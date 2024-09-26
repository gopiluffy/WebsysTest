import { Component, ElementRef, EventEmitter, Inject, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content.component';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnChanges {

  @Output() confirmed = new EventEmitter<boolean>();
  @ViewChild('errorSound') errorSound!: ElementRef<HTMLAudioElement>;
  @ViewChild('questionSound') questionSound!: ElementRef<HTMLAudioElement>;

  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>, 
              public ParentdialogRef: MatDialogRef<DialogContentComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: { errorMessage: string, IsError: boolean }) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.playSound();
    }
  }

  ngAfterViewInit() {
    this.playSound();
  }

  playSound(): void {
    if (this.data.IsError) {
      this.errorSound?.nativeElement.play();
    } else {
      this.questionSound?.nativeElement.play();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  confirmAction(): void {
    this.confirmed.emit(true);
    this.dialogRef.close();
  }

  cancelAction(): void {
    this.confirmed.emit(false);
    this.dialogRef.close();
  }
}
