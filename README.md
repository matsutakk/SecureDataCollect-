# SecureDataCollect

視聴履歴やクリック回数などのユーザーデータを、準同型暗号によって暗号化してイーサリアム上に保存する。
データの属性はジャンルで表現する。例えば、["恋愛系", "音楽系", "お笑い系"]として音楽動画をクリックした場合、ベクトル[0,1,0]を暗号化してスマートコントラクトに送信し、準同型暗号によって今までの視聴履歴ベクトルと足し算を行うことで視聴履歴(どんなジャンルを何回クリックしたか)を更新する

## スマートコントラクトのテスト

以下をテストした
- ゼロを暗号化して初期ベクトル[0,0,0,0,0]が暗号化されアドレスに紐づけて保存できていること
- 適当なベクトル[0,1,0]等をを暗号化して準同型暗号によって足し算を行い、暗号化されたまま足し算が行われていること

```shell
git clone git@github.com:matsutakk/SecureDataCollect-.git
cd SecureDataCollect-
npm install
npx hardhat help
REPORT_GAS=true npx hardhat test
```
