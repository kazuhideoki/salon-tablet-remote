const { check, validationResult } = require("express-validator");

// ※withMessageを表示できるようにあとから改良
export const articlesValidation = [
  check("title")
    .isLength({ min: 0, max: 100 })
    .withMessage("タイトルは100文字以内にしてください。"),
  // 圧縮された一枚の画像も含めたサイズ。万が一超えたときのためのバリデーション
  check("article_content")
    .isLength({ min: 0, max: 500000 })
    .withMessage("送信データが大きすぎます。"),
];
export const footerItemsValidation = [
  check("IconName")
    .isLength({ min: 0, max: 100 })
    .withMessage("アイコン名は100文字以内にしてください。"),
  // 圧縮された一枚の画像も含めたサイズ。万が一超えたときのためのバリデーション
  check("item_content")
    .isLength({ min: 0, max: 500000 })
    .withMessage("送信データが大きすぎます。"),
];

export const validationErrorHandle = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // バリデーション失敗
    res.status(422).json({ err: true, data: { message: errors.array() } });
  }
};
