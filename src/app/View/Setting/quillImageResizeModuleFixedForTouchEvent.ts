import { BaseModule } from "quill-image-resize-module-react/src/modules/BaseModule";

// imageのResizeをtouchイベントでも適応するためのquill-image-resize-module-react用のモジュール
export class Resize extends BaseModule {
  onCreate = () => {
    // console.log("onCreateだよ");

    // track resize handles
    //@ts-ignore
    this.boxes = [];

    // add 4 resize handles
    this.addBox("nwse-resize"); // top left
    this.addBox("nesw-resize"); // top right
    this.addBox("nwse-resize"); // bottom right
    this.addBox("nesw-resize"); // bottom left

    this.positionBoxes();
  };

  onDestroy = () => {
    // console.log("onDestroyだよ");

    // reset drag handle cursors
    this.setCursor("");
  };

  positionBoxes = () => {
    // console.log("positionBoxesだよ");
    //@ts-ignore
    const handleXOffset = `${-parseFloat(this.options.handleStyles.width) /
      2}px`;
    //@ts-ignore
    const handleYOffset = `${-parseFloat(this.options.handleStyles.height) /
      2}px`;

    // set the top and left for each drag handle
    [
      { left: handleXOffset, top: handleYOffset }, // top left
      { right: handleXOffset, top: handleYOffset }, // top right
      { right: handleXOffset, bottom: handleYOffset }, // bottom right
      { left: handleXOffset, bottom: handleYOffset }, // bottom left
    ].forEach((pos, idx) => {
      //@ts-ignore
      Object.assign(this.boxes[idx].style, pos);
    });
  };

  addBox = (cursor) => {
    // console.log("addBoxだよ");

    // create div element for resize handle
    const box = document.createElement("div");

    // Star with the specified styles
    //@ts-ignore
    Object.assign(box.style, this.options.handleStyles);
    box.style.cursor = cursor;

    // Set the width/height to use 'px'
    //@ts-ignore
    box.style.width = `${this.options.handleStyles.width}px`;

    //@ts-ignore
    box.style.height = `${this.options.handleStyles.height}px`;

    // listen for mousedown on each box
    box.addEventListener("mousedown", this.handleMousedown, false);
    box.addEventListener("touchstart", this.handleTouchStart, false);
    // add drag handle to document
    //@ts-ignore
    this.overlay.appendChild(box);
    // keep track of drag handle
    //@ts-ignore
    this.boxes.push(box);
  };

  handleMousedown = (evt) => {
    // console.log("handleMousedownだよ");

    // note which box
    //@ts-ignore
    this.dragBox = evt.target;
    // note starting mousedown position
    //@ts-ignore
    this.dragStartX = evt.clientX;
    //@ts-ignore
    // console.log("dragStartXは " + this.dragStartX);
    // store the width before the drag
    //@ts-ignore
    this.preDragWidth = this.img.width || this.img.naturalWidth;
    // set the proper cursor everywhere
    //@

    //@ts-ignore
    this.setCursor(this.dragBox.style.cursor);
    // listen for movement and mouseup
    document.addEventListener("mousemove", this.handleDrag, false);
    document.addEventListener("mouseup", this.handleMouseup, false);
  };
  handleTouchStart = (evt) => {
    evt.preventDefault();
    // console.log("handleTouchStartだよ");

    // note which box
    //@ts-ignore
    this.dragBox = evt.target;
    // note starting mousedown position
    //@ts-ignore
    // this.dragStartX = evt.clientX;
    this.dragStartX = evt.touches[0].clientX;
    //@ts-ignore
    // console.log("dragStartXは " + this.dragStartX);

    // store the width before the drag
    //@ts-ignore
    this.preDragWidth = this.img.width || this.img.naturalWidth;
    // set the proper cursor everywhere
    //@ts-ignore
    this.setCursor(this.dragBox.style.cursor);
    // listen for movement and mouseup
    document.addEventListener("touchmove", this.handleTouchmove, false);
    document.addEventListener("touchend", this.handleTouchend, false);
  };

  handleMouseup = () => {
    // console.log("handleMouseupだよ");
    // reset cursor everywhere
    this.setCursor("");
    // stop listening for movement and mouseup
    document.removeEventListener("mousemove", this.handleDrag);
    document.removeEventListener("mouseup", this.handleMouseup);
  };
  handleTouchend = (evt) => {
    evt.preventDefault();
    // console.log("handleTouchendだよ");

    // reset cursor everywhere
    this.setCursor("");
    // stop listening for movement and mouseup
    document.removeEventListener("touchmove", this.handleTouchmove);
    document.removeEventListener("touchend", this.handleTouchend);
  };

  handleDrag = (evt) => {
    // console.log("handleDragだよ");

    //@ts-ignore
    if (!this.img) {
      // image not set yet
      return;
    }
    // update image size

    //@ts-ignore
    const deltaX = evt.clientX - this.dragStartX;
    // console.log("deltaXは " + deltaX);
    //@ts-ignore
    if (this.dragBox === this.boxes[0] || this.dragBox === this.boxes[3]) {
      // left-side resize handler; dragging right shrinks image
      //@ts-ignore
      this.img.width = Math.round(this.preDragWidth - deltaX);
    } else {
      // right-side resize handler; dragging right enlarges image
      //@ts-ignore
      this.img.width = Math.round(this.preDragWidth + deltaX);
    }
    //@ts-ignore
    this.requestUpdate();
  };
  handleTouchmove = (evt) => {
    evt.preventDefault();
    // console.log("handleTouchmoveだよ");

    //@ts-ignore
    if (!this.img) {
      // image not set yet
      return;
    }
    // update image size
    //@ts-ignore
    // const deltaX = evt.clientX - this.dragStartX;
    const deltaX = evt.touches[0].clientX - this.dragStartX;
    // console.log("deltaXは " + deltaX);

    //@ts-ignore
    if (this.dragBox === this.boxes[0] || this.dragBox === this.boxes[3]) {
      // left-side resize handler; dragging right shrinks image
      //@ts-ignore
      this.img.width = Math.round(this.preDragWidth - deltaX);
    } else {
      // right-side resize handler; dragging right enlarges image
      //@ts-ignore
      this.img.width = Math.round(this.preDragWidth + deltaX);
    }
    //@ts-ignore
    this.requestUpdate();
  };

  setCursor = (value) => {
    //@ts-ignore
    [document.body, this.img].forEach((el) => {
      el.style.cursor = value; // eslint-disable-line no-param-reassign
    });
  };
}
