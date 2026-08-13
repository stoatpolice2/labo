document.addEventListener('DOMContentLoaded', () => {
    const copyBtns = document.querySelectorAll('.copy-btn');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.code-card');
            if (!card) return;

            const codeElement = card.querySelector('code');
            if (!codeElement) return;

            const textToCopy = codeElement.innerText;

            // クリップボード書き込み処理
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => showSuccess(btn))
                    .catch(() => fallbackCopy(textToCopy, btn));
            } else {
                fallbackCopy(textToCopy, btn);
            }
        });
    });

    function showSuccess(btn) {
        const originalText = btn.textContent;
        btn.textContent = '✅ コピー完了！';
        btn.style.background = '#10b981';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '#475569';
        }, 2000);
    }

    function fallbackCopy(text, btn) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
            showSuccess(btn);
        } catch (err) {
            alert('コピーに失敗しました。手動で選択してコピーしてください。');
        } finally {
            document.body.removeChild(textArea);
        }
    }
});