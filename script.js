const clickSound = new Audio("audio/sfx/click.mp3");
const selectSound = new Audio("audio/sfx/select.mp3");
const pauseSound = new Audio("audio/sfx/toggle.mp3");
const startSound = new Audio("audio/sfx/start-sound.mp3");
// const tickSound = new Audio("audio/sfx/tick-tock.mp3");
const finishSound = new Audio("audio/sfx/complete.mp3");
// script bicara untuk animasi hal 1
// variabel hal 1 dan 2
const hal1 = document.getElementById("hal1");
const hal2 = document.getElementById("hal2");
const textHal1 = document.getElementById("textHal1");
const talkView = document.getElementById("talkview");
const startPage = document.getElementById("startPage");

let bgmPlaying = false;

function next0() {
  startSound.currentTime = 0;
  startSound.play();

  setTimeout(() => {
    startPage.classList.add("exit-left");
    startPage.classList.remove("active");
  }, 700);

  hal1.classList.remove("hidden");
  // Tambahkan delay sedikit agar transisi bisa terpicu
  setTimeout(() => {
    hal1.classList.add("active");
    typeText(chooseConversation[indexConversationHal1]);

    if (!bgmPlaying) {
      if (!bgm.src) {
        bgm.src = "audio/journey.mp3"; // set sumber BGM
        bgm.type = "audio/mpeg";
      }
      bgm.loop = true; // supaya lagu ngulang terus
      bgm.volume = 0.5; // biar nggak terlalu kencang
      bgm.play();
      toggleBtn.textContent = "🔈";
      bgmPlaying = true;
    }
  }, 950);

  // Setelah animasi selesai, sembunyikan hal2
  setTimeout(() => {
    startPage.classList.add("hidden");
    startPage.classList.remove("exit-left");
  }, 1600); // sesuai durasi transition
}

// sembunyikan talkview
talkView.style.opacity = 0;

// variabel array pembicaraan animasi hal 1
const conversation = [
  [
    "makan mie instan lagi?",
    "you know.. you really should eat something else",
    "i mean, look at you",
  ],
  [
    "mie trooss...",
    "what? are you trying to save money to buy an iphone?",
    ".. not worth it pal",
  ],
  [
    "udah berapa kali lu makan mie bulan ini?",
    "i don't know who you are, but i'll eat some more vegies if i were you",
    "you don't want gerd don't you",
  ],
];
// pilih conversation dari array: hasilkan angka random dikali jumlah array, jadi karena array (3) maka angka random 0-0.99 dikali 1-3 = contoh hasilnya 0.7 = 1
const chooseConversation =
  conversation[Math.floor(Math.random() * conversation.length)];

// variabel untuk selalu pilih urutan percakapan pertama dalam array
// pakai let biar bisa diubah nilainya, dikasih 0 biar dipilih yang paling awal
let indexConversationHal1 = 0;

// buat objek audio global biar bisa dipakai ulang
const typingSound = new Audio("audio/soft-hit-2.wav");
typingSound.volume = 0.1; // atur volume biar nggak berisik

// fungsi untuk memutar ulang suara tiap huruf
function playTypingSound() {
  // kloning audio biar bisa overlap antar huruf (tanpa delay)
  const sound = typingSound.cloneNode();
  sound.play();
}

// fungsi animasi ngetik teks
function typeText(text, callback) {
  textHal1.textContent = "";
  talkView.classList.add("hidden-talk"); // sembunyikan & matikan animasi

  let i = 0;
  const speed = 40;

  const typing = setInterval(() => {
    if (i < text.length) {
      textHal1.textContent += text.charAt(i);
      playTypingSound();
      i++;
    } else {
      clearInterval(typing);
      // tunggu sedikit lalu tampilkan segitiga
      setTimeout(() => {
        talkView.classList.remove("hidden-talk"); // tampilkan + aktifkan animasi lagi
      }, 200);
      if (callback) callback();
    }
  }, speed);
}
// tampilkan text dimana conversation yang dipilih dengan urutan teks yang pertama (tapi dalam animasi typing)
// typeText(chooseConversation[indexConversationHal1]);

