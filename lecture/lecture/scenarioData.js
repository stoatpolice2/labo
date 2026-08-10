// シナリオデータ定義
const scenarioData = {
    // --------------------------------------------------
    // 第1章：まずは道具を揃えよう！〜HTMLの基本骨格〜
    // --------------------------------------------------
    chapter1: [
        {
            speaker: "猪狩進",
            text: "あ、お疲れ様！来てくれたんだね、{name}さん！",
            img: "images/susumu_smile.png"
        },
        {
            speaker: "猪狩進",
            text: "『Webサイトを作ってみたいけど、何から始めればいいか分からない』……？",
            img: "images/susumu_normal.png"
        },
        {
            speaker: "猪狩進",
            text: "ふふっ、大丈夫だよ。最初は誰だって初心者だからね。僕が基礎の基礎から一緒に勉強するよ！",
            img: "images/susumu_smile.png"
        },
        {
            speaker: "猪狩進",
            text: "それじゃあ、まずは『HTML』について話そうか。HTMLは、Webページの『骨組み』を作るための言語なんだ。",
            img: "images/susumu_normal.png"
        },
        {
            speaker: "猪狩进",
            text: "野球で言ったら『グラウンドの区画整理』や『選手のポジション配置』みたいなものだね。どこがキャッチャーで、どこが外野か……それをブラウザに教えてあげるんだよ。",
            img: "images/susumu_smile.png"
        },
        {
            speaker: "猪狩進",
            text: "Webページを作る時は、テキストを『<タグ>』と呼ばれる記号で囲むんだ。",
            img: "images/susumu_normal.png"
        },
        {
            speaker: "猪狩進",
            text: "例えば『<p>Webサイト制作を始めよう！</p>』みたいに囲むことで、『ここは文章のまとまり（段落）だよ』ってブラウザに指示を出すんだ。守備位置を決めるのに似ていると思わないかい？",
            img: "images/susumu_smile.png"
        },
        // クイズイベント
        {
            speaker: "猪狩進",
            text: "じゃあここでクイズ！HTMLファイルの“一番最初”に書く、ある『宣言』があるんだけど……次のうちどれだと思う？",
            img: "images/susumu_normal.png",
            choices: [
                { text: "A: <!DOCTYPE html>", targetIndex: "c1_correct" },
                { text: "B: <start html>", targetIndex: "c1_wrong" },
                { text: "C: <play ball>", targetIndex: "c1_wrong" }
            ]
        }
    ],

    // 第1章クイズ分岐後のセリフデータ
    c1_correct: [
        {
            speaker: "猪狩進",
            text: "正解！大正解だよ、{name}さん！これは『これから書くのはHTML5の文書ですよ』ってブラウザに知らせる大事な宣言なんだ。試合前のノックみたいなものだね！",
            img: "images/susumu_smile.png",
            nextChapter: "c1_end"
        }
    ],
    c1_wrong: [
        {
            speaker: "猪狩進",
            text: "あはは、気持ちは分かるけど……正解は『<!DOCTYPE html>』なんだ。でも挑戦する姿勢、すごく良いと思うよ！",
            img: "images/susumu_laugh.png",
            nextChapter: "c1_end"
        }
    ],
    c1_end: [
        {
            speaker: "猪狩進",
            text: "よし、基本の『骨格』のイメージは掴めたかな？詳しいコードの書き方やファイルを保存する方法は、僕のノート（Webサイト）にまとめておいたよ。",
            img: "images/susumu_normal.png"
        },
        {
            speaker: "猪狩進",
            text: "リンクから飛んで、実際に手を動かしてみよう！準備ができたら第2章に進んでね！",
            img: "images/susumu_smile.png",
            link: "chapter01.html" // 第1章の解説WebページへのURL
        }
    ],

    // --------------------------------------------------
    // 第2章：文章に背番号をつけよう！〜見出し・段落・改行〜
    // --------------------------------------------------
    chapter2: [
        {
            speaker: "猪狩進",
            text: "基本骨格の準備、お疲れ様！グラウンド（<body>）の準備ができたら、次はそこに打順（文章）を組み込んでいこうか。",
            img: "images/susumu_normal.png"
        },
        {
            speaker: "猪狩進",
            text: "野球でも、1番から9番まで役割が決まっているよね。打順を整理しないとチームが機能しないように、Webの文章にも『背番号（見出しや段落のタグ）』をつけて整理してあげる必要があるんだ。",
            img: "images/susumu_normal.png"
        },
        {
            speaker: "猪狩進",
            text: "まずは『見出し』をつけるタグ、<h1> から <h6> について説明するね。<h1> はチームの主砲、言わば『4番打者（一番大きな見出し）』だよ！",
            img: "images/susumu_smile.png"
        },
        {
            speaker: "猪狩進",
            text: "1つのページに基本的には1回だけ使って、ページのタイトルをバシッと示すんだ。そして <h2> は3番や5番打者（中見出し）、<h3> は小見出し……という風に重要度が小さくなっていくよ。",
            img: "images/susumu_normal.png"
        },
        // クイズイベント
        {
            speaker: "猪狩進",
            text: "ここでクイズ！実は初心者がやってしまいがちな『NGなタグの使い方』があるんだ。次のうちどれだと思う？",
            img: "images/susumu_normal.png",
            choices: [
                { text: "A: 見出しの順番を <h1> → <h3> に飛ばして使う", targetIndex: "c2_wrong" },
                { text: "B: <h1> の中に長文を全部詰める", targetIndex: "c2_wrong" },
                { text: "C: AもBも両方NG！", targetIndex: "c2_correct" }
            ]
        }
    ],

    // 第2章クイズ分岐後のセリフデータ
    c2_correct: [
        {
            speaker: "猪狩進",
            text: "流石だね{name}さん、大正解！見出しの順番を飛ばすのは打順を無視するようなものだし、<h1> に長文を詰めるのも役割違いなんだ。",
            img: "images/susumu_smile.png",
            nextChapter: "c2_end"
        }
    ],
    c2_wrong: [
        {
            speaker: "猪狩進",
            text: "惜しい！実は『AもBも両方NG』なんだ。つまり正解はCだよ！見出しは順番通りに使い、長文は段落タグに任せるのがルールなんだ。",
            img: "images/susumu_laugh.png",
            nextChapter: "c2_end"
        }
    ],
    c2_end: [
        {
            speaker: "猪狩進",
            text: "あと、よく勘違いされるのが『改行（<br>）』なんだ。見た目を整えるためだけに <br> を連打するのはNGだよ！",
            img: "images/susumu_normal.png"
        },
        {
            speaker: "猪狩進",
            text: "文章の区切りにはしっかり <p> を使って、本当に必要な場所だけで <br> を使うのが綺麗で読みやすいコードを書くコツなんだ。",
            img: "images/susumu_smile.png"
        },
        {
            speaker: "猪狩進",
            text: "見出しと段落の実際の組み合わせ方は、僕のWebサイトにまとめてあるよ。画面上でどう見え方が変わるか、チェックしてみよう！",
            img: "images/susumu_smile.png",
            link: "chapter02.html" // 第2章の解説WebページへのURL
        }
    ]
};