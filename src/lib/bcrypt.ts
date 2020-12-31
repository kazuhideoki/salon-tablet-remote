// bcryptのライブラリを読み込む
import bcrypt from 'bcryptjs'; 

export const cipher = (password: string): Promise<string> => {
  // パスワードの強度を上げるにはsaltの数字を上げる
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hash(password, salt).then((res: string) => {
    return res
  })
}

export const checkPassword = (password:string, hash:string):Promise<boolean> => {
  // パスワードとハッシュを比較する
  return bcrypt.compare(password, hash).then(res => {
      if (res) {
        return true
      } else {
        return false
      }
    }
  );

}