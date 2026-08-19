// ==========================================
// 1. テンプレートカテゴリ切り替え & アニメーション
// ==========================================
function filterTemplates(category, btnElement) {
  const buttons = document.querySelectorAll('#templates .tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');

  let visibleIndex = 0;
  const cards = document.querySelectorAll('#templates .template-card');

  cards.forEach(card => {
    const cardCategories = card.getAttribute('data-category') || '';
    const categoryArray = cardCategories.split(' ');

    card.classList.remove('fade-in');
    card.style.animationDelay = '0s';

    if (category === 'all' || categoryArray.includes(category)) {
      card.classList.remove('is-hidden');
      const delay = visibleIndex * 0.06;
      card.style.animationDelay = `${delay}s`;

      requestAnimationFrame(() => {
        card.classList.add('fade-in');
      });

      visibleIndex++;
    } else {
      card.classList.add('is-hidden');
    }
  });
}

// ==========================================
// 2. コラムカテゴリ切り替え & アニメーション
// ==========================================
function filterColumns(category, btnElement) {
  const columnSection = document.getElementById('column');
  if (!columnSection) return;

  const buttons = columnSection.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');

  let visibleIndex = 0;
  const cards = columnSection.querySelectorAll('.column-card');

  cards.forEach(card => {
    const cardCategories = card.getAttribute('data-category') || '';
    const categoryArray = cardCategories.split(' ');

    card.classList.remove('fade-in');
    card.style.animationDelay = '0s';

    if (category === 'all' || categoryArray.includes(category)) {
      card.classList.remove('is-hidden');
      const delay = visibleIndex * 0.05;
      card.style.animationDelay = `${delay}s`;

      requestAnimationFrame(() => {
        card.classList.add('fade-in');
      });

      visibleIndex++;
    } else {
      card.classList.add('is-hidden');
    }
  });
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
// 4. ページ読み込み完了時の初期化処理
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // テンプレートの初期化
  const defaultTab = document.querySelector('#templates .tab-btn.active');
  if (defaultTab) {
    filterTemplates('all', defaultTab);
  }

  // コラムの初期化
  const defaultColumnTab = document.querySelector('#column .tab-btn.active');
  if (defaultColumnTab) {
    filterColumns('all', defaultColumnTab);
  }

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