// fungsi ganti ke urutan percakapan selanjutnya
function next1() {
  clickSound.currentTime = 0;
  clickSound.play();

  // pastikan animasi ngetik selesai sebelum lanjut
  if (textHal1.textContent !== chooseConversation[indexConversationHal1])
    return;

  // kalau urutannya lebih kecil dari panjang conversation yang dipilih contoh 3 maka dia dikurang 1 karena mulainya dari 0
  if (indexConversationHal1 < chooseConversation.length - 1) {
    // tambah nilai untuk ganti urutan
    indexConversationHal1++;

    // masukan ke html (dengan animasi typing)
    typeText(chooseConversation[indexConversationHal1]);
  } else {
    hal2.classList.remove("hidden");
    hal2.classList.add("active");
    hal1.classList.add("hidden");

    // mulai animasi typing di hal2
    typeTextHal2(textHal2Content);
  }
}
// elemen-elemen halaman 2
const hal3 = document.getElementById("hal3"); // misal nanti kamu punya hal3
const textHal2 = document.getElementById("textHal2");
const talkView2 = document.getElementById("talkview2");

// teks halaman 2
const textHal2Content = "anyway, kamu mau masak mie apa hari ini?";

// fungsi animasi ngetik untuk hal2
function typeTextHal2(text, callback) {
  textHal2.textContent = "";
  talkView2.classList.add("hidden-talk"); // sembunyikan segitiga

  let i = 0;
  const speed = 40;

  const typing = setInterval(() => {
    if (i < text.length) {
      textHal2.textContent += text.charAt(i);
      playTypingSound();
      i++;
    } else {
      clearInterval(typing);
      setTimeout(() => {
        talkView2.classList.remove("hidden-talk"); // tampilkan segitiga
      }, 200);
      if (callback) callback();
    }
  }, speed);
}

// fungsi ganti hal2 ke hal3
function next2() {
  clickSound.currentTime = 0;
  clickSound.play();

  // Mulai animasi keluar ke kiri untuk hal2
  hal2.classList.add("exit-left");
  hal2.classList.remove("active");

  // Tampilkan hal3 tapi posisinya masih di luar layar kanan
  hal3.classList.remove("hidden");

  // Tambahkan delay sedikit agar transisi bisa terpicu
  setTimeout(() => {
    hal3.classList.add("active");
  }, 50);

  // Setelah animasi selesai, sembunyikan hal2
  setTimeout(() => {
    hal2.classList.add("hidden");
    hal2.classList.remove("exit-left");
  }, 600); // sesuai durasi transition
}

// script untuk pilih menu hal 3
// variabel object informasi mie
const noodles = [
  {
    title: "mie kuah biasa",
    img: "img/noodle1.png",
    detail: "waktu masak 3 menit. cocok buat kamu yang suka mie kuah.",
    time: 180,
  },
  {
    title: "mie setengah matang",
    img: "img/noodle2mck.png",
    detail: "waktu masak 1 menit. boleh dicoba kalau kamu anti mainstream.",
    time: 60,
  },
  {
    title: "mie benyek",
    img: "img/noodle1.png",
    detail: "waktu masak 5 menit. cocok kalau kamu orangnya aneh.",
    time: 300,
  },
  {
    title: "mie goyeng",
    img: "img/noodle3mck.png",
    detail: "waktu masak 3 menit. cocok kalau kamu suka yang kering.",
    time: 180,
  },
];
// variabel mie ke berapa
let mieIndex = 0;
// variabel komponen informasi mie
const titleNoodle = document.getElementById("title");
const imgNoodle = document.getElementById("noodleImg");
const detailNoodle = document.getElementById("detail");
const prev = document.getElementById("prevBtn");
const next = document.getElementById("nextBtn");
// fungsi ganti mie
function gantiMie() {
  const mie = noodles[mieIndex];
  titleNoodle.textContent = mie.title;
  imgNoodle.src = mie.img;
  detailNoodle.textContent = mie.detail;
}

function animateMie(direction) {
  clickSound.currentTime = 0;
  clickSound.play();

  const oldImg = imgNoodle;

  // tentukan animasi arah
  const outClass = direction === "next" ? "slide-out-left" : "slide-out-right";
  const inClass = direction === "next" ? "slide-in-right" : "slide-in-left";

  // animasi keluar
  oldImg.classList.add(outClass);

  // setelah animasi keluar selesai
  setTimeout(() => {
    // ubah data mie
    const mie = noodles[mieIndex];
    oldImg.src = mie.img;
    titleNoodle.textContent = mie.title;
    detailNoodle.textContent = mie.detail;

    // hapus animasi keluar, tambahkan animasi masuk
    oldImg.classList.remove(outClass);
    oldImg.classList.add(inClass);

    // setelah animasi masuk selesai, bersihkan class
    setTimeout(() => {
      oldImg.classList.remove(inClass);
    }, 400);
  }, 400);
}

