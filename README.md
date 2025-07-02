# Yenilmez Tic-Tac-Toe Oyunu

Bu proje, HTML, CSS ve JavaScript kullanılarak oluşturulmuş basit bir Tic-Tac-Toe oyunudur. Oyunun en dikkat çekici özelliği, yenilmesi imkansız bir yapay zeka botuna karşı oynamanıza olanak tanımasıdır. Bot, en iyi hamleyi hesaplamak için minimax algoritmasını kullanır.

## Özellikler

- Klasik 3x3 Tic-Tac-Toe oyun alanı
- Minimax algoritması sayesinde yenilmesi imkansız yapay zeka
- Basit ve anlaşılır kullanıcı arayüzü
- Oyunun durumunu (kazanan, berabere) gösteren bildirimler

## Nasıl Oynanır?

1. Bu projeyi bilgisayarınıza klonlayın veya indirin.
2. `index.html` dosyasını herhangi bir modern web tarayıcısında açın.
3. Oynamak için boş bir kareye tıklayın. Siz 'X'siniz, bot ise 'O'.

## Kullanılan Teknolojiler

- HTML5
- CSS3
- JavaScript (ES6+)

## Bot Nasıl Çalışır?

Bu oyundaki bot, "yenilmez" olmasını **Minimax** algoritmasına borçludur. Minimax, iki oyunculu (karşıt) oyunlarda, bir sonraki hamlenin potansiyel sonuçlarını analiz ederek en optimal hamleyi bulmaya yarayan bir karar verme algoritmasıdır. Bot, olası her hamleyi ve rakibin (sizin) verebileceği her karşılığı bir ağaç yapısı üzerinde değerlendirir. Kendi kazanma olasılığını en üst düzeye çıkarırken, sizin kazanma olasılığınızı en aza indiren yolu seçer. Bu nedenle, eğer bir kazanma yolu varsa bot mutlaka o yolu bulur ve eğer yenilme ihtimali varsa mutlaka bunu engeller. Sonuç olarak, en iyi ihtimalle botla berabere kalabilirsiniz.
