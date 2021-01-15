import Quill from 'quill';
import Parchment from 'parchment';

import { BaseModule, Toolbar } from 'quill-image-resize-module-react';

// const Parchment = Quill.import('parchment');

const Align = new Parchment.Attributor.Class('align', 'ql-align');
console.log('Alignは ' + JSON.stringify(Align));

const offsetAttributor = new Parchment.Attributor.Attribute(
  'nameClass',
  'class',
  {
    scope: Parchment.Scope.INLINE,
  }
);

Quill.register(offsetAttributor);

export class CustomToolbar extends Toolbar {
  constructor(resizer: any) {
    super();
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

  _defineAlignments = (): void => {
    this.alignments = [
      {
        icon: '←',
        apply: () => {
          Align.add(this.img.parentNode, 'left');
        },
      },
      {
        icon: '○',
        apply: () => {
          Align.add(this.img.parentNode, 'center');
        },
      },
      {
        icon: '→',
        apply: () => {
          Align.add(this.img.parentNode, 'right');
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
        buttons.forEach((button) => (button.style.filter = ''));

        this._selectButton(button);
        alignment.apply();
        this.requestUpdate();
      });
      Object.assign(button.style, this.options.toolbarButtonStyles);
      if (idx > 0) {
        button.style.borderLeftWidth = '0';
      }
      Object.assign(this.options.toolbarButtonSvgStyles);
      this.toolbar.appendChild(button);
    });
  };

  _selectButton = (button: any): void => {
    button.style.filter = 'invert(20%)';
  };
}
