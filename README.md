# MieTime

MieTime adalah aplikasi timer berbasis web yang dirancang untuk membantu memasak mie instan dengan sempurna. Aplikasi ini menampilkan antarmuka interaktif dengan estetika pixel art, timer standar untuk berbagai jenis mie, dan integrasi audio untuk pengalaman pengguna yang lebih baik.

## Ringkasan

Aplikasi ini memberikan pengalaman yang terpandu, dimulai dengan pengenalan interaktif yang menuju ke layar pemilihan menu. Pengguna dapat memilih dari berbagai jenis penyajian mie, masing-masing dengan durasi memasak yang spesifik. Antarmuka timer menyediakan kontrol standar termasuk fungsi jeda (pause), lanjutkan (resume), dan atur ulang (reset).

## Fitur Utama

- **Antarmuka Interaktif**: Transisi halaman yang halus dan tata letak responsif yang cocok untuk perangkat seluler dan desktop.
- **Konten Dinamis**: Sistem dialog yang menarik dengan efek animasi pengetikan.
- **Timer Terdefinisi**: Waktu memasak bawaan untuk berbagai jenis penyajian:
  - Mie Rebus Biasa (3 menit)
  - Mie Setengah Matang (1 menit)
  - Mie Benyek (5 menit)
  - Mie Goreng (3 menit)
- **Umpan Balik Audio**: Musik latar dan efek suara untuk interaksi pengguna dan penyelesaian timer.
- **Optimasi Performa**: Mengimplementasikan lazy loading dan pengiriman aset yang dioptimalkan untuk waktu muat yang cepat.

## Stack Teknologi

- **HTML5**: Markup semantik dan struktur.
- **CSS3**: Penataan gaya ditangani melalui **Tailwind CSS** untuk desain utility-first dan animasi kustom.
- **JavaScript**: Vanilla ES6+ untuk logika aplikasi, manipulasi DOM, manajemen state, dan penanganan aset.

## Instalasi

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1.  **Clone repositori**

    ```bash
    git clone https://github.com/username/timermie.git
    cd timermie
    ```

2.  **Instal dependensi**

    ```bash
    npm install
    ```

3.  **Build CSS**
    Generate output Tailwind CSS:

    ```bash
    npx tailwindcss -i ./src/input.css -o ./output.css --watch
    ```

4.  **Jalankan aplikasi**
    Buka `index.html` di browser web atau jalankan menggunakan server pengembangan lokal:
    ```bash
    # Contoh menggunakan Python
    python -m http.server 8000
    ```

## Panduan Penggunaan

1.  **Mulai**: Klik tombol "START" di halaman awal untuk memulai.
2.  **Navigasi**: Ikuti dialog pengenalan menggunakan tombol "NEXT".
3.  **Pemilihan**: Di tampilan menu, telusuri jenis mie menggunakan panah navigasi atau Tampilan Grid (Grid View).
4.  **Timer**: Klik "SELECT" untuk memulai hitung mundur. Gunakan "PAUSE" untuk menghentikan timer dan "RESET" untuk kembali ke menu.

## Struktur Proyek

```text
TimerMie/
├── audio/          # Aset suara (sfx, musik latar)
├── img/            # Grafis dan ikon
├── src/            # File sumber CSS
├── index.html      # Titik masuk aplikasi utama
├── script.js       # Logika inti aplikasi
├── output.css      # CSS yang telah dikompilasi
└── README.md       # Dokumentasi proyek
```

## Kustomisasi

### Menambah Menu Baru

Untuk menambahkan jenis mie baru, perbarui objek array `noodles` di `script.js`:

```javascript
{
  title: "Jenis Mie Baru",
  img: "img/path-ke-gambar.png",
  detail: "Deskripsi menu tersebut.",
  time: 180 // Durasi dalam detik
}
```

### Konfigurasi Audio

File audio terletak di direktori `audio/`. Format yang valid termasuk MP3 dan WAV. Referensi dapat diperbarui di konstanta file `script.js`.

## Lisensi

Proyek ini dilisensikan di bawah Lisensi ISC.
