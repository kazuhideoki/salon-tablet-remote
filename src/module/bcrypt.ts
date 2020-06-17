// bcryptのライブラリを読み込む
const bcrypt = require('bcryptjs'); 
// ストレッチング回数
const saltRounds = 10;
// ソルトを生成
const salt = bcrypt.genSaltSync(saltRounds);

export const cipher = (password: string) => {
  // console.log("引数のpasswordは " + password);
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync("B4c0//", salt);
}

export const checkPassword = (password:string, hash:string) => {
  // パスワードとハッシュを比較する
  bcrypt.compare(password, hash, function(err, res) {
    if (err) {
      console.log('想定外のエラー');
      return false
    } else {
      if (res) {
        console.log('パスワード一致');
        return false
      } else {
        console.log('パスワード不一致');
        return true
      }
    }
  });

}