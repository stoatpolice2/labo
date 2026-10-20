// ==========================================
// 1. テンプレートカテゴリ切り替え & 最新10件表示制御
// ==========================================
let isTemplatesExpanded = false; // 「もっと見る」が開かれているかどうかの状態

function filterTemplates(category, btnElement) {
  // タブボタンの切り替え（引数で渡された場合）
  if (btnElement) {
    const buttons = document.querySelectorAll('#templates .tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    // タブ変更時は展開状態をリセット
    isTemplatesExpanded = false;
  }

  const cards = document.querySelectorAll('#templates .template-card');
  let matchCount = 0;

  cards.forEach(card => {
    const cardCategories = card.getAttribute('data-category') || '';
    const categoryArray = cardCategories.split(' ');

    card.classList.remove('fade-in');
    card.style.animationDelay = '0s';

    if (category === 'all' || categoryArray.includes(category)) {
      matchCount++;

      // 10件以内、または全開モード(isTemplatesExpanded === true)のときに表示
      if (matchCount <= 10 || isTemplatesExpanded) {
        card.classList.remove('is-hidden');
        const delay = (matchCount <= 10 ? matchCount - 1 : (matchCount - 1) % 10) * 0.04;
        card.style.animationDelay = `${delay}s`;

        requestAnimationFrame(() => {
          card.classList.add('fade-in');
        });
      } else {
        card.classList.add('is-hidden');
      }
    } else {
      card.classList.add('is-hidden');
    }
  });

  // 「もっと見る」ボタンの表示・テキスト制御
  const moreContainer = document.getElementById('templates-more-container');
  if (moreContainer) {
    const moreBtn = moreContainer.querySelector('.btn-more');
    if (matchCount > 10) {
      moreContainer.style.display = 'block';
      if (moreBtn) {
        moreBtn.textContent = isTemplatesExpanded ? '閉じる 🐾' : 'もっと見る 🐾';
      }
    } else {
      moreContainer.style.display = 'none';
    }
  }
}

// テンプレートの「もっと見る / 閉じる」トグル処理
function toggleMoreTemplates(btnElement) {
  isTemplatesExpanded = !isTemplatesExpanded;
  const activeTab = document.querySelector('#templates .tab-btn.active');
  const currentCategory = activeTab ? activeTab.getAttribute('onclick').match(/'([^']+)'/)[1] : 'all';

  filterTemplates(currentCategory, null);

  // 閉じるときはテンプレートセクションのトップへスムーズにスクロール
  if (!isTemplatesExpanded) {
    const section = document.getElementById('templates');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}


// ==========================================
// 2. コラムカテゴリ切り替え & 最新10件表示制御
// ==========================================
let isColumnsExpanded = false; // 「もっと見る」が開かれているかどうかの状態

function filterColumns(category, btnElement) {
  const columnSection = document.getElementById('column');
  if (!columnSection) return;

  // タブボタンの切り替え（引数で渡された場合）
  if (btnElement) {
    const buttons = columnSection.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    // タブ変更時は展開状態をリセット
    isColumnsExpanded = false;
  }

  const cards = columnSection.querySelectorAll('.column-card');
  let matchCount = 0;

  cards.forEach(card => {
    const cardCategories = card.getAttribute('data-category') || '';
    const categoryArray = cardCategories.split(' ');

    card.classList.remove('fade-in');
    card.style.animationDelay = '0s';

    if (category === 'all' || categoryArray.includes(category)) {
      matchCount++;

      // 10件以内、または全開モード(isColumnsExpanded === true)のときに表示
      if (matchCount <= 10 || isColumnsExpanded) {
        card.classList.remove('is-hidden');
        const delay = (matchCount <= 10 ? matchCount - 1 : (matchCount - 1) % 10) * 0.04;
        card.style.animationDelay = `${delay}s`;

        requestAnimationFrame(() => {
          card.classList.add('fade-in');
        });
      } else {
        card.classList.add('is-hidden');
      }
    } else {
      card.classList.add('is-hidden');
    }
  });

  // 「もっと見る」ボタンの表示・テキスト制御
  const moreContainer = document.getElementById('column-more-container');
  if (moreContainer) {
    const moreBtn = moreContainer.querySelector('.btn-more');
    if (matchCount > 10) {
      moreContainer.style.display = 'block';
      if (moreBtn) {
        moreBtn.textContent = isColumnsExpanded ? '閉じる 🐾' : 'もっと見る 🐾';
      }
    } else {
      moreContainer.style.display = 'none';
    }
  }
}

// コラムの「もっと見る / 閉じる」トグル処理
function toggleMoreColumns(btnElement) {
  isColumnsExpanded = !isColumnsExpanded;
  const activeTab = document.querySelector('#column .tab-btn.active');
  const currentCategory = activeTab ? activeTab.getAttribute('onclick').match(/'([^']+)'/)[1] : 'all';

  filterColumns(currentCategory, null);

  // 閉じるときはコラムセクションのトップへスムーズにスクロール
  if (!isColumnsExpanded) {
    const section = document.getElementById('column');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}


// ==========================================
// 3. HTMLコードをクリップボードにコピー
// ==========================================
async function copyHtmlFromFile(buttonElement) {
  const filePath = buttonElement.getAttribute('data-file');
  if (!filePath) return;

  const originalText = buttonElement.textContent;

  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`ファイルの読み込みに失敗しました (${response.status})`);
    }
    const textData = await response.text();
    await navigator.clipboard.writeText(textData);

    // 成功時の演出
    buttonElement.textContent = 'コピー完了！';
    buttonElement.style.background = '#66524A';

    setTimeout(() => {
      buttonElement.textContent = originalText;
      buttonElement.style.background = '';
    }, 2000);

  } catch (error) {
    console.error('Copy Error:', error);
    alert('コードの取得・コピーに失敗しました。');
  }
}


// ==========================================
// 4. アコーディオン内リンクへのスムーズスクロール対応
// ==========================================
function handleAccordionNav() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        // 1. ターゲット自体が details の場合
        if (targetElem.tagName.toLowerCase() === 'details') {
          targetElem.open = true;
        } 
        // 2. ターゲットが section などで、その直下に details がある場合
        else {
          const childDetails = targetElem.querySelector('details');
          if (childDetails) {
            childDetails.open = true;
          }
          // 3. ターゲットが details の内側にある要素の場合（#rules など）
          const parentDetails = targetElem.closest('details');
          if (parentDetails) {
            parentDetails.open = true;
          }
        }
      }
    });
  });
}


// ==========================================
// 5. ページ読み込み完了時の初期化処理
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // テンプレートの初期化（最新10件のみ表示）
  const defaultTab = document.querySelector('#templates .tab-btn.active');
  if (defaultTab) {
    filterTemplates('all', defaultTab);
  }

  // コラムの初期化（最新10件のみ表示）
  const defaultColumnTab = document.querySelector('#column .tab-btn.active');
  if (defaultColumnTab) {
    filterColumns('all', defaultColumnTab);
  }

  // アコーディオン内リンク補助機能
  handleAccordionNav();

  // ページトップへ戻るボタンの処理
  const pageTopBtn = document.getElementById('pagetop');
  if (pageTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        pageTopBtn.classList.add('is-active');
      } else {
        pageTopBtn.classList.remove('is-active');
      }
    });

    pageTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});