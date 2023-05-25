---
title: GO言語の「fmt.Printf」「*http.Request」「&Type{}」がなんじゃよくわからん
createdAt: 2023-05-14
updatedAt: 2023-05-14
category: [think]
slug: go-muzui-for-me
keyVisual: "./kv.jpg"
author: morimorig3
---

## GO言語で理解しづらかったこと

- インターフェース
- fmt.Printf
- *http.Request, &Type{}（ポインタ）

### インターフェース

TypeScriptのinterfaceと結構違うので、混乱してしまう。GOのインターフェースは自動的に実装される。

ステージを作り上げるには歌って踊れるダンサーが必要だとする。コードで表現するとこんな感じ。

```go
type Dancer interface {
	Dance()
	Sing()
}

func makeStage(d Dancer) {
	d.Dance()
	d.Sing()
}
```

歌って踊れる人でステージを作り上げたい。とうぜん歌って踊れるアイドルも候補になる。このアイドルは、ファンサもできるけど、歌えるし踊れるからダンサーでもある。

```go
type Idol struct{}

func (i Idol) FanService(){}
func (i Idol) Dance(){}
func (i Idol) Sing(){}
```

makeStageはダンサーなら誰でも受け入れられる。そして、アイドルは歌えるし、踊れるのでアイドルを採用してステージを作り上げることができる。

```go
func main() {
	idol := Idol{}
	makeStage(idol)
}
```

このようにアイドルの定義でダンサーを`implements`したわけではないけど、アイドルにはDanceもSingも実装している（定義されている）ので、自動的にインターフェースダンサーを満たすことになる。

このようなことが自動的に行われるので、明示的に実装しなきゃいけない言語を経験している人には少し分かりづらい一面があるかもしれない。

本格的にGO言語を使うには概念的にも深い理解を求められるので、しっかり理解しておきたい。（↓ここら辺がﾒｯﾁｬﾜｶﾘﾔｽｲ）

