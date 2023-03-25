---
title: マイサイトの技術スタック
createdAt: 2021-12-30
updatedAt: 2021-12-30
category: [think]
slug: tech-stack-of-my-site
keyVisual: "./kv.jpg"
author: morimorig3
---

## 構成

- React (17.0.2)
- Next.js (12.0.7)
- tailwind (3.0.7)
- CMS contentful
- ホスト　vercel

## 試したかったこと

**JAMstackでページ作りたかった。** 変化が早いとはいえ、まだ死語じゃないですよね？

使いたかったなんて技術選定の理由になるかァ！と言われちゃうかもしれませんが、エンジニアの本心としてはやっぱりこれですよね。

後付けで、理由をつけるとしたら。下記あたりでしょうか。

- 高いパフォーマンス
- スケーラビリティ

## UIライブラリ

UIライブラリはまだReactしか使えないため、Reactです。

Reactのフレームワーク選びですが、JAMstackはじめてということもあり情報の多さを重視しました。
製作開始時点では[Next.js](https://nextjs.org/ "Next.js")や[Gatsby.js](https://www.gatsbyjs.com/ "gatsby.js")の2択で、Next.jsに決定。

Next.jsは公式ドキュメントが有志によって日本語されていたし、Vercel社CEOのRauch氏の[ブログ](https://rauchg.com/ja/2020/vercel)にワクワクしました。

>ユーザーにとってはより速く、開発者にとってはより開発しやすく。ウェブの新時代はまだ始まったばかりです。

[Next.js](https://nextjs.org/)

[Gatsby.js](https://www.gatsbyjs.com/)

## スタイル

スタイルに関しては、個人的に使いやすいと感じているtailwindCSSを選択してしまいました。

tailwindCSSが圧倒的に描きやすいと思っているが、市場のコードはstyled componentsやEmotionも多く勉強のために次何かを作るときは使ってみたいです。

tailwindもコードの見通しがすぐに悪くなるから決して最強というわけじゃないんだけど・・・CSSって難しいですね。

[Tailwind CSS - Rapidly build modern websites without ever leaving your HTML.d](https://tailwindcss.com/)

## ヘッドレスCMS

コンテンツの管理を任せるCMSですが、こちらも情報の多さを重視しました。最近よく聞くmicroCMSや一度お世話になったこともあるcontentfulで迷いました。
日本製のmicroCMSは公式ドキュメントが読みやすく使い勝手もいいだろうと思いましたが、Qiitaの検索でcontentfulの方が2倍以上の記事数があるcontentfulを採用しました。

[The platform to bring your best ideas to life | Contentful](https://www.contentful.com/)

[microCMS公式ドキュメント](https://document.microcms.io/)

## ホスティングサービス

Next.jsなのでVercel一択

実はまだサーバー側の知識がほとんどないので、ホスティングサービス側でやっていることがあまり理解できていません。git pushしたら魔法のようにウェブサイトができあがっている感覚です。

pushがトリガーになって、サーバー側のNode.jsでbuildコマンドが叩かれてpublicディレクトリに吐き出さているんだろうと信じています。

## デザイン

デザインについては、本業でもなく深く勉強をしたこともないので、プロフェッショナル達の作品を参考にさせていただきました。

[Next.js by Vercel - The React Framework](https://nextjs.org/)

[React – ユーザインターフェース構築のための JavaScript ライブラリ](https://ja.reactjs.org/)

[メルカリエンジニアリング](https://engineering.mercari.com/)

[Zenn｜エンジニアのための情報共有コミュニティ](https://zenn.dev/)

---
ひとまずやりたいことはできたかなというところでございます。

唯一できなかったのが、カテゴリーごとに記事を分けた時に、ソートキーになったカテゴリーしかブログリスト内に表示されないという問題。

伸びしろだと思っておきます。