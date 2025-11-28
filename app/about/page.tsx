'use client'

import Link from 'next/link'
import PersianPattern from '@/components/PersianPattern'
import { useLayout } from '@/components/LayoutContext'

export default function AboutPage() {
  const { language } = useLayout()
  const isFa = language === 'fa'

  return (
    <div className="min-h-screen bg-cream">
      {/* Page Header */}
      <header className={`max-w-[720px] mx-auto px-6 pt-16 pb-10 text-center ${isFa ? 'font-persian' : ''}`}>
        <span className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-burgundy mb-4 block">
          {isFa ? 'مأموریت ما' : 'The Mission'}
        </span>
        <h1 className={`text-4xl md:text-5xl font-display font-bold text-charcoal mb-6 ${isFa ? 'font-persian' : ''}`}>
          {isFa ? 'درباره HER iran' : 'About HER iran'}
        </h1>
        <div className="flex justify-center mb-6">
          <PersianPattern variant="divider" className="w-48 h-6 text-burgundy" opacity={0.3} />
        </div>
      </header>

      {/* Page Content */}
      <div className={`max-w-[720px] mx-auto px-6 pb-16 ${isFa ? 'font-persian' : ''}`}>
        <div className="prose prose-lg md:prose-xl">
          {isFa ? (
            <>
              <p className="lead font-persian">
                این <strong>HER iran</strong> است — یک پلتفرم ناشناس که من، یک زن ایرانی ساکن ایران، دیدگاهم را درباره زندگی، سیاست، جامعه و واقعیت‌های روزمره زندگی زیر این رژیم به اشتراک می‌گذارم.
              </p>

              <h2 className="font-persian">چرا این وبلاگ وجود دارد</h2>
              <p className="font-persian">
                داستان‌هایی که درباره ایران می‌شنوید اغلب فیلتر شده، سیاسی یا ناقص هستند. من می‌نویسم تا چیزی صادقانه‌تر ارائه دهم: نگاهی مستقیم و بدون فیلتر به زندگی اینجا — مبارزات، زیبایی‌ها، تضادها و حقایقی که به تیتر اخبار بین‌المللی نمی‌رسند.
              </p>
              <p className="font-persian">
                من برای امنیت خودم و اطرافیانم ناشناس می‌مانم. این یک انتخاب نیست؛ یک ضرورت است.
              </p>

              <div className="my-10 p-6 bg-sand border-r-4 border-burgundy" dir="rtl">
                <h3 className="mt-0 text-xl font-display font-bold text-charcoal font-persian">ساختار پلتفرم</h3>
                <ul className="mb-0 font-persian">
                  <li><strong>مقالات</strong> — تأملات عمیق‌تر درباره جامعه ایران.</li>
                  <li><strong>اخبار</strong> — به‌روزرسانی‌های آنی از رویدادها.</li>
                  <li><strong>شخصی</strong> — نگاه‌های صمیمی به زندگی روزمره.</li>
                </ul>
              </div>

              <h2 className="font-persian">چگونه حمایت کنید</h2>
              <p className="font-persian">
                بهترین راه حمایت از این پلتفرم <strong>خواندن، به اشتراک گذاشتن با احتیاط و تقویت این صداها</strong> است. اگر محتوایی از این سایت را به اشتراک می‌گذارید، لطفاً از طریق کانال‌های امن این کار را انجام دهید و مراقب باشید چه کسی ممکن است در معرض خطر قرار گیرد.
              </p>

              <hr />

              <div className="flex flex-col md:flex-row items-center justify-between bg-charcoal text-cream p-6 rounded-sm not-prose">
                <div>
                  <h3 className="font-display text-xl font-bold mb-2 text-cream font-persian">تماس امن</h3>
                  <p className="font-sans text-sm text-cream/70 mb-4 md:mb-0 font-persian">
                    ارتباط رمزگذاری شده توصیه می‌شود.
                  </p>
                </div>
                <a 
                  href="mailto:heriran@protonmail.com"
                  className="px-6 py-3 bg-cream text-charcoal font-sans font-bold text-xs uppercase tracking-widest hover:bg-burgundy hover:text-white transition-colors"
                >
                  ایمیل
                </a>
              </div>
            </>
          ) : (
            <>
              <p className="lead">
                This is <strong>HER iran</strong> — an anonymous editorial platform where I, an Iranian woman living inside Iran, share my perspective on life, politics, society, and the everyday reality of living under this regime.
              </p>

              <h2>Why This Blog Exists</h2>
              <p>
                The stories you hear about Iran are often filtered, politicized, or incomplete. I write to offer something more honest: a direct, unfiltered look at life here — the struggles, the beauty, the contradictions, and the truths that don&apos;t make international headlines.
              </p>
              <p>
                I remain anonymous for my safety and the safety of those around me. This is not a choice; it is a necessity.
              </p>

              <div className="my-10 p-6 bg-sand border-l-4 border-burgundy">
                <h3 className="mt-0 text-xl font-display font-bold text-charcoal">Platform Structure</h3>
                <ul className="mb-0">
                  <li><strong>Essays</strong> — Longer reflections on Iranian society.</li>
                  <li><strong>Breaking News</strong> — Real-time updates on events.</li>
                  <li><strong>Personal</strong> — Intimate glimpses into daily life.</li>
                </ul>
              </div>

              <h2>How to Support</h2>
              <p>
                The best way to support this platform is to <strong>read, share carefully, and amplify these voices</strong>. If you share content from this site, please do so through secure channels and be mindful of who might be put at risk.
              </p>

              <hr />

              <div className="flex flex-col md:flex-row items-center justify-between bg-charcoal text-cream p-6 rounded-sm not-prose">
                <div>
                  <h3 className="font-display text-xl font-bold mb-2 text-cream">Secure Contact</h3>
                  <p className="font-sans text-sm text-cream/70 mb-4 md:mb-0">
                    Encrypted communication is recommended.
                  </p>
                </div>
                <a 
                  href="mailto:heriran@protonmail.com"
                  className="px-6 py-3 bg-cream text-charcoal font-sans font-bold text-xs uppercase tracking-widest hover:bg-burgundy hover:text-white transition-colors"
                >
                  Email Me
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Fixed Back Navigation */}
      <div className="fixed bottom-8 right-8 z-40 hidden md:block">
        <Link 
          href="/"
          className="flex items-center justify-center w-12 h-12 bg-white shadow-md rounded-full text-charcoal hover:text-burgundy hover:scale-110 transition-all"
          aria-label={isFa ? 'بازگشت به خانه' : 'Back to Home'}
        >
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
