---
title: ブログの記法まとめ
createdAt: 2023-02-24
updatedAt: 2023-03-25
category: [think]
slug: first-article
keyVisual: "./kv.jpg"
author: morimorig3
---

このブログの記法まとめておく（といっても普通のマークダウンと同じ）

## 見出し

```md
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

## リスト

```md
- リスト1
- リスト2
- リスト3
  - ネストリスト1
  - ネストリスト2
    - ネストネストリスト3
- 改行されるリスト改行されるリスト改行されるリスト改行されるリスト改行されるリスト改行されるリスト
```

- リスト1
- リスト2
- リスト3
  - ネストリスト1
  - ネストリスト2
    - ネストネストリスト3
- 改行されるリスト改行されるリスト改行されるリスト改行されるリスト改行されるリスト改行されるリスト

## 順番付きリスト

```md
1. リスト1
2. リスト2
3. リスト3
4. リスト4
```

1. リスト1
2. リスト2
3. リスト3
4. リスト4

## テキストリンク

```md
[テキストリンク](https://www.morimorig3.com)
```

[テキストリンク](https://www.morimorig3.com)

## 画像挿入

```md
![画像説明文](./cat.jpg)
```

![画像説明文](./cat.jpg)

## リンク付き画像

```md
[![画像サンプル](./cat.jpg)](https://www.morimorig3.com)
```

[![画像サンプル](./cat.jpg)](https://www.morimorig3.com)

## テーブル

```md
|項目1|項目2|項目3|
|---|---|---|
|セル|セル|セル|
|セル|セル|セル|
```

|項目1|項目2|項目3|
|---|---|---|
|セル|セル|セル|
|セル|セル|セル|

ブログでよく見るスクロールできるテーブルにも対応させてみた

```md
|項目1|項目2|項目3|項目4|項目5|項目6|項目7|項目8|項目9|
|---|---|---|---|---|---|---|---|---|
|長いセル|長いセル|長いセル|長いセル|長いセル|長いセル|長いセル|長いセル|長いセル|
|長いセル|長いセル|長いセル|長いセル|長いセル|長いセル|長いセル|長いセル|長いセル|
```

|項目1|項目2|項目3|項目4|項目5|項目6|項目7|項目8|項目9|
|---|---|---|---|---|---|---|---|---|
|長いセル|長いセル|長いセル|長いセル|長いセル|長いセル|長いセル|長いセル|長いセル|
|長いセル|長いセル|長いセル|長いセル|長いセル|長いセル|長いセル|長いセル|長いセル|

## 引用文

```md
> "If it's a good idea…go ahead and do it. It is much easier to apologize than it is to get permission." -Grace Hooper
```

> "If it's a good idea…go ahead and do it. It is much easier to apologize than it is to get permission." -Grace Hooper

## 区切り線

```md
---
```

---

## 文字スタイル

```md
*イタリック*
**太字**
~~打ち消し線~~
インライン`code`スタイル
```

*イタリック*

**太字**

~~打ち消し線~~

インライン`code`スタイル

## ~~リンクカード~~

VercelでPupetteerを動かす方法がわからず実装断念（いつか実装したい）

## アラートブロック

ここからマークダウンじゃなくなる

```md
<notice type='alert'>アラート本文</notice>
<notice type='info'>アラート本文</notice>
<notice type='check'>アラート本文</notice>
```

<notice type='alert'>アラート本文</notice>

<notice type='info'>インフォ本文</notice>

<notice type='check'>チェック本文</notice>

## トグルブロック

```md
<details>
  <summary>概要</summary>
  説明文説明文説**明文**説明文説明文
  説明文説明文説明文説明文説明文説明文
</details>
```

<details>
  <summary>概要</summary>

  説明文説明文説明文説明文説明文

  説明文説明文説明文説明文説明文説明文

</details>