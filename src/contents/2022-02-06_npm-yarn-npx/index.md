---
title: npmとyarnとnpxを説明できるようになる
createdAt: 2022-02-06
updatedAt: 2022-02-06
category: [think]
slug: npm-yarn-npx
keyVisual: "./kv.jpg"
author: morimorig3
---

## npmとyarnとnpxを説明できるようになる

今やフロントエンド開発に欠かせないコマンドラインツールであるnpmですが、npmって結局何なのと言われるとうまく説明できないなと感じました。
npm・yarn・npxを知らない人に簡単に説明できるレベルなれるようなレベルを目指したいと思います。

## Node.jsとは

npmを知るためには、Node.jsについて知る必要があります。

**Node.jsは、ブラウザ以外でJavaScriptを実行するために必要な環境です。**

以下で詳細を見ていきます。

[公式ページ](https://nodejs.org/ja/)の説明を見ます。

> Node.js® は、Chrome の V8 JavaScript エンジン で動作する JavaScript 環境です。

[$card](https://nodejs.org/ja/)

誤解を恐れず公式の説明を噛みくだいてみます。
Node.jsをインストールすればパソコンでJavaScriptファイルを実行できるようになるぞ！になるでしょう。

JavaScriptは、基本的にはブラウザ上でしか実行できません。しかし、Node.jsをインストールすることでブラウザ以外でもJavaScriptファイルを実行することができるようになります。

たとえば、下のようなスクリプトファイルはマウスでJSファイルをダブルクリックしても実行できません。
実行するためには、htmlファイルのscriptタグで読み込ませて、htmlファイルをブラウザで開く必要があります。

```js:helloworld.js
console.log('hello, world')
```

Node.jsをインストールすればコマンドラインツール（黒い画面、ターミナルやコマンドプロンプト）で実行が可能になります。

```
node helloworld.js // hello, world
```

<details>
<summary>ChromeのV8 JavaScriptエンジンとは</summary>

### JavaScriptエンジン

なぜブラウザでJavaScriptが動くのか？というと、ブラウザにJavaScriptエンジンが実装されているからです。

基本的にはブラウザによって違うエンジンが積み込まれています。それぞれ、名称も異なっています。

| Chrome | Firefox | Safari |
| ---- | ---- | ---- |
| V8 | SpiderMonkey | JavaScriptCore |

たとえるなら車のエンジンと同じです。トヨタのエンジン・ホンダのエンジン・マツダのエンジンなど、車を動かすという目的は同じですが、仕組みは違っています。

Node.jsは、ブラウザ以外でJavaScriptを実行する環境です。そして、動かしているエンジンはChromeと同じV8エンジンということになります。

</details>

## npmとは

**npmで提供されているパッケージを管理するコマンドラインツールです。**

ブラウザ以外で、JavaScriptで書いたプログラムが実行できるようになりました。そうすると開発を補助するツールがたくさん作られていきました。
それらのほとんどはオープンソースとしてオンラインで公開されました。そして、誰でも自由に使えるようになり、それらはパッケージと呼ばれるようになりました。

npmはNode Package Managerという名の通り、Node.jsで動くパッケージの管理ツールです。つまり、オープンソースとして公開されたプログラムを管理するツールがnpmになります。パッケージを追加・更新・削除・バージョン管理することができるコマンドラインツールです。

ここで[公式の説明](https://www.npmjs.com/about)も見ておきましょう。

> npmにはいろいろなものがあります。
>
> npmは、Node.jsのパッケージマネージャです。2009年にオープンソースプロジェクトとして、JavaScript開発者がパッケージ化されたコードモジュールを簡単に共有できるようにするために作成されました。
> 
> npmレジストリは、Node.js、フロントエンドのウェブアプリ、モバイルアプリ、ロボット、ルーター、その他JavaScriptコミュニティの無数のニーズに対応するオープンソースコードのパッケージの公開コレクションです。
> 
> npmは、開発者がこれらのパッケージをインストールし、公開するためのコマンドラインクライアントです。

[npm公式](https://www.npmjs.com/about)

npmと呼ばれるものにはいくつか意味があるようです。

- 会社名としてのnpm
- Node.jsのパッケージマネージャーとしてのnpm
- パッケージをインストールしたりするためのコマンドラインクライアントとしてのnpm

話の中でnpmが出てきたときは、3つ目のコマンドラインクライアントとしてのnpmと捉えれば問題ないでしょう。

## yarnとは

**npmの改良版として登場しましたが、現在はnpmとyarnの違いはほとんどありません。**

yarnはnpmの改良版として、旧Facebook社によって開発されました。
できることはnpmと同じで、公開されているパッケージを追加・更新・削除・管理することができます。npmとの互換性もあります。

ではなぜ開発されたのかというと。npmには、当初はバージョン管理やパフォーマンス、セキュリティの問題が山積していたためです。
しかし、yarn側の機能がnpmにも取り込まれていき、現在では気にするほどの違いはないようです。

[yarn公式](https://yarnpkg.com/)

## npxとは

**npmで提供されているパッケージをマシン上へインストールせずに、1回限り実行するときに便利なコマンドです。**

npxとは、npmパッケージで提供されているプログラムを実行するためのものです。該当のパッケージがパソコンにインストールされていればそれを実行する。されていなければ最新版をダウンロードして実行してくれます。そして、ダウンロードの場合は、実行後、そのコマンドのパッケージを削除します。

create-react-appなど、1回限りのコマンドを実行するときに有効です。ディスクの容量も節約することができる上に、ムダなものをインストールせずに済みます。

## まとめ

Node.jsは個人的に理解しにくい概念だと思っていました。名前のせいもあると思うんですが…（拡張子がjsでJavaScriptの実行環境？ってのが知らない人からすればわかりづらい）
調べてみて感じたのは、Node.jsのエコシステムの広がりはオープンソースの素晴らしいところだと思いました。開発者同士で協力してみんなハッピーになろうぜ！みたいなコミュニティの雰囲気が伝わってきて、自分もいつか貢献してみたいと思いました。

npmやyarn、npxについて納得していただければ幸いです。（わからなかった方は参考によりわかりやすいリンク貼っておくので、みにいってください汗）

## 参考

- [Node.js](https://nodejs.org/ja/)
- [npm](https://www.npmjs.com/)
- [yarn](https://yarnpkg.com/)
- [npmとyarnとpnpmの違い2021](https://zenn.dev/hibikine/articles/27621a7f95e761)
- [Node.jsとはなにか？なぜみんな使っているのか？](https://qiita.com/non_cal/items/a8fee0b7ad96e67713eb)
- [りあクト！ TypeScriptで始めるつらくないReact開発 第3.1版【Ⅰ. 言語・環境編】](https://booth.pm/ja/items/2368045)