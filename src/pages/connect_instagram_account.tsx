import { Button } from '@material-ui/core';

function ConnectInstagramAccount() {
  return (
    <div>
      <Button onClick={() => handleOnClick()}>
        インスタグラムアカウントにつなげる
      </Button>
    </div>
  );
}

export default ConnectInstagramAccount;
