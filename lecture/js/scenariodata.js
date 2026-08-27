// scenariodata.js （第1章〜第5章 完全版：解説テキスト最適化済み）

const scenariodata = {
    // --------------------------------------------------
    // 第1章：まずは道具を揃えよう！〜HTMLの基本骨格〜
    // --------------------------------------------------
    chapter1: [
        {
            speaker: "猪狩進",
            text: "あ、お疲れ様！来てくれたんだね、{name}さん！",
            img: "images/susumu_smile.webp"
        },
        {
            speaker: "猪狩進",
            text: "『Webサイトを作ってみたいけど、何から始めればいいか分からない』……？",
            img: "images/susumu_normal.webp"
        },
        {
            speaker: "猪狩進",
            text: "ふふっ、大丈夫だよ。最初は誰だって初心者だからね。僕が基礎の基礎から一緒に勉強するよ！",
            img: "images/susumu_smile.webp"
        },
        {
            speaker: "猪狩進",
            text: "実は、僕たちが今こうして話しているこのゲームも、すべて『HTML・CSS・JavaScript』だけで作られているんだよ！",
            img: "images/susumu_normal.webp"
        },
        {
            speaker: "猪狩進",
            text: "特別なソフトがなくても、コードさえ書ければこんな風にキャラクターを動かしたり会話させることができちゃうんだ。面白そうだと思わないかい？",
            img: "images/susumu_normal.webp"
        },
        {
            speaker: "猪狩進",
            text: "よし、それじゃあまずはその基本となる『HTML』から、僕と一緒にマスターしていこう！",
            img: "images/susumu_smile.webp"
        },
        {
            speaker: "猪狩進",
            text: "HTMLは、Webページの『骨組み』を作るための言語なんだ。野球で言ったら『選手のポジション配置』みたいなものだね。",
            img: "images/susumu_normal.webp"
        },
        {
            speaker: "猪狩進",
            text: "どこがキャッチャーで、どこが外野か……それをブラウザに教えてあげるんだよ。",
            img: "images/susumu_normal.webp"
        },
        {
            speaker: "猪狩進",
            text: "Webページを作る時は、テキストを『<タグ>』と呼ばれる記号で囲むんだ。",
            img: "images/susumu_normal.webp"
        },
        {
            speaker: "猪狩進",
            text: "例えば『<p>Webサイト制作を始めよう！</p>』みたいに囲むことで、『ここは文章のまとまり（段落）だよ』ってブラウザに指示を出すんだよ。",
            img: "images/susumu_smile.webp"
        },
        {
            speaker: "猪狩進",
            text: "じゃあここでクイズ！HTMLファイルの“一番最初”に書く、ある『宣言』があるんだけど……次のうちどれだと思う？",
            img: "images/susumu_normal.webp",
            hint: "ヒント：『このファイルは標準的なHTMLで書くよ！』と、ブラウザに文書の種類を教える宣言なんだ。英語の『Document Type（文書の種類）』が隠れているよ！",
            choices: [
                { text: "A: <!DOCTYPE html>", targetIndex: "c1_correct" },
                { text: "B: <start html>", targetIndex: "c1_wrong" },
                { text: "C: <play ball>", targetIndex: "c1_wrong" }
            ]
        }
    ],

    c1_correct: [
        {
            speaker: "猪狩進",
            text: "正解！大正解だよ、{name}さん！これは『最新ルールで書く標準的なHTMLですよ』ってブラウザに知らせる大事な宣言なんだ。試合前のプレイボール宣言みたいなものだね！",
            img: "images/susumu_smile.webp",
            nextChapter: "c1_end"
        }
    ],
    c1_wrong: [
        {
            speaker: "猪狩進",
            text: "あはは、気持ちは分かるけど……正解は『<!DOCTYPE html>』なんだ。『最新ルールのHTMLで書くよ！』って宣言する大事なおまじないなんだよ。でも挑戦する姿勢、すごく良いと思うよ！",
            img: "images/susumu_laugh.webp",
            nextChapter: "c1_end"
        }
    ],
    c1_end: [
        {
            speaker: "猪狩進",
            text: "よし、基本の『骨格』のイメージは掴めたかな？詳しいコードの書き方やファイルを保存する方法は、僕のノートにまとめておいたよ。",
            img: "images/susumu_normal.webp"
        },
        {
            speaker: "猪狩進",
            text: "リンクから飛んで、実際に手を動かしてみよう！準備ができたら第2章に進んでね！",
            img: "images/susumu_smile.webp",
            link: "chapter01.html"
        }
    ],

    // --------------------------------------------------
    // 第2章：文章に背番号をつけよう！〜見出し・段落・改行〜
    // --------------------------------------------------
    chapter2: [
        {
            speaker: "猪狩進",
            text: "基本骨格の準備、お疲れ様！グラウンド（<body>）の準備ができたら、次はそこに打順（文章）を組み込んでいこうか。",
            img: "images/susumu_normal.webp"
        },
        {
            speaker: "猪狩進",
            text: "野球でも、1番から9番まで役割が決まっているよね。打順を整理しないとチームが機能しないように、Webの文章にも『背番号（見出しや段落のタグ）』をつけて整理してあげる必要があるんだ。",
            img: "images/susumu_normal.webp"
        },
        {
            speaker: "猪狩進",
            text: "まずは『見出し』をつけるタグ、<h1> から <h6> について説明するね。<h1> はチームの主砲、言わば『4番打者（一番大きな見出し）』だよ！",
            img: "images/susumu_smile.webp"
        },
        {
            speaker: "猪狩進",
            text: "1つのページに基本的には1回だけ使って、ページのタイトルをバシッと示すんだ。そして <h2> は3番や5番打者（中見出し）、<h3> は小見出し……という風に重要度が小さくなっていくよ。",
            img: "images/susumu_normal.webp"
        },
        {
            speaker: "猪狩進",
            text: "ここでクイズ！実は初心者がやってしまいがちな『NGなタグの使い方』があるんだ。次のうちどれだと思う？",
            img: "images/susumu_normal.webp",
            hint: "ヒント：見出し（h1〜h6）は打順と同じで順番通りに使うのが基本だよ。そして、長文は段落タグ（p）の担当！見た目や役割を無視した使い方はNGなんだ。",
            choices: [
                { text: "A: 見出しの順番を <h1> → <h3> に飛ばして使う", targetIndex: "c2_wrong" },
                { text: "B: <h1> の中に長文を全部詰める", targetIndex: "c2_wrong" },
                { text: "C: AもBも両方NG！", targetIndex: "c2_correct" }
            ]
        }
    ],

    c2_correct: [
        {
            speaker: "猪狩進",
            text: "流石だね{name}さん、大正解！見出しの順番を飛ばすのは打順を無視するようなものだし、<h1> に長文を詰めるのも役割違いなんだ。",
            img: "images/susumu_smile.webp",
            nextChapter: "c2_end"
        }
    ],
    c2_wrong: [
        {
            speaker: "猪狩進",
            text: "惜しい！実は『AもBも両方NG』なんだ。つまり正解はCだよ！見出しは順番通りに使い、長文は段落タグ（<p>）に任せるのがルールなんだ。",
            img: "images/susumu_laugh.webp",
            nextChapter: "c2_end"
        }
    ],
    c2_end: [
        {
            speaker: "猪狩進",
            text: "あと、よく勘違いされるのが『改行（<br>）』なんだ。見た目の余白を開けたいからといって <br> を連打するのはNGだよ！余白はCSSで整えるんだ。",
            img: "images/susumu_normal.webp"
        },
        {
            speaker: "猪狩進",
            text: "文章のまとまりにはしっかり <p> を使って、段落の中で必要な場所だけで <br> を使うのが綺麗で読みやすいコードを書くコツなんだ。",
            img: "images/susumu_smile.webp"
        },
        {
            speaker: "猪狩進",
            text: "見出しと段落の実際の組み合わせ方は、僕のノートにまとめてあるよ。画面上でどう見え方が変わるか、チェックしてみよう！",
            img: "images/susumu_smile.webp",
            link: "chapter02.html"
        }
    ],

    // --------------------------------------------------
    // 第3章：試合のハイライトを飾ろう！〜<img> タグと相対パス〜
    // --------------------------------------------------
    chapter3: [
        {
            speaker: "猪狩進",
            text: "文章の組み立て、すごく上達したね！{name}さん、流石だよ！",
            img: "images/susumu_smile.webp"
        },
        {
            speaker: "猪狩進",
            text: "でも、文字だけのサイトじゃちょっと寂しいよね。やっぱり試合のハイライト写真を入れて、一気に華やかにしたいじゃないか！",
            img: "images/susumu_normal.webp"
        },
        {
            speaker: "猪狩進",
            text: "そこで使うのが『<img>』タグだよ。このタグを使うと、Webページに好きな画像を貼り付けることができるんだ！",
            img: "images/susumu_smile.webp"
        },
        {
            speaker: "猪狩進",
            text: "ただ、画像を表示させるには『画像ファイルがどこにあるか』という住所（パス）を教えてあげる必要があるんだ。",
            img: "images/susumu_normal.webp"
        },
        {
            speaker: "猪狩進",
            text: "自分のファイルから見て、相手のファイルがどこにあるかを示す方法を『相対パス』と呼ぶんだよ。野球で例えるなら『ファーストから見てサードはどこか』という位置関係だね！",
            img: "images/susumu_smile.webp"
        },
        {
            speaker: "猪狩進",
            text: "ここでクイズ！HTMLと同じフォルダの中にある『images』というフォルダ内の『hero.webp』を表示したい時、src属性（パス）はどう書くのが正解だと思う？",
            hint: "ヒント：『フォルダ名』と『ファイル名』をスラッシュ『/』でつないで道順を教えてあげるんだ！『imagesフォルダの中にある hero.webp』という順番で書いてみよう！",
            img: "images/susumu_normal.webp",
            choices: [
                { text: "A: src=\"images/hero.webp\"", targetIndex: "c3_correct" },
                { text: "B: src=\"hero.webp\"", targetIndex: "c3_wrong" },
                { text: "C: src=\"folder/images/hero.webp\"", targetIndex: "c3_wrong" }
            ]
        }
    ],

    c3_correct: [
        {
            speaker: "猪狩進",
            text: "大正解！見事だよ{name}さん！『フォルダ名/ファイル名』で指定してあげれば、フォルダの中にある画像もバッチリ読み込めるんだ！",
            img: "images/susumu_smile.webp",
            nextChapter: "c3_end"
        }
    ],
    c3_wrong: [
        {
            speaker: "猪狩進",
            text: "う〜ん、惜しい！正解は『A: src=\"images/hero.webp\"』なんだ。『フォルダ名/ファイル名』の順番で道順を教えてあげるんだよ。",
            img: "images/susumu_laugh.webp",
            nextChapter: "c3_end"
        }
    ],
    c3_end: [
        {
            speaker: "猪狩進",
            text: "それから、画像が表示できない時のために代わりの説明文字を入れる『alt（オルト）属性』を設定するのも、思いやりのあるコードを書く大切なマナーなんだ。",
            img: "images/susumu_normal.webp"
        },
        {
            speaker: "猪狩進",
            text: "画像タグの詳しい書き方や『ひとつ上のフォルダに戻る方法（../）』は、ノートにまとめておいたよ。一緒に見にいこう！",
            img: "images/susumu_smile.webp",
            link: "chapter03.html"
        }
    ],

    // --------------------------------------------------
    // 第4章：他のグラウンドへ遠征だ！〜<a> タグ〜
    // --------------------------------------------------
    chapter4: [
        {
            speaker: "猪狩進",
            text: "画像も貼れるようになって、サイトが一気に華やかになったね！{name}さん、素晴らしいよ！",
            img: "images/susumu_smile.webp"
        },
        {
            speaker: "猪狩進",
            text: "さて、自分のグラウンド（ページ）が完成したら……次は『他のグラウンドへ遠征』してみたくないかい？",
            img: "images/susumu_normal.webp"
        },
        {
            speaker: "猪狩進",
            text: "Webの世界でページとページをつなぐ役割を果たすのが『<a>』タグ（アンカータグ）なんだ！",
            img: "images/susumu_smile.webp"
        },
        {
            speaker: "猪狩進",
            text: "このタグを使うと、クリックした時に別のページや外部のWebサイトへ一瞬で移動（遠征）できるようになるんだよ。",
            img: "images/susumu_normal.webp"
        },
        {
            speaker: "猪狩進",
            text: "移動先のURLやファイル名は『href（エイチレフ）属性』を使って指定するんだ。遠征先の住所を書いてあげるイメージだね！",
            img: "images/susumu_smile.webp"
        },
        {
            speaker: "猪狩進",
            speaker: "猪狩進",
            text: "ここでクイズ！リンクをクリックした時に『自分のページを閉じずに、新しいタブで開く』ようにしたい時は、どの属性を追加すればいいと思う？",
            hint: "ヒント：英語で『空欄・まっさら』を表す言葉が使われているよ。新しいまっさらなタブを開いて飛んでいく……という意味の特別な属性なんだ。",
            img: "images/susumu_normal.webp",
            choices: [
                { text: "A: target=\"_blank\"", targetIndex: "c4_correct" },
                { text: "B: new=\"tab\"", targetIndex: "c4_wrong" },
                { text: "C: open=\"new\"", targetIndex: "c4_wrong" }
            ]
        }
    ],

    c4_correct: [
        {
            speaker: "猪狩進",
            text: "大正解！流石は{name}さん！『target=\"_blank\"』をつけると、元のページを残したまま新しいタブでリンク先が開くんだ。外部サイトへ案内する時の優しさだね！",
            img: "images/susumu_smile.webp",
            nextChapter: "c4_end"
        }
    ],
    c4_wrong: [
        {
            speaker: "猪狩進",
            text: "惜しい！正解は『A: target=\"_blank\"』なんだ。これをつけると元のページを残したまま、別タブで移動先を開いてくれるんだよ。防犯のための rel=\"noopener\" もセットで覚えると完璧だよ！",
            img: "images/susumu_laugh.webp",
            nextChapter: "c4_end"
        }
    ],
    c4_end: [
        {
            speaker: "猪狩進",
            text: "ページのリンクができると、複数のWebページをまとめた『本物のWebサイト』が完成するんだ！",
            img: "images/susumu_normal.webp"
        },
        {
            speaker: "猪狩進",
            text: "リンクの具体的な書き方や、ページ内ジャンプのテクニックはノートにまとめておいたよ。早速見にいこう！",
            img: "images/susumu_smile.webp",
            link: "chapter04.html"
        }
    ],

    // --------------------------------------------------
    // 第5章：CSSでユニフォームを着せよう！〜CSSの基礎〜
    // --------------------------------------------------
    chapter5: [
        {
            speaker: "猪狩進",
            text: "HTMLでのページ作り、本当によく頑張ったね！{name}さん、素晴らしい上達ぶりだよ！",
            img: "images/susumu_smile.webp"
        },
        {
            speaker: "猪狩進",
            text: "ガイド通りに骨組みができたけど……今のままのサイトって、文字が黒くて背景が白い、ちょっと味気ない感じがしないかい？",
            img: "images/susumu_normal.webp"
        },
        {
            speaker: "猪狩進",
            text: "野球で言えば、まだ背番号やチームカラーのない無地の練習着を着ている状態なんだ。",
            img: "images/susumu_smile.webp"
        },
        {
            speaker: "猪狩進",
            text: "そこで登場するのが『CSS（シーエスエス）』！ページの見た目や装飾を担当する言語だよ。かっこいいユニフォームを着せてあげよう！",
            img: "images/susumu_smile.webp"
        },
        {
            speaker: "猪狩進",
            text: "CSSは『誰の（セレクタ）』『何を（プロパティ）』『どうする（値）』という3つのセットで書くのがルールなんだ。",
            img: "images/susumu_normal.webp"
        },
        {
            speaker: "猪狩進",
            text: "ここでクイズ！見出しタグ <h2> の文字色を『青色（blue）』に変えたい時、CSSの書き方として正解なのはどれだと思う？",
            hint: "ヒント：CSSは『誰の（セレクタ） { 何を（プロパティ）: どうする（値）; }』という形で、波括弧 { } とセミコロン ; をセットで使うのがルールだよ！",
            img: "images/susumu_normal.webp",
            choices: [
                { text: "A: h2 { color: blue; }", targetIndex: "c5_correct" },
                { text: "B: h2 = color(blue);", targetIndex: "c5_wrong" },
                { text: "C: h2 <color: blue>", targetIndex: "c5_wrong" }
            ]
        }
    ],

    c5_correct: [
        {
            speaker: "猪狩進",
            text: "大正解！見事だよ{name}さん！『セレクタ { プロパティ: 値; }』という形で波括弧 { } とセミコロン ; を使うのがCSSの基本スタイルなんだ！",
            img: "images/susumu_smile.webp",
            nextChapter: "c5_end"
        }
    ],
    c5_wrong: [
        {
            speaker: "猪狩進",
            text: "惜しい！正解は『A: h2 { color: blue; }』なんだ。波括弧 { } で囲んで、最後はセミコロン ; で区切るのが指定のルールなんだよ。",
            img: "images/susumu_laugh.webp",
            nextChapter: "c5_end"
        }
    ],
    c5_end: [
        {
            speaker: "猪狩進",
            text: "CSSファイルの読み込み方や、特定の部分だけデザインを変える『クラス指定（.class）』の書き方は僕のノートに詳しく書いておいたよ。ユニフォームをかっこよく飾ろう！",
            img: "images/susumu_smile.webp",
            link: "chapter05.html"
        }
    ],

    // --------------------------------------------------
    // 🎉 ご褒美エンディングイベント
    // --------------------------------------------------
    cleared: [
        {
            speaker: "猪狩進",
            text: "{name}さん、全5章のレッスン完走……本当にお疲れ様！そして、最後まで僕と一緒に勉強してくれてありがとう！",
            img: "images/susumu_smile.webp"
        },
        {
            speaker: "猪狩進",
            text: "最初はHTMLのタグ1つ書くのも手探りだったのに、今では見出しも、画像も、リンクも、CSSでの装飾もバッチリマスターできたね！",
            img: "images/susumu_normal.webp"
        },
        {
            speaker: "猪狩進",
            text: "……あ、そうだ！全章クリアしてくれた記念に、制服に着替えてみたんだ。どうかな……少し雰囲気が違うかな？",
            img: "images/susumu_smile_clear.webp"
        },
        {
            speaker: "猪狩進",
            text: "基礎をしっかり固めた{name}さんは、もう立派なWeb制作者だよ！僕、隣で見ていてすごく誇らしかったな。",
            img: "images/susumu_laugh_clear.webp"
        },
        {
            speaker: "猪狩進",
            text: "ここで学んだ知識は、これから{name}さんが自分だけのWebサイトを作る時の大きな『武器』になるはずさ。",
            img: "images/susumu_normal_clear.webp"
        },
        {
            speaker: "猪狩進",
            text: "もしコードの書き方に迷った時は、いつでもここに戻ってきてね。僕はいつでも歓迎するよ！それじゃあ……最高のWeb制作ライフを！",
            img: "",
            bg: "images/clear.webp"
        },
        {
            speaker: "猪狩進",
            text: "プレイボール！",
            img: "",
            bg: "images/clear.webp",
            staffRoll: true // ★スタッフロール
        }
    ]
};