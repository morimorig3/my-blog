---
title: og-imageを使ってOGP画像を動的に作成する方法
createdAt: 2022-01-10
updatedAt: 2022-01-10
category: [think]
slug: dynamic-ogp-ogimage
keyVisual: "./ogp-after.png"
author: morimorig3
---

<notice type='alert'>この記事の内容は古いです！</notice>

現在はVercelから`@vercel/og`がリリースされているのでそちらを使用するようにしてください！

[Introducing OG Image Generation: Fast, dynamic social card images at the Edge](https://vercel.com/blog/introducing-vercel-og-image-generation-fast-dynamic-social-card-images)

---

OGPを動的に生成する方法は[imgix](https://blog.microcms.io/imgix-ogp/)や[cloudinary](https://catnose.me/notes/cloudinary-dynamic-ogp-image)などいくつかありますが、手軽に始められるog-imageを紹介します。

この記事では主に、日本語化とBudouXの導入について解説します。og-imageの導入解説記事は先人が素晴らしいものを残してくれています。

[vercel/og-imageを使ったブログOGPの簡単自動生成](https://qiita.com/p1ass/items/b8d5c1f3f4a5fd984d2c)

[vercel/og-imageをフォークして自分だけのOGP画像生成サービスを作ろう](https://scrapbox.io/mkizka/vercel%2Fog-image%E3%82%92%E3%83%95%E3%82%A9%E3%83%BC%E3%82%AF%E3%81%97%E3%81%A6%E8%87%AA%E5%88%86%E3%81%A0%E3%81%91%E3%81%AEOGP%E7%94%BB%E5%83%8F%E7%94%9F%E6%88%90%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%82%92%E4%BD%9C%E3%82%8D%E3%81%86)

## og-imageとは

Next.jsを開発しているVercel社が提供する、動的にOpen Graph画像を生成するサービスです。

[vercel/og-image: Open Graph Image as a Service - generate cards for Twitter, Facebook, Slack, etc](https://github.com/vercel/og-image)

## 手順

1. ホスティングまで
2. 日本語化
3. BudouX導入

### ホスティングまで

[vercel/og-image: Open Graph Image as a Service - generate cards for Twitter, Facebook, Slack, etc](https://github.com/vercel/og-image)

デプロイの手順通り進めれば、Vercelでホスティングまでしてくれます。

### 日本語化

og-imageで日本語を表示に対応するためには、日本語フォントを導入する必要があります。ここではNotoを使用します。

フォントのデータが必要なので用意します。私は、サブセット化されているものを使用しました。

[ixkaito/NotoSansJP-subset: Noto Sans JP サブセット (OTF, WOFF, WOFF 2.0)](https://github.com/ixkaito/NotoSansJP-subset)

ダウンロードしてきた、フォントファイルを`_fonts`フォルダーに格納して`template.ts`で読み込ませます。

```ts
  const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString("base64");
  const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString("base64");
  const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString("base64");
  const noto = readFileSync(`${__dirname}/../_fonts/NotoSansJP-Bold.woff2`).toString("base64");
```

あとはCssを出力しているgetCssの中で定義して使用するだけで完了です。

```ts
  function getCss(fontSize: string) {
    let foreground = "#333333";

    return `
    @font-face {
      font-family: 'Noto';
      font-style:  normal;
      font-weight: normal;
      src: url(data:font/woff2;charset=utf-8;base64,${noto}) format('woff2');
    }

    .heading {
      font-family: 'Noto', sans-serif;
      font-size: ${sanitizeHtml(fontSize)};
      font-weight: 700;
      color: ${foreground};
      line-height: 1.3;
      max-width: 1000px
    }
    `;
  }
```

### BudouX導入

Webで問題になりがちな日本語の改行位置を調整します。BudouXはGoogleが開発している、日本語改行位置を自動的にいい感じに調整してくれるツールです。

こんな感じに調整してくれます。

![ogp-before](./ogp-before.png)
*ビフォー*

![ogp-after](./ogp-after.png)
*アフター*

インストール・使い方

[BudouX 🍇](https://google.github.io/budoux/)

getHtmlの中でHTMLを出力して返り値に渡してあげると完了です。

```ts
  import { loadDefaultJapaneseParser } from "budoux";
...
  export function getHtml(parsedReq: ParsedRequest) {
    const { text, md, fontSize } = parsedReq;
    const parser = loadDefaultJapaneseParser();
    const title = parser.translateHTMLString(text);
    return `<!DOCTYPE html>
  <html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      ${getCss(fontSize)}
    </style>
    <body>
      <div class="grid">
        <div class="heading">${emojify(
          md ? marked(title) : sanitizeHtml(title)
        )}
        </div>
      </div>
    </body>
  </html>`;
  }
```

---

og-imageはHTMLページをレンダリングしてスクリーンショットを撮っているだけのようなのでBudouXの導入も簡単でしたね。

## 参考

- [vercel/og-image: Open Graph Image as a Service - generate cards for Twitter, Facebook, Slack, etc](https://github.com/vercel/og-image)
- [vercel/og-imageをフォークして自分だけのOGP画像生成サービスを作ろう](https://scrapbox.io/mkizka/vercel%2Fog-image%E3%82%92%E3%83%95%E3%82%A9%E3%83%BC%E3%82%AF%E3%81%97%E3%81%A6%E8%87%AA%E5%88%86%E3%81%A0%E3%81%91%E3%81%AEOGP%E7%94%BB%E5%83%8F%E7%94%9F%E6%88%90%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%82%92%E4%BD%9C%E3%82%8D%E3%81%86)
- [BudouX 🍇](https://google.github.io/budoux/)
- [BudouXでOGP画像のテキストを読みやすくしてみた](https://b.0218.jp/202112010002.html)
- [2021-08-16 Setup og-image for TiddlyJam](https://thaddeusjiang.com/2021-08-16-setup-og-image-for-tiddlyjam)