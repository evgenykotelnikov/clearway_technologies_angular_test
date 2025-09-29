import { AfterViewInit, Directive, ElementRef, HostListener, OnDestroy, output, Renderer2 } from '@angular/core';
import { DragDelta } from './drag-delta.interface';

@Directive({
  selector: '[appDrag]',
  host: {
    '[style.cursor]': '"move"',
    '[attr.draggable]': '"false"'
  }
})
export class DragDirective implements AfterViewInit, OnDestroy {

  readonly dragEnd = output<DragDelta>();

  private _removeMouseMoveEventListener: () => void = () => {};
  private _dragDisabledElements: NodeList | undefined = undefined;
  private readonly _dragDelta: DragDelta = {
    x: 0,
    y: 0
  };
  private _dragStarted: boolean = false;

  constructor(private readonly _elementRef: ElementRef,
              private readonly _renderer: Renderer2) { }

  ngAfterViewInit() {
    this._dragDisabledElements = this._elementRef.nativeElement.querySelectorAll('[appDragDisabled]');
  }

  @HostListener('mousedown', ['$event'])
  protected startDrag(event: MouseEvent) {
    if (this._dragStarted || this.isDragDisabled(event.target as HTMLElement))
      return;

    this._dragStarted = true;
    this._removeMouseMoveEventListener = this._renderer.listen('window', 'mousemove', this.move.bind(this));
  }

  @HostListener('window:mouseup')
  protected endDrag() {
    if (!this._dragStarted)
      return;
    
    this._removeMouseMoveEventListener();

    this.dragEnd.emit(this._dragDelta);
    this._dragStarted = false;
    this.resetPosition();
  }

  private move(event: MouseEvent) {
    this._dragDelta.x += event.movementX;
    this._dragDelta.y += event.movementY;

    this.updatePosition();
  }

  private updatePosition() {
    this._renderer.setStyle(
      this._elementRef.nativeElement,
      'transform',
      `translate(${this._dragDelta.x}px, ${this._dragDelta.y}px)`
    );
  }

  private isDragDisabled(target: HTMLElement): boolean {
    for (const e of this._dragDisabledElements || [])
      if (e === target || e.contains(target))
        return true;

    return false;
  }

  private resetPosition() {
    this._dragDelta.x = 0;
    this._dragDelta.y = 0;
    this.updatePosition();
  }

  ngOnDestroy() {
    this._removeMouseMoveEventListener();
  }

}
