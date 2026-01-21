// スクロール連動アニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

// ハンバーガーメニューの制御
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // ハンバーガーメニューのトグル
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // メニューリンクをクリックしたらメニューを閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 監視対象の要素を設定
document.addEventListener('DOMContentLoaded', () => {
    // セクションタイトル
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => observer.observe(title));

    // Aboutセクション
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) observer.observe(aboutContent);

    // サービスカード
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // 動画作品
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // SNSカード
    const snsCards = document.querySelectorAll('.sns-card');
    snsCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Web Designコンテンツ
    const webDesignContent = document.querySelector('.web-design-content');
    if (webDesignContent) observer.observe(webDesignContent);

    // お問い合わせボタン
    const contactButtons = document.querySelectorAll('.contact-button');
    contactButtons.forEach((button, index) => {
        button.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(button);
    });
});

// スムーズスクロール（アンカーリンク用）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// パララックス効果（Hero背景）
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Instagram Profile Modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('instagramModal');
    const modalClose = document.querySelector('.modal-close');
    const instagramFrame = document.getElementById('instagramFrame');
    const snsCards = document.querySelectorAll('.sns-card[data-instagram]');

    // SNSカードをクリックしたらモーダルを開く
    snsCards.forEach(card => {
        card.addEventListener('click', () => {
            const username = card.getAttribute('data-instagram');
            // Instagramの埋め込みURL
            instagramFrame.src = `https://www.instagram.com/${username}/embed/`;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // スクロールを無効化
        });
    });

    // 閉じるボタンをクリックしたらモーダルを閉じる
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        instagramFrame.src = ''; // iframeをクリア
        document.body.style.overflow = ''; // スクロールを有効化
    });

    // モーダルの外側をクリックしたら閉じる
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            instagramFrame.src = '';
            document.body.style.overflow = '';
        }
    });
});

