// game.js

// ★ 保存されている名前があれば読み込み
let playerName = localStorage.getItem('player_name') || "マネージャー";
let currentStep = 0;
let currentScenario = scenariodata.chapter1; 

let currentOutfit = localStorage.getItem('susumu_outfit') || 'default'; 

let isTyping = false;       
let typingTimer = null;     
let currentFullText = "";   

const bgmAudio = new Audio();
bgmAudio.loop = true;  
bgmAudio.volume = 0.2; 

// URLパラメータ判定（?ch=2 や ?ch=cleared など）
const urlParams = new URLSearchParams(window.location.search);
const selectedChapter = urlParams.get('ch'); 

// DOM要素の取得
const nameInputBox = document.getElementById('name-input-box');
const startBtn = document.getElementById('start-btn');
const playerNameInput = document.getElementById('player-name-input');
const choiceBox = document.getElementById('choice-box');
const messageBox = document.getElementById('message-box');
const speakerName = document.getElementById('speaker-name');
const messageText = document.getElementById('message-text');
const susumuImg = document.getElementById('susumu-img');

// 保存されている名前があれば、入力フォームの初期値として表示する
if (playerNameInput && playerName) {
    playerNameInput.value = playerName;
}

// --------------------------------------------------
// ★ 初期化処理（名前入力画面のスキップ判定）
// --------------------------------------------------
if (selectedChapter) {
    if (selectedChapter === 'cleared' && scenariodata.cleared) {
        currentScenario = scenariodata.cleared;
        localStorage.setItem('game_cleared', 'true');
    } else if (scenariodata[`chapter${selectedChapter}`]) {
        currentScenario = scenariodata[`chapter${selectedChapter}`];
    }
}

// 1章（またはパラメータなし）以外の章で、すでに名前が保存されている場合は入力画面をスキップ！
if (selectedChapter && selectedChapter !== '1' && localStorage.getItem('player_name')) {
    nameInputBox.classList.add('hidden');
    messageBox.classList.remove('hidden');
    
    // 画面をクリックしたタイミング等でBGM再生をケア
    document.addEventListener('click', function initBGM() {
        playBGM();
        document.removeEventListener('click', initBGM);
    }, { once: true });

    createChapterSelectMenu();
    checkOutfitButton(); 
    showNextMessage();
}

// ゲーム開始ボタンの処理（1章や初回入力時）
startBtn.addEventListener('click', () => {
    const inputVal = playerNameInput.value.trim();
    if (inputVal !== "") {
        playerName = inputVal;
        // ★ 入力された名前をブラウザに保存（次章へ持ち越し）
        localStorage.setItem('player_name', playerName);
    }
    
    nameInputBox.classList.add('hidden');
    messageBox.classList.remove('hidden');
    
    playBGM();
    createChapterSelectMenu();
    checkOutfitButton(); 

    showNextMessage();
});

function playBGM() {
    if (currentScenario === scenariodata.cleared) {
        bgmAudio.src = 'audio/clear_bgm.mp3'; 
    } else {
        bgmAudio.src = 'audio/bgm.mp3';       
    }

    bgmAudio.play().catch(error => {
        console.log("BGM自動再生エラー:", error);
    });
}

messageBox.addEventListener('click', () => {
    if (!choiceBox.classList.contains('hidden')) {
        return; 
    }

    if (isTyping) {
        clearInterval(typingTimer);
        isTyping = false;
        messageText.textContent = currentFullText;
        return;
    }

    currentStep++;

    if (currentStep < currentScenario.length) {
        showNextMessage();
    } 
    else if (currentScenario[currentStep - 1] && currentScenario[currentStep - 1].staffRoll) {
        startStaffRoll();
    }
    else if (currentScenario[0] && currentScenario[0].nextChapter) {
        const nextKey = currentScenario[0].nextChapter;
        currentScenario = scenariodata[nextKey];
        currentStep = 0;
        showNextMessage();
    }
    else {
        alert("お疲れ様でした！目次ページまたはゲームを継続して楽しんでね！");
    }
});

