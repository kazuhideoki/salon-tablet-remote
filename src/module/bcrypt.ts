// bcryptのライブラリを読み込む
const bcrypt = require('bcryptjs'); 

export const cipher = (password: string) => {
  console.log("cipherの引数のpasswordは " + password);
  // パスワードの強度を上げるにはsaltの数字を上げる
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hash(password, salt).then((res: string) => {
    return res
  })
}

export const checkPassword = (password:string, hash:string):boolean => {
  // パスワードとハッシュを比較する
  return bcrypt.compare(password, hash).then(res => {
      if (res) {
        console.log('パスワード一致');
        return true
      } else {
        console.log('パスワード不一致');
        return false
      }
    }
  );

}