// event listener kalau tombol next ditekan
next.addEventListener("click", () => {
  // tambah index untuk ganti mie
  mieIndex = (mieIndex + 1) % noodles.length;
  animateMie("next");
  // gantiMie();
});
// event listener kalau tombol prev ditekan
prev.addEventListener("click", () => {
  // kurangi index kemudian tambahkan dengan jumlah objek di satu array
  mieIndex = (mieIndex - 1 + noodles.length) % noodles.length;
  // gantiMie();
  animateMie("prev");
});
// inisialisai
gantiMie();

// script halaman timer
const hal4 = document.getElementById("hal4");
// variabel untuk tampilkan timer
const timerDisplay = hal4.querySelector("h1");
// variabel tombol pause dan reset
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

// variabel untuk timer
let countDown = null;
// variabel waktu tersisa
let timeLeft = 0;
// variabel di pause atau tidak
let isPaused = false;

// fungsi update tampilan timer/ update angkanya
function updateTimerDisplay(seconds) {
  // variabel untuk menit
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  // variabel untuk detik
  const sec = String(seconds % 60).padStart(2, "0");
  // tampilkan di h1
  timerDisplay.textContent = `${min}:${sec}`;
}

// fungsi tick, fungsi yang dijalankan setiap detik
function tick() {
  if (isPaused) return;
  // kurangi nilai timeleft sebanyak 1 kali setiap interval berjalan
  timeLeft--;
  // panggil update
  updateTimerDisplay(timeLeft);
  // jika timeleft kurang dari 0 tampilkan selesai
  if (timeLeft <= 0) {
    clearInterval(countDown);
    timerDisplay.textContent = "SELESAI!";

    finishSound.currentTime = 0;
    finishSound.loop = true;
    finishSound.play();
  }
}

// fungsi mulai timer
function startTimer() {
  selectSound.currentTime = 0;
  selectSound.play();

  // sembunyikan hal 3 tampilkan hal 4
  hal3.classList.add("exit-left");
  hal3.classList.remove("active");

  hal4.classList.remove("hidden");

  setTimeout(() => {
    hal4.classList.add("active");
  }, 50);

  setTimeout(() => {
    hal3.classList.add("hidden");
    hal3.classList.remove("exit-left");
  }, 600); // sesuai durasi transition

  // bersihkan interval variabel untuk timer kalau ada
  clearInterval(countDown);
  // ambil waktu dari object mie yang dipilih
  timeLeft = noodles[mieIndex].time;
  // tampilkan waktu di awal (kirim timeleft ke updatetimerdisplay)
  updateTimerDisplay(timeLeft);

  // kalau tidak pause maka jalankan interval
  isPaused = false;
  countDown = setInterval(tick, 1000);
}

// event listener tombol pause dan reset
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", gotoMenu);

// fungsi pause timer
function pauseTimer() {
  pauseSound.currentTime = 0;
  pauseSound.play();

  // toggle pause/resume (bolak balik)
  isPaused = !isPaused;
  // ganti text di tombol
  pauseBtn.querySelector("p").textContent = isPaused ? "RESUME" : "PAUSE";
}

// fungsi reset timer
// function resetTimer() {
//   pauseSound.currentTime = 0;
//   pauseSound.play();

//   clearInterval(countDown);
//   timeLeft = noodles[mieIndex].time;
//   updateTimerDisplay(timeLeft);
//   isPaused = false;
//   pauseBtn.querySelector("p").textContent = "PAUSE";
//   countDown = setInterval(tick, 1000);
// }

// const menuBtn = document.getElementById("menuBtn");
// menuBtn.addEventListener("click", gotoMenu);

function gotoMenu() {
  pauseSound.currentTime = 0;
  pauseSound.play();

  hal4.classList.add("exit-right");
  hal4.classList.remove("active");

  hal3.classList.remove("hidden");
  hal3.style.transform = "translateX(-100%)"; // mulai dari luar kiri

  setTimeout(() => {
    hal3.classList.add("active");
  }, 50);

  setTimeout(() => {
    hal4.classList.add("hidden");
    hal4.classList.remove("exit-right");
    hal3.style.transform = ""; // reset inline transform
  }, 600); // sesuai durasi transition
}

// const toggleBtn = document.getElementById("toggleBGM");
// const bgm = document.getElementById("bgm");

// toggleBtn.addEventListener("click", () => {
//   clickSound.currentTime = 0;
//   clickSound.play();

//   if (!bgmPlaying) {
//     if (!bgm.src) {
//       bgm.src = "audio/journey.mp3"; // baru di-set ketika tombol ditekan
//       bgm.type = "audio/mpeg";
//     }
//     bgm.play();
//     toggleBtn.textContent = "🔈";
//   } else {
//     bgm.pause();
//     toggleBtn.textContent = "🔇";
//   }
//   bgmPlaying = !bgmPlaying;
// });