// スチル専用オーバーレイ
function getStillOverlay() {
    let stillLayer = document.getElementById('still-layer');
    const container = document.getElementById('game-container');

    if (!stillLayer) {
        stillLayer = document.createElement('div');
        stillLayer.id = 'still-layer';
        stillLayer.style.position = 'absolute';
        stillLayer.style.top = '0';
        stillLayer.style.left = '0';
        stillLayer.style.width = '100%';
        stillLayer.style.height = '100%';
        stillLayer.style.backgroundSize = 'cover';
        stillLayer.style.backgroundPosition = 'center';
        stillLayer.style.backgroundRepeat = 'no-repeat';
        stillLayer.style.zIndex = '2'; 
        stillLayer.style.transition = 'opacity 0.3s ease';
        
        container.style.position = 'relative';
        container.appendChild(stillLayer);
    }
    return stillLayer;
}

// セリフ表示関数
function showNextMessage() {
    const data = currentScenario[currentStep];
    speakerName.textContent = data.speaker;
    const stillLayer = getStillOverlay();

    if (data.bg) {
        stillLayer.style.backgroundImage = `url("${data.bg}")`;
        stillLayer.style.opacity = '1';
        stillLayer.style.display = 'block';
    } else {
        stillLayer.style.opacity = '0';
        stillLayer.style.display = 'none';
    }

    if (!data.img || data.img === "") {
        susumuImg.style.display = 'none';
    } else {
        susumuImg.style.display = 'block';

        let targetImg = data.img;

        if (currentOutfit === 'school' && !data.img.includes('clear.jpg')) {
            if (data.img.includes('susumu_smile')) {
                targetImg = "images/susumu_smile_clear.png";
            } else if (data.img.includes('susumu_laugh')) {
                targetImg = "images/susumu_laugh_clear.png";
            } else if (data.img.includes('susumu_normal')) {
                targetImg = "images/susumu_normal_clear.png";
            }
        }

        if (susumuImg.src !== targetImg) {
            susumuImg.classList.add('fade-out');
            setTimeout(() => {
                susumuImg.src = targetImg;
                susumuImg.classList.remove('fade-out');
            }, 150);
        }
    }
    
    currentFullText = data.text.replace(/{name}/g, playerName);
    startTypingEffect(currentFullText);

    if (data.choices) showChoices(data.choices);
    if (data.link) showLinkButton(data.link);
}

function startTypingEffect(text) {
    clearInterval(typingTimer);
    messageText.textContent = ""; 
    isTyping = true;
    let charIndex = 0;

    typingTimer = setInterval(() => {
        messageText.textContent += text.charAt(charIndex);
        charIndex++;

        if (charIndex >= text.length) {
            clearInterval(typingTimer);
            isTyping = false;
        }
    }, 30); 
}

