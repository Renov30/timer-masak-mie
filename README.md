# 🍜 MieTime - Timer Masak Mie Instan

Aplikasi timer interaktif untuk memasak mie instan dengan antarmuka yang menarik dan fitur lengkap. Aplikasi web ini membantu Anda memasak mie instan dengan waktu yang tepat sesuai jenis mie yang dipilih.

## ✨ Fitur

- 🎮 **Antarmuka Interaktif** - Navigasi halaman dengan animasi transisi yang halus
- 💬 **Sistem Percakapan** - Dialog interaktif dengan animasi typing effect
- 🍜 **Pilihan Mie Beragam** - 4 jenis mie dengan waktu masak berbeda:
  - Mie Kuah Biasa (3 menit)
  - Mie Setengah Matang (1 menit)
  - Mie Benyek (5 menit)
  - Mie Goyeng (3 menit)
- ⏱️ **Timer Lengkap** - Fitur timer dengan:
  - Countdown timer yang akurat
  - Tombol Pause/Resume
  - Tombol Reset untuk kembali ke menu
  - Notifikasi suara saat timer selesai
- 🎵 **Audio & Sound Effects** - Background music dan sound effects untuk pengalaman yang lebih menyenangkan
- 🎨 **Desain Pixel Art** - UI dengan gaya pixel art yang menarik dan modern
- 📱 **Responsive Design** - Dapat digunakan di berbagai ukuran layar

## 🚀 Cara Menggunakan

### Instalasi

1. Clone repository ini:
```bash
git clone https://github.com/username/timermie.git
cd timermie
```

2. Install dependencies:
```bash
npm install
```

3. Build Tailwind CSS (jika diperlukan):
```bash
npx tailwindcss -i ./src/input.css -o ./output.css --watch
```

4. Buka `index.html` di browser Anda atau gunakan live server:
```bash
# Menggunakan VS Code Live Server
# Atau menggunakan Python
python -m http.server 8000
```

### Penggunaan

1. **Mulai Aplikasi** - Klik tombol "START" di halaman awal
2. **Baca Dialog** - Ikuti percakapan yang muncul dengan menekan tombol "NEXT"
3. **Pilih Jenis Mie** - Gunakan tombol prev/next untuk memilih jenis mie yang ingin dimasak
4. **Mulai Timer** - Klik tombol "SELECT" untuk memulai timer
5. **Kontrol Timer** - Gunakan tombol "PAUSE" untuk menjeda atau "RESET" untuk kembali ke menu

## 📁 Struktur Proyek

```
TimerMie/
├── audio/              # File audio dan sound effects
│   ├── sfx/           # Sound effects (click, select, complete, dll)
│   └── journey.mp3    # Background music
├── img/               # Asset gambar (UI, karakter, dll)
├── src/               # Source file Tailwind CSS
├── index.html         # File HTML utama
├── script.js          # Logika aplikasi JavaScript
├── output.css         # File CSS yang sudah di-compile
├── package.json       # Dependencies dan konfigurasi npm
└── README.md          # Dokumentasi proyek
```

## 🛠️ Teknologi yang Digunakan

- **HTML5** - Struktur halaman web
- **CSS3** - Styling dan animasi
- **JavaScript (Vanilla)** - Logika aplikasi dan interaktivitas
- **Tailwind CSS** - Framework CSS utility-first
- **Google Fonts** - Font Pixelify Sans dan Jersey 20

## 📝 Fitur Detail

### Halaman 1 - Start Page
Halaman awal dengan tombol START untuk memulai aplikasi.

### Halaman 2 & 3 - Dialog Pages
Halaman percakapan dengan animasi typing effect yang menampilkan dialog random tentang mie instan.

### Halaman 4 - Menu Selection
Halaman untuk memilih jenis mie dengan navigasi prev/next dan informasi detail setiap jenis mie.

### Halaman 5 - Timer Page
Halaman timer dengan:
- Countdown timer besar dan mudah dibaca
- Tombol PAUSE/RESUME untuk mengontrol timer
- Tombol RESET untuk kembali ke menu pilihan
- Notifikasi suara saat timer selesai

## 🎨 Customization

### Menambah Jenis Mie Baru

Edit array `noodles` di `script.js`:

```javascript
const noodles = [
  {
    title: "nama mie baru",
    img: "img/noodle-image.png",
    detail: "deskripsi mie",
    time: 180, // waktu dalam detik
  },
  // ... mie lainnya
];
```

### Mengubah Sound Effects

Ganti file audio di folder `audio/sfx/` atau ubah path di `script.js`:

```javascript
const clickSound = new Audio("audio/sfx/click.mp3");
```

### Mengubah Background Music

Ganti file `audio/journey.mp3` atau ubah path di fungsi `next0()`:

```javascript
bgm.src = "audio/journey.mp3";
```

## 📄 Lisensi

Proyek ini menggunakan lisensi ISC.

## 👤 Author

Dibuat dengan ❤️ untuk para pecinta mie instan.

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan buat issue atau pull request jika Anda ingin berkontribusi pada proyek ini.

## 📸 Screenshots

*(Tambahkan screenshot aplikasi di sini jika tersedia)*

## 🐛 Known Issues

- Background music toggle button saat ini di-comment (dapat diaktifkan kembali jika diperlukan)

## 🔮 Future Improvements

- [ ] Tambah lebih banyak jenis mie
- [ ] Fitur notifikasi browser saat timer selesai
- [ ] Mode gelap/terang
- [ ] Simpan riwayat masak
- [ ] Fitur timer kustom
- [ ] PWA support untuk instalasi sebagai aplikasi

---

**Selamat memasak mie! 🍜⏰**

