export const removeExceededImgs = (ImgNode,maxNumberOfImgs) => {
         ImgNode.forEach((value, key) => {

           if (key === maxNumberOfImgs) {
             alert(`画像の挿入は${maxNumberOfImgs}までです。`);
           }

           if (key >= maxNumberOfImgs) {
             value.remove();
           }
         });
       };