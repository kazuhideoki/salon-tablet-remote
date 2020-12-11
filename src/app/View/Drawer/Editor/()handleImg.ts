import * as TQuill from "quill";

// deltaコンテンツの中にimageがあるか判定して、あればsetHasImgでtrueにして、なければfalseにする
export const checkImg = (
         deltaContents: TQuill.DeltaStatic,
         setHasMaxImgs: React.Dispatch<React.SetStateAction<boolean>>,
         removeImg: () => void
       ) => {
         // ※もしかしたらquillのなんらかのメソッドで簡潔に書けるかも
         let isCheckImg = false;
         let imgData: string = "";
         let isCheckMoreImgs = false;
         for (let n in deltaContents.ops) {

           for (let value in deltaContents.ops[n]) {
             if (value === "insert") {

               for (let value2 in deltaContents.ops[n]["insert"]) {
                 if (value2 === "image") {

                   // 2つ目の画像でisCheckMoreImgsをtrueに
                   isCheckMoreImgs = isCheckImg ? true : false;
                   // 1つめの画像でischeckimgをtrueに
                   isCheckImg = true;
                   // 1つめの画像のデータをimgDataに格納
                   if (imgData === "") {
                     imgData = deltaContents.ops[n]["insert"]["image"];
                   }
                 }
               }
             }
           }
         }

         isCheckImg ? setHasMaxImgs(true) : setHasMaxImgs(false);
         // 画像が複数ある場合最初のimgを削除する。その後onChangeが再発火してcheckInsertImgも再発火。imgが一つになるまで続く。
         isCheckMoreImgs ? removeImg() : null;

         return imgData;
       };

export const removeImg = (elementName) => {
  const editor = document.getElementsByClassName(elementName);

  for (const key in editor) {
    if (editor.hasOwnProperty(key)) {
      const element = editor[key];
      const imgs = element.querySelectorAll("img");

      if (imgs) {
        imgs.forEach((element) => {
          element.remove();
        });
      }
    }
  }
};