- [プログラミング言語Go完全入門 @tenntenn 6. 抽象化](https://docs.google.com/presentation/d/1r96GPwlWCkVeeUnFj7dwb8RqMalYLG7vDYWjuAa_Wik/edit#slide=id.g4f15a7d687_0_0)
- [Goのinterfaceがわからない人へ](https://qiita.com/rtok/items/46eadbf7b0b7a1b0eb08)

### fmt.Printf

JavaScriptでいう`console.log()`みたいなノリで使えるものなのかと思ってたが、ちょっと違う。（C言語で同じようなものがあるらしい）

チュートリアルとか、ハンズオンを写経していると、いろんな種類をケースバイケースで使い分けているように見える。どうやって使い分けているのかとか、イディオム的にいつどれを使うのかがわからない。

しっかり勉強をしよう（ﾁｮｰﾜｶﾘﾔｽｲ）

- [fmt.Printfなんかこわくない](https://qiita.com/rock619/items/14eb2b32f189514b5c3c)
- [【Go】print系関数の違い](https://qiita.com/taji-taji/items/77845ef744da7c88a6fe)

### *http.Request・&Type{}

`*http.Request`はポインタ型で、`&Type{}`は構造体のポインタ型を作っている。

「・・・はぇ？」となるが、これを理解するには下記項目を理解を説明できるレベルにならなければならない。

- そもそもポインタとはなんじゃ
- 構造体とポインタ
- 関数とポインタ
- 構造体のメソッドで構造体の値を変更する場合の振る舞いの違い

ここらへんが理解できていると「ポインタ完全に理解した」みたいな状態になれると思う。

そもそもポインタとはなんじゃ？については、記事を読むのが一番早い気がした。

ポインタを意識しなくてもいい言語をしてきた人にとっては鬼門のようだ。

- [【Go】基本文法③(ポインタ・構造体)](https://qiita.com/k-penguin-sato/items/62dfe0f93f56e4bf9157)
- [Goで学ぶポインタとアドレス](https://qiita.com/Sekky0905/items/447efa04a95e3fec217f)

#### 次に、構造体とポインタについて

脳死で写経しているときにこんなコードの違いがわからなかった

①これと

```go
var h Heroine
h = Heroine{
	age: 15,
}
h.age = 20
fmt.Println(h.age) // 20
```

②これの違いがわからなかった

```go
var h *Heroine
h = &Heroine{
	age: 15,
}
h.age = 20
fmt.Println(h.age) // 20
```

やれてること一緒やんけ、と

これ、何が違うのかというと再代入？した時の振る舞いがちょっと違う

①の場合、ポインタ型ではないので、元の値hの中身は変わらない
**h1はhのコピーを渡している**のでコピーが変わるだけ

```go
var h Heroine
h = Heroine{
	age: 15,
}
h1 := h
h1.age = 20
fmt.Println(h.age) // 15
fmt.Println(h1.age) // 20
```

②の場合、ポインタ型なのでhの値も変わる
**h1はh（ポインタ型）を渡している**ので、アドレスに対する操作なのでhも変わる

```go
var h *Heroine
h = &Heroine{
	age: 15,
}
h1 := h
h1.age = 20
fmt.Println(h.age) // 20
fmt.Println(h1.age) // 20
```

上で紹介した記事をしっかり読んでおけば、割とすんなり理解できるかもしれない

僕の場合は1時間くらい悩んだ末にようやく理解できた

#### 次に、関数とポインタについて

これは主に関数の引数としてポインタ型を渡すことがあるのだけど、その時の振る舞いがよくわからんってなると思う。

```go
type Heroine struct {
	Name string
}

func setLastName(h Heroine, lastName string) {
	h.Name = fmt.Sprintf("%s %s", lastName, h.Name);
}

func main(){
	h := Heroine{
		Name: "Ai",
	}
	fmt.Println(h.Name) // Ai
	setLastName(h, "Nanasaki")
	fmt.Println(h.Name) // Nanasaki Ai <- こうなってほしい
}
```

これはヒロインの苗字を変更するコードだが、実行しても意図した通りに動かなかった

```sh
Ai
Ai
```

なぜこのような振る舞いになるのかというと、Goでは関数の引数に値渡しをする場合は、**値のコピーを関数に渡す**ので関数の中で値を操作してもコピー先が変更されるだけで元の値は変わらない。

実際にポインタのアドレス（表現が正しいかわからない）を見てみるとわかりやすい

```go
func setLastName(h Heroine, lastName string) {
	h.Name = fmt.Sprintf("%s %s", lastName, h.Name);
	fmt.Printf("関数の中：%v\n", &h.Name)
}

func main(){
	h := Heroine{
		Name: "Ai",
	}
	fmt.Printf("関数の外：%v\n", &h.Name)
	setLastName(h, "Nanasaki")
}
```

関数内ではコピーが渡されているので関数の外と中でアドレスが異なっている

```sh
関数の外：0x1400008c240
関数の中：0x1400008c250
```

苗字を変えるには、関数の引数をポインタ型で受け取るようにする。

```go
func setLastName(h *Heroine, lastName string) {
	h.Name = fmt.Sprintf("%s %s", lastName, h.Name);
	fmt.Printf("関数の中：%v\n", &h.Name)
}

func main(){
	h := Heroine{
		Name: "Ai",
	}
	fmt.Printf("関数の外：%v\n", &h.Name)
	fmt.Println(h.Name) // Ai
	setLastName(&h, "Nanasaki")
	fmt.Println(h.Name) // Nanasaki Ai
}
```

そうすることで実際に値は変更されたし、ポインタも同じアドレスをさしていることがわかる

```sh
関数の外：0x14000010270
Ai
関数の中：0x14000010270
Nanasaki Ai
```

この人のブログがめちゃくちゃわかりやすかった

- [[Go] ポインタについて学ぶ（基本的なところ）](https://www.yoheim.net/blog.php?q=20170901)

#### 最後は構造体のメソッドとポインタについて

これは関数とポインタがわかっていれば怖くない

関数とポインタで紹介したような関数を構造体のメソッドとして実装してみる

```go
type Heroine struct {
	Name string
}

func (h Heroine) setLastName(lastName string) {
	h.Name = fmt.Sprintf("%s %s", lastName, h.Name)
}

func main() {
	h := Heroine{
		Name: "Ai",
	}
	fmt.Println(h.Name) // Ai
	h.setLastName("Nanasaki")
	fmt.Println(h.Name) // Ai
}
```

しかし、これは意図した通りに動かない

```sh
Ai
Ai
```

これはメソッドのレシーバーの指定の仕方が構造体型になっているのが原因だ

```go
func (h Heroine) setLastName(lastName string) {
	h.Name = fmt.Sprintf("%s %s", lastName, h.Name)
}
```

先ほどと同様にポインタを確認してみると異なったアドレスを参照していることがわかる

```go
func (h Heroine) setLastName(lastName string) {
	fmt.Printf("メソッドの中：%v\n", &h.Name)
	h.Name = fmt.Sprintf("%s %s", lastName, h.Name)
}

func main() {
	h := &Heroine{
		Name: "Ai",
	}
	fmt.Println(h.Name) // Ai
	fmt.Printf("メソッドの外：%v\n", &h.Name)
	h.setLastName("Nanasaki")
	fmt.Println(h.Name) // Ai
}
```

```sh
Ai
メソッドの外：0x14000096230
メソッドの中：0x14000096250
Ai
```

これを意図した通りに動かすには、レシーバを構造体型で指定するのではなくポインタ型で指定してやればいい

```go
func (h *Heroine) setLastName(lastName string) {
	fmt.Printf("メソッドの中：%v\n", &h.Name)
	h.Name = fmt.Sprintf("%s %s", lastName, h.Name)
}

func main() {
	h := &Heroine{
		Name: "Ai",
	}
	fmt.Println(h.Name) // Ai
	fmt.Printf("メソッドの外：%v\n", &h.Name)
	h.setLastName("Nanasaki")
	fmt.Println(h.Name) // Ai
}
```

```sh
Ai
メソッドの外：0x14000116230
メソッドの中：0x14000116230
Nanasaki Ai
```

不思議だ

関数の引数ならともかく、メソッドとして生やすので直接値を変更できそうなものだけど、レシーバーの指定の仕方で振る舞いが変わる

もう少し深いところまで理解してみたいところである

## 参考

- [Learning Go](https://www.oreilly.com/library/view/learning-go/9781492077206/)
- [プログラミング言語Go完全入門 @tenntenn 6. 抽象化](https://docs.google.com/presentation/d/1r96GPwlWCkVeeUnFj7dwb8RqMalYLG7vDYWjuAa_Wik/edit#slide=id.g4f15a7d687_0_0)
- [Goのinterfaceがわからない人へ](https://qiita.com/rtok/items/46eadbf7b0b7a1b0eb08)
- [fmt.Printfなんかこわくない](https://qiita.com/rock619/items/14eb2b32f189514b5c3c)
- [【Go】print系関数の違い](https://qiita.com/taji-taji/items/77845ef744da7c88a6fe)
- [【Go】基本文法③(ポインタ・構造体)](https://qiita.com/k-penguin-sato/items/62dfe0f93f56e4bf9157)
- [Goで学ぶポインタとアドレス](https://qiita.com/Sekky0905/items/447efa04a95e3fec217f)
- [[Go] ポインタについて学ぶ（基本的なところ）](https://www.yoheim.net/blog.php?q=20170901)
