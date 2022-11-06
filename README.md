# SecureDataCollect
- 使用したtech stacks: 
  - フロント:
    - 言語：TypeScript
    - ライブラリ：React
    - フレームワーク：Next.js
  - スマートコントラクト
    - 言語：Solidity
    - 開発環境：Hardhat

- 使用したBlockchain：Ethereum (Goerli)
- deployしたContract(ExplorerでOK)
  - [link](https://goerli.etherscan.io/address/0xC0D507226e73e4bCeED5a46F35cF07c1b7C9f077)
  - Address：0xC0D507226e73e4bCeED5a46F35cF07c1b7C9f077
- application codeやその他のfile
- テスト手順を含むリポジトリへのリンク
  - Please check this repository, [frontend1](https://github.com/matsutakk/web3youtube), [frontend2](https://github.com/matsutakk/web3twitter). 
  - Also our video include the information of screen transition

- 審査やテストのためにプロジェクトにアクセスする方法など
  - https://web3youtube.vercel.app/
  - https://web3youtube-pc3i.vercel.app/
  

## 概要
視聴履歴やクリック回数などのユーザーデータを、準同型暗号によって暗号化してイーサリアム上に保存する。
データの属性はジャンルで表現する。例えば、["恋愛系", "音楽系", "お笑い系"]として音楽動画をクリックした場合、ベクトル[0,1,0]を暗号化してスマートコントラクトに送信し、準同型暗号によって今までの視聴履歴ベクトルと足し算を行うことで視聴履歴(どんなジャンルを何回クリックしたか)を更新する

## スマートコントラクトのテスト

以下をテストした
- ゼロを暗号化して初期ベクトル[0,0,0,0,0]が暗号化されアドレスに紐づけて保存できていること
- 適当なベクトル[0,0,1,0,0]等をを暗号化して準同型暗号によって足し算を行い、暗号化されたまま足し算が行われていること

```shell
git clone git@github.com:matsutakk/SecureDataCollect-.git
cd SecureDataCollect-
npm install
npx hardhat help
REPORT_GAS=true npx hardhat test
```
