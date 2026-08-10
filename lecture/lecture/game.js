// game.js （クイズ・選択肢・Webリンク対応版）

let playerName = "監督";
let currentStep = 0;

// ★最初は第1章のシナリオをセット
let currentScenario = scenarioData.chapter1; 

// DOM要素の取得
const nameInputBox = document.getElementById('name-input-box');
const startBtn = document.getElementById('start-btn');
const playerNameInput = document.getElementById('player-name-input');
const choiceBox = document.getElementById('choice-box'); // 選択肢用
const messageBox = document.getElementById('message-box');
const speakerName = document.getElementById('speaker-name');
const messageText = document.getElementById('message-text');
const susumuImg = document.getElementById('susumu-img');

// ゲーム開始ボタンの処理
startBtn.addEventListener('click', () => {
    const inputVal = playerNameInput.value.trim();
    if (inputVal !== "") {
        playerName = inputVal;
    }
    
    nameInputBox.classList.add('hidden');
    messageBox.classList.remove('hidden');
    
    showNextMessage();
});

// セリフ枠をクリックした時の処理
messageBox.addEventListener('click', () => {
    // 選択肢が表示されている間は、画面クリックでセリフが進まないようにガード
    if (!choiceBox.classList.contains('hidden')) {
        return; 
    }

    currentStep++;

    // まだ現在のシナリオデータが残っている場合
    if (currentStep < currentScenario.length) {
        showNextMessage();
    } 
    // 現在のセリフブロックが最後まで行き、次に飛ぶべき指定（nextChapter）がある場合
    else if (currentScenario[0] && currentScenario[0].nextChapter) {
        const nextKey = currentScenario[0].nextChapter;
        currentScenario = scenarioData[nextKey];
        currentStep = 0;
        showNextMessage();
    }
    // シナリオが完全に終了した場合
    else {
        alert("第1章クリアです！お疲れ様でした！");
    }
});

// セリフ表示関数
function showNextMessage() {
    const data = currentScenario[currentStep];
    
    speakerName.textContent = data.speaker;

    // 立ち絵の滑らかな切り替え処理
    if (susumuImg.src !== data.img) {
        susumuImg.classList.add('fade-out'); // 一時的に透明にする
        setTimeout(() => {
            susumuImg.src = data.img; // 画像差分を切り替え
            susumuImg.classList.remove('fade-out'); // 再び表示
        }, 150); // 0.15秒後に切り替え
    }
    
    // {name} をプレイヤー名に置換
    const formattedText = data.text.replace(/{name}/g, playerName);
    messageText.textContent = formattedText;

    // 1. もし選択肢（choices）データが含まれていたら選択肢を表示
    if (data.choices) {
        showChoices(data.choices);
    }

    // 2. もしリンク（link）データが含まれていたら「Webサイトを開くボタン」を表示
    if (data.link) {
        showLinkButton(data.link);
    }
}

// 選択肢ボタンを生成・表示する関数
function showChoices(choices) {
    choiceBox.innerHTML = ''; // 一度中身をリセット
    choiceBox.classList.remove('hidden'); // 選択肢枠を表示

    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.textContent = choice.text;
        
        // ボタンクリック時の挙動
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // メッセージ枠へのクリックイベント伝播を防止
            
            choiceBox.classList.add('hidden'); // 選択肢枠を隠す
            
            // 選択された分岐先（c1_correct や c1_wrong など）にシナリオを切り替える
            currentScenario = scenarioData[choice.targetIndex];
            currentStep = 0;
            showNextMessage();
        });
        
        choiceBox.appendChild(btn);
    });
}

// Webリンクボタンを生成・表示する関数
function showLinkButton(url) {
    choiceBox.innerHTML = ''; // 中身をリセット
    choiceBox.classList.remove('hidden');

    const linkBtn = document.createElement('button');
    linkBtn.textContent = "📖 進くんの解説Webサイトを開く";
    linkBtn.style.backgroundColor = "#e11d48"; // 目立つ赤/ピンク系
    linkBtn.style.color = "#ffffff";
    linkBtn.style.fontWeight = "bold";
    linkBtn.style.padding = "12px 24px";
    
    linkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // 新しいタブで解説ページ（chapter1.htmlなど）を開く
        window.open(url, '_blank');
    });

    choiceBox.appendChild(linkBtn);
}