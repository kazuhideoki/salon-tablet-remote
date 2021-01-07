import { BaseModule } from 'quill-image-resize-module-react';

// imageのResizeをtouchイベントでも適応するためのquill-image-resize-module-react用のモジュール
// export class Resize {
//   constructor(resizer) {
//     this.overlay = resizer.overlay;

//     this.img = resizer.img;

//     this.options = resizer.options;

//     this.requestUpdate = resizer.onUpdate;
//   }
export class Resize extends BaseModule {
  constructor(resizer: any) {
    super();
    this.boxes = resizer.boxes;
    this.preDragWidth = resizer.preDragWidth;
    this.dragStartX = resizer.dragStartX;
    this.dragBox = resizer.dragBox;
  }

  overlay: any;
  img: any;
  options: any;
  requestUpdate: any;
  boxes: any[];
  preDragWidth: any;
  dragStartX: any;
  dragBox: any;

  onCreate = () => {
    // track resize handles

    this.boxes = [];

    // add 4 resize handles
    this.addBox('nwse-resize'); // top left
    this.addBox('nesw-resize'); // top right
    this.addBox('nwse-resize'); // bottom right
    this.addBox('nesw-resize'); // bottom left

    this.positionBoxes();
  };

  onDestroy = (): void => {
    // reset drag handle cursors
    this.setCursor('');
  };

  positionBoxes = (): void => {
    const handleXOffset = `${
      -parseFloat(this.options.handleStyles.width) / 2
    }px`;

    const handleYOffset = `${
      -parseFloat(this.options.handleStyles.height) / 2
    }px`;

    // set the top and left for each drag handle
    [
      { left: handleXOffset, top: handleYOffset }, // top left
      { right: handleXOffset, top: handleYOffset }, // top right
      { right: handleXOffset, bottom: handleYOffset }, // bottom right
      { left: handleXOffset, bottom: handleYOffset }, // bottom left
    ].forEach((pos, idx) => {
      Object.assign(this.boxes[idx].style, pos);
    });
  };

  addBox = (cursor: any): void => {
    // create div element for resize handle
    const box = document.createElement('div');

    // Star with the specified styles

    Object.assign(box.style, this.options.handleStyles);
    box.style.cursor = cursor;

    // Set the width/height to use 'px'

    box.style.width = `${this.options.handleStyles.width}px`;

    box.style.height = `${this.options.handleStyles.height}px`;

    // listen for mousedown on each box
    box.addEventListener('mousedown', this.handleMousedown, false);
    box.addEventListener('touchstart', this.handleTouchStart, false);
    // add drag handle to document

    this.overlay.appendChild(box);
    // keep track of drag handle

    this.boxes.push(box);
  };

  handleMousedown = (evt: any): void => {
    this.dragBox = evt.target;
    // note starting mousedown position

    this.dragStartX = evt.clientX;

    // store the width before the drag

    this.preDragWidth = this.img.width || this.img.naturalWidth;
    // set the proper cursor everywhere
    //@

    this.setCursor(this.dragBox.style.cursor);
    // listen for movement and mouseup
    document.addEventListener('mousemove', this.handleDrag, false);
    document.addEventListener('mouseup', this.handleMouseup, false);
  };
  handleTouchStart = (evt: any): void => {
    evt.preventDefault();

    // note which box

    this.dragBox = evt.target;
    // note starting mousedown position

    // this.dragStartX = evt.clientX;
    this.dragStartX = evt.touches[0].clientX;

    // store the width before the drag

    this.preDragWidth = this.img.width || this.img.naturalWidth;
    // set the proper cursor everywhere

    this.setCursor(this.dragBox.style.cursor);
    // listen for movement and mouseup
    document.addEventListener('touchmove', this.handleTouchmove, false);
    document.addEventListener('touchend', this.handleTouchend, false);
  };

  handleMouseup = (): void => {
    // reset cursor everywhere
    this.setCursor('');
    // stop listening for movement and mouseup
    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleMouseup);
  };
  handleTouchend = (evt: any): void => {
    evt.preventDefault();

    // reset cursor everywhere
    this.setCursor('');
    // stop listening for movement and mouseup
    document.removeEventListener('touchmove', this.handleTouchmove);
    document.removeEventListener('touchend', this.handleTouchend);
  };

  handleDrag = (evt: any): void => {
    if (!this.img) {
      // image not set yet
      return;
    }
    // update image size

    const deltaX = evt.clientX - this.dragStartX;

    if (this.dragBox === this.boxes[0] || this.dragBox === this.boxes[3]) {
      // left-side resize handler; dragging right shrinks image

      this.img.width = Math.round(this.preDragWidth - deltaX);
    } else {
      // right-side resize handler; dragging right enlarges image

      this.img.width = Math.round(this.preDragWidth + deltaX);
    }

    this.requestUpdate();
  };
  handleTouchmove = (evt: any): void => {
    evt.preventDefault();

    if (!this.img) {
      // image not set yet
      return;
    }
    // update image size

    // const deltaX = evt.clientX - this.dragStartX;
    const deltaX = evt.touches[0].clientX - this.dragStartX;

    if (this.dragBox === this.boxes[0] || this.dragBox === this.boxes[3]) {
      // left-side resize handler; dragging right shrinks image

      this.img.width = Math.round(this.preDragWidth - deltaX);
    } else {
      // right-side resize handler; dragging right enlarges image

      this.img.width = Math.round(this.preDragWidth + deltaX);
    }

    this.requestUpdate();
  };

  setCursor = (value: any): void => {
    [document.body, this.img].forEach((el) => {
      el.style.cursor = value; // eslint-disable-line no-param-reassign
    });
  };
  onUpdate = (): void => {
    return;
  };
}
