// ==========================================
// 1. テンプレート複数条件（AND）検索 & 増分表示制御
// ==========================================
let templatesDisplayLimit = 10; // 現在表示を許可する件数上限

// チェックボックス選択時の絞り込みメイン処理
function applyFilters() {
  // チェックされているボックスの値を取得
  const checkedBoxes = document.querySelectorAll('.filter-chip input:checked');
  const selectedValues = Array.from(checkedBoxes).map(cb => cb.value);

  const cards = document.querySelectorAll('#templates .template-card');
  let matchCount = 0;

  cards.forEach(card => {
    // カードの data-tags 属性を取得（例: "novel sub simple c-white"）
    const cardTagsStr = card.getAttribute('data-tags') || '';
    const cardTags = cardTagsStr.trim().split(/\s+/);

    // 選択された条件が「すべて」カードのタグに含まれているか確認 (AND条件)
    const isMatch = selectedValues.every(val => cardTags.includes(val));

    if (isMatch) {
      matchCount++;

      // 現在の件数上限以内なら表示
      if (matchCount <= templatesDisplayLimit) {
        if (card.classList.contains('is-hidden') || !card.classList.contains('fade-in')) {
          card.classList.remove('is-hidden');
          card.classList.remove('fade-in');
          const delay = ((matchCount - 1) % 10) * 0.04;
          card.style.animationDelay = `${delay}s`;

          requestAnimationFrame(() => {
            card.classList.add('fade-in');
          });
        }
      } else {
        card.classList.add('is-hidden');
        card.classList.remove('fade-in');
      }
    } else {
      card.classList.add('is-hidden');
      card.classList.remove('fade-in');
    }
  });

  // 件数バッジの更新
  const countBadge = document.getElementById('filter-count');
  if (countBadge) {
    if (selectedValues.length === 0) {
      countBadge.textContent = '全件表示中';
    } else {
      countBadge.textContent = `該当 ${matchCount} 件`;
    }
  }

  // ボタンエリアの表示制御
  updateMoreButtons(matchCount);
}

// フィルターリセット処理
function resetFilters() {
  const checkboxes = document.querySelectorAll('.filter-chip input');
  checkboxes.forEach(cb => cb.checked = false);
  templatesDisplayLimit = 10;
  applyFilters();
}

// 「もっと見る」・「閉じる」ボタンの表示切替
function updateMoreButtons(matchCount) {
  const moreContainer = document.getElementById('templates-more-container');
  const moreBtn = document.getElementById('templates-more-btn');
  const closeBtn = document.getElementById('templates-close-btn');

  if (!moreContainer) return;

  if (matchCount > 10) {
    moreContainer.style.display = 'flex';

    if (matchCount > templatesDisplayLimit) {
      moreBtn.style.display = 'inline-flex';
    } else {
      moreBtn.style.display = 'none';
    }

    if (templatesDisplayLimit > 10) {
      closeBtn.style.display = 'inline-flex';
    } else {
      closeBtn.style.display = 'none';
    }
  } else {
    moreContainer.style.display = 'none';
  }
}

// 「もっと見る」ボタンの処理（＋10件表示）
function showMoreTemplates() {
  templatesDisplayLimit += 10;
  applyFilters();
}

// 「閉じる」ボタンの処理（10件に戻す）
function closeTemplates() {
  templatesDisplayLimit = 10;
  applyFilters();

  const section = document.getElementById('templates');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}


// ==========================================
// 2. コラムカテゴリ切り替え & 10件ずつ増分表示制御
// ==========================================
let columnDisplayLimit = 10; // 現在表示を許可する件数上限

function filterColumns(category, btnElement) {
  const columnSection = document.getElementById('column');
  if (!columnSection) return;

  // タブボタンがクリックされた場合、上限を10件にリセット
  if (btnElement) {
    const buttons = columnSection.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    columnDisplayLimit = 10;
  }

  const cards = columnSection.querySelectorAll('.column-card');
  let matchCount = 0;

  cards.forEach(card => {
    const cardCategories = card.getAttribute('data-category') || '';
    const categoryArray = cardCategories.split(' ');

    if (category === 'all' || categoryArray.includes(category)) {
      matchCount++;

      // 現在の制限件数以内であれば表示
      if (matchCount <= columnDisplayLimit) {
        if (card.classList.contains('is-hidden')) {
          card.classList.remove('is-hidden');
          card.classList.remove('fade-in');
          const delay = ((matchCount - 1) % 10) * 0.04;
          card.style.animationDelay = `${delay}s`;

          requestAnimationFrame(() => {
            card.classList.add('fade-in');
          });
        }
      } else {
        card.classList.add('is-hidden');
      }
    } else {
      card.classList.add('is-hidden');
    }
  });

  // ボタンエリアの表示制御
  const moreContainer = document.getElementById('column-more-container');
  const moreBtn = document.getElementById('column-more-btn');
  const closeBtn = document.getElementById('column-close-btn');

  if (moreContainer) {
    if (matchCount > 10) {
      moreContainer.style.display = 'flex';

      if (matchCount > columnDisplayLimit) {
        moreBtn.style.display = 'inline-flex';
      } else {
        moreBtn.style.display = 'none';
      }

      if (columnDisplayLimit > 10) {
        closeBtn.style.display = 'inline-flex';
      } else {
        closeBtn.style.display = 'none';
      }
    } else {
      moreContainer.style.display = 'none';
    }
  }
}

// コラム「もっと見る」ボタンの処理（＋10件追加表示）
function showMoreColumns() {
  columnDisplayLimit += 10;
  const activeTab = document.querySelector('#column .tab-btn.active');
  const currentCategory = activeTab ? activeTab.getAttribute('onclick').match(/'([^']+)'/)[1] : 'all';

  filterColumns(currentCategory, null);
}

// コラム「閉じる」ボタンの処理（初期10件表示に戻す）
function closeColumns() {
  columnDisplayLimit = 10;
  const activeTab = document.querySelector('#column .tab-btn.active');
  const currentCategory = activeTab ? activeTab.getAttribute('onclick').match(/'([^']+)'/)[1] : 'all';

  filterColumns(currentCategory, null);

  // セクションの先頭へスクロール
  const section = document.getElementById('column');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
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
        if (targetElem.tagName.toLowerCase() === 'details') {
          targetElem.open = true;
        } 
        else {
          const childDetails = targetElem.querySelector('details');
          if (childDetails) {
            childDetails.open = true;
          }
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
  // テンプレートの初期表示を実行（最新10件のみ表示）
  applyFilters();

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