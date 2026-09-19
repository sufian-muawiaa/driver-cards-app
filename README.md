# سجل بطاقات السائقين — الإصدار 2.3

تطبيق PWA بملف واحد (`index.html`) لمتابعة رحلات السائقين والأعطال والمصاريف والمحاسبة، مع مزامنة لحظية عبر Firebase Firestore.

جديد الإصدار 2.3: عند السداد الجزئي يمكن تحديد من يتحمّل المبلغ المتبقي: يبقى ديناً على السائق (افتراضي) أو يُخصم من حصة الشركة والمعلم.

---

## محتوى المشروع

| الملف | الوظيفة |
|------|----------|
| `index.html` | التطبيق الكامل (واجهة + منطق + تصميم) |
| `manifest.json` | بيانات PWA (الاسم، الأيقونات، اللون) |
| `sw.js` | Service Worker للعمل دون إنترنت |
| `icon-192.png` / `icon-512.png` / `apple-touch-icon.png` | أيقونات التطبيق |
| `netlify.toml` | إعدادات النشر على Netlify |
| `firebase.json` / `firestore.rules` | إعدادات Firebase وقواعد الأمان |
| `.gitignore` | تجاهل الملفات غير اللازمة عند الرفع |

---

## 1️⃣ Firebase (المزامنة)

التطبيق مربوط مسبقاً بمشروع Firebase باسم `saeekeen-62354` (الإعدادات مدمجة داخل `index.html`). لتفعيل المزامنة:

1. ادخل إلى [Firebase Console](https://console.firebase.google.com/) بحسابك ← مشروع `saeekeen-62354`.
2. `Firestore Database` ← إن لم تكن مُفعّلة اضغط **Create database** (اختر أقرب منطقة).
3. تبويب **Rules** ← الصق محتوى ملف `firestore.rules` ثم **Publish**.

> ملاحظة أمان: القواعد الحالية تسمح بالقراءة/الكتابة لمن يعرف رمز القناة فقط (يُدخَل داخل التطبيق). لتشديد الأمان لاحقاً يُفضّل تفعيل Firebase Auth.

(اختياري) لنشر القواعد من سطر الأوامر:
```bash
npm i -g firebase-tools
firebase login
firebase deploy --only firestore:rules --project saeekeen-62354
```

---

## 2️⃣ GitHub (المستودع)

من داخل مجلد المشروع:
```bash
git init
git add .
git commit -m "Driver Cards v2.3 — partial-payment deduction option"
git branch -M main
git remote add origin https://github.com/<اسمك>/driver-cards.git
git push -u origin main
```
أنشئ أولاً مستودعاً جديداً فارغاً باسم `driver-cards` من موقع GitHub.

---

## 3️⃣ Netlify (الاستضافة)

الطريقة الموصى بها (ربط تلقائي مع GitHub):
1. [app.netlify.com](https://app.netlify.com/) ← **Add new site** ← **Import from Git** ← GitHub ← اختر مستودع `driver-cards`.
2. اترك **Build command** فارغاً، و**Publish directory** = `.` (يُقرأ تلقائياً من `netlify.toml`).
3. **Deploy** ← ستحصل على رابط مثل `https://<اسم>.netlify.app`.

أو الطريقة السريعة (سحب وإفلات): افتح [app.netlify.com/drop](https://app.netlify.com/drop) واسحب مجلد المشروع كاملاً.

> مهم: بعد النشر، أضف نطاق Netlify إلى Firebase Console ← Authentication ← Settings ← **Authorized domains** (إن فعّلت المصادقة لاحقاً).

---

## 4️⃣ التصدير إلى أندرويد (APK)

بعد نجاح النشر على Netlify والحصول على رابط https ثابت، يُغلّف التطبيق كـ APK بإحدى طريقتين:
- **PWABuilder** (الأسهل): أدخل رابط Netlify في [pwabuilder.com](https://www.pwabuilder.com/) ← Package for Android.
- **TWA / Bubblewrap**: للرفع على Google Play.

---

**المطوّر:** المهندس عثمان إسماعيل