// スタッフロール再生機能（青空スチル透過表示対応）
function startStaffRoll() {
    messageBox.classList.add('hidden'); 
    const container = document.getElementById('game-container');

    const rollOverlay = document.createElement('div');
    rollOverlay.id = 'staff-roll-overlay';
    rollOverlay.style.position = 'absolute';
    rollOverlay.style.top = '0';
    rollOverlay.style.left = '0';
    rollOverlay.style.width = '100%';
    rollOverlay.style.height = '100%';
    rollOverlay.style.backgroundColor = 'rgba(15, 23, 42, 0.75)'; // 青空が見える心地よい半透明
    rollOverlay.style.zIndex = '10';
    rollOverlay.style.color = '#ffffff';
    rollOverlay.style.overflow = 'hidden';
    rollOverlay.style.display = 'flex';
    rollOverlay.style.justifyContent = 'center';

    const rollContent = document.createElement('div');
    rollContent.style.position = 'absolute';
    rollContent.style.bottom = '-100%'; 
    rollContent.style.width = '80%';
    rollContent.style.textAlign = 'center';
    rollContent.style.lineHeight = '2';
    rollContent.style.transition = 'transform 12s linear'; 

    rollContent.innerHTML = `
        <h2 style="font-size: 1.5rem; color: #38bdf8; margin-bottom: 30px; border:none;">〜 STAFF CREDIT 〜</h2>
        
        <p style="font-size: 0.9rem; color: #94a3b8; margin-top:20px;">【制作】</p>
        <p style="font-size: 1.2rem; font-weight: bold;">okojo</p>
        
        <p style="font-size: 0.9rem; color: #94a3b8; margin-top:30px;">【背景素材】</p>
        <p style="font-size: 1.1rem;">ゴリラの素材屋さん</p>
        
        <p style="font-size: 0.9rem; color: #94a3b8; margin-top:30px;">【BGM素材】</p>
        <p style="font-size: 1.1rem;">Tinymemory<br>FLASH☆BEAT</p>
        
        <p style="font-size: 0.9rem; color: #f59e0b; margin-top:40px;">【Special Thanks】</p>
        <p style="font-size: 1.2rem; font-weight: bold; color: #f59e0b;">Gemini</p>

        <p style="font-size: 1.3rem; font-weight: bold; margin-top: 60px; color: #38bdf8;">THANK YOU FOR PLAYING!</p>
    `;

    rollOverlay.appendChild(rollContent);
    container.appendChild(rollOverlay);

    setTimeout(() => {
        rollContent.style.transform = 'translateY(-180%)';
    }, 100);

    setTimeout(() => {
        const returnBtn = document.createElement('button');
        returnBtn.textContent = "🏆 トップ（目次）ページへ戻る";
        returnBtn.style.position = 'absolute';
        returnBtn.style.bottom = '30px';
        returnBtn.style.left = '50%';
        returnBtn.style.transform = 'translateX(-50%)';
        returnBtn.style.padding = '12px 24px';
        returnBtn.style.fontSize = '1rem';
        returnBtn.style.fontWeight = 'bold';
        returnBtn.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
        returnBtn.style.color = '#ffffff';
        returnBtn.style.border = 'none';
        returnBtn.style.borderRadius = '25px';
        returnBtn.style.cursor = 'pointer';
        returnBtn.style.boxShadow = '0 4px 15px rgba(245, 158, 11, 0.4)';

        returnBtn.addEventListener('click', () => {
            bgmAudio.pause();
            window.location.href = 'portal.html';
        });

        rollOverlay.appendChild(returnBtn);
    }, 12500);
}

// 選択肢表示関数（ヒント機能付き）
function showChoices(choices) {
    choiceBox.innerHTML = ''; 
    choiceBox.classList.remove('hidden'); 

    const currentData = currentScenario[currentStep];

    // ★ ヒントデータが存在する場合、ヒントボタンを最上部に追加
    if (currentData && currentData.hint) {
        const hintBtn = document.createElement('button');
        hintBtn.textContent = "💡 進くんのヒントを見る";
        hintBtn.style.background = "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)";
        hintBtn.style.color = "#ffffff";
        hintBtn.style.marginBottom = "10px";
        hintBtn.style.fontSize = "0.85rem";

        hintBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            alert(currentData.hint); // アラートポップアップでヒントを表示
        });

        choiceBox.appendChild(hintBtn);
    }

    // 選択肢ボタンの生成
    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.textContent = choice.text;
        
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            choiceBox.classList.add('hidden'); 
            
            currentScenario = scenariodata[choice.targetIndex];
            currentStep = 0;
            showNextMessage();
        });
        
        choiceBox.appendChild(btn);
    });
}

function showLinkButton(url) {
    choiceBox.innerHTML = ''; 
    choiceBox.classList.remove('hidden');

    const linkBtn = document.createElement('button');
    
    if (url === 'portal.html') {
        linkBtn.textContent = "🏆 祝・全章完走！トップ（目次）ページへ戻る";
        linkBtn.style.background = "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)";
    } else {
        linkBtn.textContent = "📖 進くんの解説Webサイトを開く";
        linkBtn.style.background = "linear-gradient(135deg, #e11d48 0%, #be123c 100%)";
    }
    
    linkBtn.style.color = "#ffffff";
    
    linkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        bgmAudio.pause(); 
        window.location.href = url; 
    });

    choiceBox.appendChild(linkBtn);
}

