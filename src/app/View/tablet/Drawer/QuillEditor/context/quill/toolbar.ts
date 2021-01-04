import Quill from 'quill';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const Parchment = Quill.imports.parchment;
// const Parchment = Quill.import('parchment');

const Align = Parchment.Attributor.Class('align', 'ql-align');
const offsetAttributor = new Parchment.Attributor.Attribute(
  'nameClass',
  'class',
  {
    scope: Parchment.Scope.INLINE,
  }
);

Quill.register(offsetAttributor);

export class Toolbar {
  constructor(resizer: any) {
    this.overlay = resizer.overlay;
    this.img = resizer.img;
    this.options = resizer.options;
    this.requestUpdate = resizer.onUpdate;
  }
  toolbar: any;
  options: any;
  overlay: any;
  alignments: any;
  img: any;
  requestUpdate: any;
  onCreate = (): void => {
    // Setup Toolbar
    this.toolbar = document.createElement('div');
    Object.assign(this.toolbar.style, this.options.toolbarStyles);
    this.overlay.appendChild(this.toolbar);

    // Setup Buttons
    this._defineAlignments();
    this._addToolbarButtons();
  };

  // The toolbar and its children will be destroyed when the overlay is removed
  onDestroy = (): void => {
    return;
  };

  // Nothing to update on drag because we are are positioned relative to the overlay
  onUpdate = (): void => {
    return;
  };

  _defineAlignments = (): void => {
    this.alignments = [
      {
        icon: '←',
        apply: () => {
          Align.add(this.img.parentNode, 'left');
        },
        //  isApplied: () => FloatStyle.value(this.img) == "left",
        isApplied: (): void => {
          return;
        },
      },
      {
        icon: '○',
        apply: () => {
          Align.add(this.img.parentNode, 'center');
        },
        //  isApplied: () => MarginStyle.value(this.img) == "auto",
        isApplied: (): void => {
          return;
        },
      },
      {
        icon: '→',
        apply: () => {
          Align.add(this.img.parentNode, 'right');
        },
        //  isApplied: () => FloatStyle.value(this.img) == "right",
        isApplied: (): void => {
          return;
        },
      },
    ];
  };

  _addToolbarButtons = (): void => {
    const buttons: any[] = [];
    this.alignments.forEach((alignment: any, idx: any) => {
      const button = document.createElement('span');
      buttons.push(button);
      button.innerHTML = alignment.icon;
      button.addEventListener('click', () => {
        // deselect all buttons
        buttons.forEach((button) => (button.style.filter = ''));
        if (alignment.isApplied()) {
          // If applied, unapply
          //  FloatStyle.remove(this.img);
          //  MarginStyle.remove(this.img);
          //  DisplayStyle.remove(this.img);
        } else {
          // otherwise, select button and apply
          this._selectButton(button);
          alignment.apply();
        }
        // image may change position; redraw drag handles
        this.requestUpdate();
      });
      Object.assign(button.style, this.options.toolbarButtonStyles);
      if (idx > 0) {
        button.style.borderLeftWidth = '0';
      }
      Object.assign(
        //  button.children[0].style,
        this.options.toolbarButtonSvgStyles
      );
      if (alignment.isApplied()) {
        // select button if previously applied
        this._selectButton(button);
      }
      this.toolbar.appendChild(button);
    });
  };

  _selectButton = (button: any): void => {
    button.style.filter = 'invert(20%)';
  };
}
