import Quill from "quill";

//@ts-ignore
const Parchment = Quill.imports.parchment;
const Align = new Parchment.Attributor.Class("align", "ql-align");
const offsetAttributor = new Parchment.Attributor.Attribute(
  "nameClass",
  "class",
  {
    scope: Parchment.Scope.INLINE,
  }
);

Quill.register(offsetAttributor);

export class Toolbar {
         constructor(resizer) {
           //@ts-ignore
           this.overlay = resizer.overlay;
           //@ts-ignore
           this.img = resizer.img;
           //@ts-ignore
           this.options = resizer.options;
           //@ts-ignore
           this.requestUpdate = resizer.onUpdate;
         }
         toolbar;
         options;
         overlay;
         alignments;
         img;
         requestUpdate;
         onCreate = () => {
           // Setup Toolbar
           this.toolbar = document.createElement("div");
           Object.assign(this.toolbar.style, this.options.toolbarStyles);
           this.overlay.appendChild(this.toolbar);

           // Setup Buttons
           this._defineAlignments();
           this._addToolbarButtons();
         };

         // The toolbar and its children will be destroyed when the overlay is removed
         onDestroy = () => {};

         // Nothing to update on drag because we are are positioned relative to the overlay
         onUpdate = () => {};

         _defineAlignments = () => {
           this.alignments = [
             {
               icon: "←",
               apply: () => {
                Align.add(this.img.parentNode, "left");
               },
               //  isApplied: () => FloatStyle.value(this.img) == "left",
               isApplied: () => {},
             },
             {
               icon: "○",
               apply: () => {
                Align.add(this.img.parentNode, "center");
               },
               //  isApplied: () => MarginStyle.value(this.img) == "auto",
               isApplied: () => {},
             },
             {
               icon: "→",
               apply: () => {
                 Align.add(this.img.parentNode, "right");
               },
               //  isApplied: () => FloatStyle.value(this.img) == "right",
               isApplied: () => {},
             },
           ];
         };

         _addToolbarButtons = () => {
           const buttons = [];
           this.alignments.forEach((alignment, idx) => {
             const button = document.createElement("span");
             buttons.push(button);
             button.innerHTML = alignment.icon;
             button.addEventListener("click", () => {
               // deselect all buttons
               buttons.forEach((button) => (button.style.filter = ""));
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
               button.style.borderLeftWidth = "0";
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

         _selectButton = (button) => {
           button.style.filter = "invert(20%)";
         };
       }
