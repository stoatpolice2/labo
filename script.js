// カテゴリ切り替え & Stagger アニメーション関数
function filterTemplates(category, btnElement) {
  const buttons = document.querySelectorAll('.tab-btn');
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

// 指定したファイルを取得してクリップボードにコピーする関数
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
      buttonElement.style.background = ''; // インラインスタイルを解除して元のCSSに戻す
    }, 2000);

  } catch (error) {
    console.error('Copy Error:', error);
    alert('コードの取得・コピーに失敗しました。')
  }
}

// 初回読み込み時
document.addEventListener('DOMContentLoaded', () => {
  const defaultTab = document.querySelector('.tab-btn.active');
  if (defaultTab) {
    filterTemplates('all', defaultTab);
  }

  // --- ページトップへ戻るボタンの処理 ---
  const pageTopBtn = document.getElementById('pagetop');
  if (pageTopBtn) {
    // スクロール量（100px以上）に応じてボタンを表示
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        pageTopBtn.classList.add('is-active');
      } else {
        pageTopBtn.classList.remove('is-active');
      }
    });

    // クリック時にスムーズスクロールでトップへ移動
    pageTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});