function createChapterSelectMenu() {
    const container = document.getElementById('game-container');
    if (document.getElementById('chapter-select-btn')) return;

    const selectBtn = document.createElement('button');
    selectBtn.id = 'chapter-select-btn';
    selectBtn.textContent = "⚙️ 章選択";
    
    selectBtn.style.position = 'absolute';
    selectBtn.style.top = '10px';
    selectBtn.style.right = '10px';
    selectBtn.style.zIndex = '8';
    selectBtn.style.padding = '6px 12px';
    selectBtn.style.fontSize = '0.75rem';
    selectBtn.style.fontWeight = 'bold';
    selectBtn.style.background = 'rgba(15, 23, 42, 0.8)';
    selectBtn.style.color = '#38bdf8';
    selectBtn.style.border = '1px solid #38bdf8';
    selectBtn.style.borderRadius = '6px';
    selectBtn.style.cursor = 'pointer';

    selectBtn.addEventListener('click', () => {
        showChapterModal();
    });

    container.appendChild(selectBtn);
}

function showChapterModal() {
    choiceBox.innerHTML = '<p style="margin-bottom:10px;">遊ぶ章を選んでね！</p>';
    choiceBox.classList.remove('hidden');

    const chapters = [
        { label: "第1章：HTMLの基本骨格", key: "chapter1" },
        { label: "第2章：見出し・段落・改行", key: "chapter2" },
        { label: "第3章：画像と相対パス", key: "chapter3" },
        { label: "第4章：リンクと別タブ表示", key: "chapter4" },
        { label: "第5章：CSSでユニフォームを着せよう", key: "chapter5" },
    ];

    chapters.forEach(ch => {
        const btn = document.createElement('button');
        btn.textContent = ch.label;
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            choiceBox.classList.add('hidden');
            
            currentScenario = scenariodata[ch.key];
            currentStep = 0;
            playBGM();
            showNextMessage();
        });
        choiceBox.appendChild(btn);
    });

    const closeBtn = document.createElement('button');
    closeBtn.textContent = "✕ 閉じる";
    closeBtn.style.background = "linear-gradient(135deg, #64748b 0%, #475569 100%)";
    closeBtn.style.marginTop = "12px";

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        choiceBox.classList.add('hidden');
        
        const currentData = currentScenario[currentStep];
        if (currentData.choices) {
            showChoices(currentData.choices);
        } else if (currentData.link) {
            showLinkButton(currentData.link);
        }
    });

    choiceBox.appendChild(closeBtn);
}

function checkOutfitButton() {
    const isCleared = localStorage.getItem('game_cleared');
    if (!isCleared) return; 

    const container = document.getElementById('game-container');
    if (document.getElementById('outfit-btn')) return;

    const outfitBtn = document.createElement('button');
    outfitBtn.id = 'outfit-btn';
    outfitBtn.textContent = "👕 衣装切替";
    
    outfitBtn.style.position = 'absolute';
    outfitBtn.style.top = '10px';
    outfitBtn.style.right = '95px';
    outfitBtn.style.zIndex = '8';
    outfitBtn.style.padding = '6px 12px';
    outfitBtn.style.fontSize = '0.75rem';
    outfitBtn.style.fontWeight = 'bold';
    outfitBtn.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
    outfitBtn.style.color = '#ffffff';
    outfitBtn.style.border = 'none';
    outfitBtn.style.borderRadius = '6px';
    outfitBtn.style.cursor = 'pointer';

    outfitBtn.addEventListener('click', () => {
        if (currentOutfit === 'default') {
            currentOutfit = 'school';
            alert("進くんが【ブレザー】に着替えました！");
        } else {
            currentOutfit = 'default';
            alert("進くんが【ユニフォーム】に着替えました！");
        }
        localStorage.setItem('susumu_outfit', currentOutfit);
        showNextMessage(); 
    });

    container.appendChild(outfitBtn);
}