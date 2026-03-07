/**
 * SNS Agency Website - Script
 */

// ページ読み込み直後にURLのハッシュを除去し、強制的にトップへスクロール
// （リロード時に #contact 等のハッシュが残っていてスクロールジャンプするのを防ぐ）
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  // DOMContentLoaded後も念のためトップへ
  window.scrollTo(0, 0);

  // Dynamically inject the hidden iframe after page load to prevent it from stealing scroll focus on reload
  setTimeout(() => {
    const iframeHtml = `<iframe name="hidden_iframe" id="hidden_iframe" style="display:none;" onload="if(window.submitted) {alert('お問い合わせを受け付けました。後ほど担当者よりご連絡いたします。'); document.getElementById('gform').reset(); window.submitted=false;}"></iframe>`;
    document.body.insertAdjacentHTML('beforeend', iframeHtml);
  }, 100);

  // --- Header Scroll Effect & Back to Top ---
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Toggle Back to Top button
    if (backToTop) {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });

  // --- Mobile Menu Toggle ---
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-btn');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  // Close menu when clicking a link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // --- Scroll Animation Observer ---
  // Using Intersection Observer to add 'visible' class when elements scroll into view
  const fadeElements = document.querySelectorAll('.fade-in-up');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: Stop observing once faded in
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(element => {
    observer.observe(element);
  });

  // --- Service Details Modal Logic ---
  const serviceModal = document.getElementById('serviceModal');
  const serviceModalBody = document.getElementById('serviceModalBody');
  const openModalBtns = document.querySelectorAll('.open-service-modal');
  const closeModalBtns = document.querySelectorAll('.modal-close');

  // Service Data (Mocked based on existing cards)
  const serviceData = {
    "1": {
      title: "インスタ運用CM動画制作＋365日配信プラン",
      desc: "CMレベルの高品質な動画制作と、365日休むことのない継続的な配信により、圧倒的な認知拡大を実現します。<br><br>【プラン内容】<br>・プロによるCM動画制作<br>・365日の毎日投稿運用代行<br>・効果測定とレポート提出",
      price: "<span class='price-val'>40,000</span>円(税別)〜<span class='price-unit'>/月額</span>"
    },
    "2": {
      title: "各種SNS運用代行 (月額20万円プラン)",
      desc: "TikTok、Instagram、YouTubeショートを活用した幅広いSNS展開をサポートします。<br><br>【プラン内容】<br>・各SNSの企画立案<br>・プロによる撮影・編集作業<br>・複数プラットフォームへの投稿代行",
      price: "<span class='price-val'>200,000</span>円(税別)<span class='price-unit'>/月額</span>"
    },
    "3": {
      title: "各種SNS運用代行 (月額35万円プラン)",
      desc: "TikTok、Instagram、YouTubeショートを活用し、安定した月間15本の動画投稿を行います。<br><br>【プラン内容】<br>・月動画15本投稿<br>・企画、撮影、編集すべて込み<br>・エンゲージメント分析",
      price: "<span class='price-val'>350,000</span>円(税別)<span class='price-unit'>/月額</span>"
    },
    "4": {
      title: "各種SNS運用代行 (月額60万円プラン)",
      desc: "TikTok、Instagram、YouTubeショートを活用し、圧倒的物量の月間21本の動画投稿で一気にファンを獲得します。<br><br>【プラン内容】<br>・月動画21本投稿<br>・企画、撮影、編集すべて込み<br>・専属ディレクターのアサイン",
      price: "<span class='price-val'>600,000</span>円(税別)<span class='price-unit'>/月額</span>"
    },
    "5": {
      title: "1日の始業〜就業までのルーティン動画制作 (教材)",
      desc: "社内研修や採用活動に最適な、実際の業務風景をまとめた質の高いルーティン動画を制作します。<br><br>【プラン内容】<br>・1日の密着撮影<br>・業務の流れを分かりやすく編集<br>・社員のインタビュー収録",
      price: "<span class='price-val'>300,000</span>円(税別)<span class='price-unit'>/月額</span>"
    },
    "6": {
      title: "会社の教材作ります",
      desc: "企業独自のノウハウや業務マニュアルを、誰でも分かりやすい映像教材としてパッケージ化します。<br><br>【プラン内容】<br>・完全オーダーメイドの教育カリキュラム映像化<br>・複数チャプターの構成と撮影<br>・理解度を高めるテロップとアニメーション編集",
      price: "<span class='price-val'>2,000,000</span>円(税別)〜<span class='price-unit'>/制作費</span>"
    }
  };

  function openModal(serviceId) {
    const data = serviceData[serviceId];
    if (data && serviceModal && serviceModalBody) {
      serviceModalBody.innerHTML = `
        <h3 class="modal-service-title">${data.title}</h3>
        <p class="modal-service-desc">${data.desc}</p>
        <div class="modal-service-price">${data.price}</div>
      `;
      serviceModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Disable scroll
    }
  }

  function closeModal() {
    if (serviceModal) {
      serviceModal.classList.remove('active');
      document.body.style.overflow = ''; // Enable scroll
      setTimeout(() => {
        if (serviceModalBody) serviceModalBody.innerHTML = '';
      }, 300); // clear after animation
    }
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceId = btn.getAttribute('data-service');
      if (serviceId) openModal(serviceId);
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  if (serviceModal) {
    serviceModal.addEventListener('click', (e) => {
      if (e.target === serviceModal) {
        closeModal();
      }
    });
  }
});
