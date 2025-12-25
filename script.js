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

const nextBtnHal1 = document.getElementById("nextBtnHal1");
const nextBtnHal2 = document.getElementById("nextBtnHal2");

let bgmPlaying = false;
let typingInterval; // Global variable to control typing animation
const skipBtn = document.getElementById("skipBtn");
const bgm = document.getElementById("bgm"); // Fix: bgm variable harus didefinisikan

function next0() {
  startSound.currentTime = 0;
  startSound.play();

  setTimeout(() => {
    startPage.classList.add("exit-left");
    startPage.classList.remove("active");
    // Show skip button with animation
    skipBtn.classList.remove("hidden");
    skipBtn.classList.add("fade-in");
    setTimeout(() => skipBtn.classList.remove("fade-in"), 500);
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
      bgm.play().catch((err) => {
        // Fix: Handle autoplay policy errors
        console.warn("BGM autoplay blocked:", err);
      });
      // toggleBtn.textContent = "🔈"; // Fix: toggleBtn tidak digunakan (commented out)
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
    "waduh, lu kayaknya udah jadi bagian dari keluarga indomie nih",
    "coba deh sesekali makan sayur, biar perut lu nggak jadi pabrik MSG",
  ],
  [
    "mie trooss...",
    "hah? lu ngehemat buat beli iPhone ya?",
    "tapi kesehatan lu lebih mahal loh, sayang kalau cuma buat beli mie terus",
  ],
  [
    "udah berapa kali lu makan mie bulan ini?",
    "kalau diitung mungkin udah lebih banyak dari jumlah hari dalam sebulan",
    "jangan sampe GERD nempel terus di perut lu, nanti repot sendiri",
  ],
  [
    "mie lagi?",
    "lu kayaknya lebih setia sama mie daripada sama pacar",
    "coba deh variasi dikit, sayur-sayuran juga enak loh",
  ],
  [
    "wah, masih mie nih",
    "kalau terus-terusan begini, nanti darah lu jadi bumbu mie",
    "mending sekali-kali makan nasi, biar ada variasi",
  ],
  [
    "mie instan lagi ya?",
    "lu kayaknya udah jadi influencer mie instan tanpa sadar",
    "tapi influencer yang sehat lebih keren, coba deh makan buah",
  ],
  [
    "hmm, mie lagi?",
    "kalau ada olimpiade makan mie, lu pasti juara dunia",
    "tapi juara dunia kesehatan juga penting, jangan lupa sayur",
  ],
  [
    "mie terus-terusan nih",
    "lu kayaknya lebih kenal sama berbagai merk mie daripada nama tetangga",
    "coba deh kenalan sama sayur-sayuran, mereka juga teman yang baik",
  ],
  [
    "waduh, mie lagi?",
    "kalau terus begini, nanti dokter lu bakal kasih resep mie instan",
    "tapi serius, variasi makanan itu penting, coba deh yang lain",
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

  // 🔸 Kalau tombol sedang terlihat, kasih efek fade-out dulu
  if (!nextBtnHal1.classList.contains("invisible")) {
    nextBtnHal1.classList.remove("fade-in");
    nextBtnHal1.classList.add("fade-out");

    setTimeout(() => {
      nextBtnHal1.classList.add("invisible");
      nextBtnHal1.classList.remove("fade-out");
    }, 400); // waktu fade-out (harus sama dgn CSS)
  }

  let i = 0;
  const speed = 40;

  // Fix: Clear any existing interval before starting new one
  if (typingInterval) {
    clearInterval(typingInterval);
    typingInterval = null;
  }

  typingInterval = setInterval(() => {
    if (i < text.length) {
      textHal1.textContent += text.charAt(i);
      playTypingSound();
      i++;
    } else {
      clearInterval(typingInterval);
      typingInterval = null; // Fix: Reset interval variable
      // tunggu sedikit lalu tampilkan segitiga
      setTimeout(() => {
        talkView.classList.remove("hidden-talk"); // tampilkan + aktifkan animasi lagi

        nextBtnHal1.classList.remove("invisible");
        nextBtnHal1.classList.add("fade-in"); // animasi fade-in untuk tombol NEXT

        // hapus animasi class setelah selesai biar bisa dipakai lagi nanti
        setTimeout(() => {
          nextBtnHal1.classList.remove("fade-in");
        }, 500);
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

  // Fix: Pastikan animasi ngetik selesai sebelum lanjut
  // Juga cek apakah typingInterval masih berjalan
  if (
    typingInterval ||
    textHal1.textContent !== chooseConversation[indexConversationHal1]
  ) {
    return;
  }

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
  nextBtnHal2.classList.add("invisible");
  talkView2.classList.add("hidden-talk"); // sembunyikan segitiga

  let i = 0;
  const speed = 40;

  // Fix: Clear any existing interval before starting new one
  if (typingInterval) {
    clearInterval(typingInterval);
    typingInterval = null;
  }

  typingInterval = setInterval(() => {
    if (i < text.length) {
      textHal2.textContent += text.charAt(i);
      playTypingSound();
      i++;
    } else {
      clearInterval(typingInterval);
      typingInterval = null; // Fix: Reset interval variable
      setTimeout(() => {
        talkView2.classList.remove("hidden-talk"); // tampilkan segitiga

        nextBtnHal2.classList.remove("invisible");
        nextBtnHal2.classList.add("fade-in"); // animasi fade-in untuk tombol NEXT

        // hapus animasi class setelah selesai biar bisa dipakai lagi nanti
        setTimeout(() => {
          nextBtnHal2.classList.remove("fade-in");
        }, 500);
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

  // Hide skip button with animation
  skipBtn.classList.add("fade-out");
  setTimeout(() => {
    skipBtn.classList.add("hidden");
    skipBtn.classList.remove("fade-out");
  }, 500);

  // Show back button with animation
  const backBtn = document.getElementById("backBtn");
  backBtn.classList.remove("hidden");
  backBtn.classList.add("fade-in");
  setTimeout(() => backBtn.classList.remove("fade-in"), 500);

  // Show toggle view button with animation
  const toggleViewBtn = document.getElementById("toggleViewBtn");
  toggleViewBtn.classList.remove("hidden");
  toggleViewBtn.classList.add("fade-in");
  setTimeout(() => toggleViewBtn.classList.remove("fade-in"), 500);

  // Tampilkan hal3 tapi posisinya masih di luar layar kanan
  hal3.classList.remove("hidden");

  // Tambahkan delay sedikit agar transisi bisa terpicu
  setTimeout(() => {
    hal3.classList.add("active");
    updateMenuView(); // Update tampilan menu
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
    title: "mie rebus biasa",
    img: "img/gambar mie no bg/mie1.png",
    detail: "3 menit. cocok buat kamu yang suka mie kuah.",
    time: 180,
  },
  {
    title: "mie goreng biasa",
    img: "img/gambar mie no bg/mie2.png",
    detail: "3 menit. cocok kalau kamu suka yang kering.",
    time: 180,
  },
  {
    title: "mie mentah",
    img: "img/gambar mie no bg/mie3.png",
    detail: "0 menit. untuk yang suka mie mentah.",
    time: 0,
  },
  {
    title: "mie setengah matang",
    img: "img/gambar mie no bg/mie4.png",
    detail: "1 menit. boleh dicoba kalau kamu anti mainstream.",
    time: 60,
  },
  {
    title: "mie benyek",
    img: "img/gambar mie no bg/mie6.png",
    detail: "5 menit. kalau kamu suka mie yang benyek.",
    time: 300,
  },
  {
    title: "spaghetti",
    img: "img/gambar mie no bg/mie7.png",
    detail: "10 menit. lho ini bukan mie instan.",
    time: 600,
  },
];
// variabel mie ke berapa
let mieIndex = 0;
// variabel untuk tracking view mode (single/grid)
let isGridView = false;
// variabel komponen informasi mie
const titleNoodle = document.getElementById("title");
const imgNoodle = document.getElementById("noodleImg");
const detailNoodle = document.getElementById("detail");
const prev = document.getElementById("prevBtn");
const next = document.getElementById("nextBtn");
const singleView = document.getElementById("singleView");
const gridView = document.getElementById("gridView");
const toggleViewBtn = document.getElementById("toggleViewBtn");
const toggleViewText = document.getElementById("toggleViewText");

// fungsi ganti mie
function gantiMie() {
  const mie = noodles[mieIndex];
  titleNoodle.textContent = mie.title;
  imgNoodle.src = mie.img;
  detailNoodle.textContent = mie.detail;
  // Update grid view selection jika grid view aktif
  if (isGridView) {
    updateGridSelection();
  }
}

// fungsi untuk generate grid view
function generateGridView() {
  const gridContainer = gridView.querySelector(".grid");
  gridContainer.innerHTML = ""; // Clear existing items

  noodles.forEach((mie, index) => {
    const gridItem = document.createElement("div");
    gridItem.className = `grid-item ${index === mieIndex ? "selected" : ""}`;
    gridItem.innerHTML = `
      <div class="grid-item-card ${
        index === mieIndex ? "selected" : ""
      }" onclick="selectMieFromGrid(${index})">
        <img src="${mie.img}" alt="${mie.title}" class="grid-item-img" />
        <p class="pixelify-unresponsive grid-item-title text-white font-bold">${
          mie.title
        }</p>
        <p class="pixelify grid-item-detail text-white">${mie.detail}</p>
      </div>
    `;
    gridContainer.appendChild(gridItem);
  });
}

// fungsi untuk select mie dari grid
function selectMieFromGrid(index) {
  mieIndex = index;
  updateGridSelection();
  gantiMie();
  startTimer();
}

// fungsi untuk update selection di grid view
function updateGridSelection() {
  const gridItems = gridView.querySelectorAll(".grid-item");
  const gridCards = gridView.querySelectorAll(".grid-item-card");

  gridItems.forEach((item, index) => {
    if (index === mieIndex) {
      item.classList.add("selected");
      gridCards[index].classList.add("selected");
    } else {
      item.classList.remove("selected");
      gridCards[index].classList.remove("selected");
    }
  });
}

// fungsi untuk toggle antara single dan grid view
function toggleMenuView() {
  clickSound.currentTime = 0;
  clickSound.play();

  // Prevent multiple clicks during animation if needed, but for now just toggle
  // Ideally, we should check if animation is in progress, but simple implementation first:
  const toggleViewBtn = document.getElementById("toggleViewBtn");
  if (toggleViewBtn.style.pointerEvents === "none") return;

  // Disable button during animation
  toggleViewBtn.style.pointerEvents = "none";
  setTimeout(() => {
    toggleViewBtn.style.pointerEvents = "auto";
  }, 1000); // 500ms fadeOut + 500ms fadeIn

  isGridView = !isGridView;
  updateMenuView(true);
}

// fungsi untuk update tampilan menu berdasarkan isGridView
function updateMenuView(animate = false) {
  if (animate) {
    const currentView = isGridView ? singleView : gridView;
    const nextView = isGridView ? gridView : singleView;
    const btnText = isGridView ? "Single" : "Grid";

    // 1. Animate Out Current View
    currentView.classList.add("fade-out");

    setTimeout(() => {
      // 2. Hide Current View
      currentView.classList.add("hidden");
      currentView.style.display = "none";
      currentView.classList.remove("fade-out");

      // 3. Prepare Next View
      if (isGridView) {
        gridView.style.display = "flex";
        generateGridView();
        // Single view is hidden
        singleView.classList.add("hidden");
        singleView.style.display = "none";
      } else {
        singleView.style.display = "flex";
        gantiMie();
        // Grid view is hidden
        gridView.classList.add("hidden");
        gridView.style.display = "none";
      }

      // 4. Show and Animate In Next View
      nextView.classList.remove("hidden");
      nextView.classList.add("fade-in");
      toggleViewText.textContent = btnText;

      setTimeout(() => {
        nextView.classList.remove("fade-in");
      }, 300);
    }, 300); // duration of fade-out
  } else {
    // Original logic (immediate switch)
    toggleViewBtn.style.pointerEvents = "auto"; // Ensure button is clickable if immediate
    if (isGridView) {
      // Switch to grid view
      singleView.classList.add("hidden");
      singleView.style.display = "none";
      gridView.style.display = "flex";
      gridView.classList.remove("hidden");
      toggleViewText.textContent = "Single";
      generateGridView();
    } else {
      // Switch to single view
      gridView.style.display = "none";
      gridView.classList.add("hidden");
      singleView.style.display = "flex";
      singleView.classList.remove("hidden");
      toggleViewText.textContent = "Grid";
      gantiMie(); // Update single view
    }
  }
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
    countDown = null; // Fix: set ke null setelah clear
    timerDisplay.textContent = "SELESAI!";

    finishSound.currentTime = 0;
    finishSound.loop = true;
    finishSound.play();
    // Fix: Set flag untuk tracking bahwa timer selesai
    isPaused = false; // Reset pause state
  }
}

// fungsi mulai timer
function startTimer() {
  selectSound.currentTime = 0;
  selectSound.play();

  // Reset inline styles dari skipIntro() sebelum animasi exit
  // Ini penting untuk mencegah konflik dengan animasi exit
  hal3.style.transform = "";
  hal3.style.opacity = "";

  // Pastikan hal3 tidak dalam state yang konflik
  // Hapus semua class animasi yang mungkin masih aktif
  hal3.classList.remove(
    "slide-in-right",
    "slide-in-left",
    "slide-out-right",
    "slide-out-left",
    "slide-from-left"
  );

  // sembunyikan hal 3 tampilkan hal 4
  hal3.classList.add("exit-left");
  hal3.classList.remove("active");

  // Hide back button when entering timer with animation
  const backBtn = document.getElementById("backBtn");
  backBtn.classList.add("fade-out");
  setTimeout(() => {
    backBtn.classList.add("hidden");
    backBtn.classList.remove("fade-out");
  }, 500);

  // Hide toggle view button when entering timer with animation
  const toggleViewBtn = document.getElementById("toggleViewBtn");
  toggleViewBtn.classList.add("fade-out");
  setTimeout(() => {
    toggleViewBtn.classList.add("hidden");
    toggleViewBtn.classList.remove("fade-out");
  }, 500);

  // Reset hal4 sebelum animasi masuk
  hal4.style.transform = "";
  hal4.style.opacity = "";
  hal4.classList.remove("active", "exit-right", "exit-left");

  hal4.classList.remove("hidden");

  setTimeout(() => {
    hal4.classList.add("active");
  }, 50);

  setTimeout(() => {
    hal3.classList.add("hidden");
    hal3.classList.remove("exit-left");
    hal3.style.transform = ""; // Reset transform
    hal3.style.opacity = ""; // Reset opacity
  }, 600); // sesuai durasi transition

  // Fix: Bersihkan interval variabel untuk timer kalau ada
  if (countDown) {
    clearInterval(countDown);
    countDown = null;
  }

  // Fix: Stop finish sound jika sedang bermain
  finishSound.pause();
  finishSound.currentTime = 0;
  finishSound.loop = false;

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

  // Fix: Clear timer interval untuk mencegah memory leak
  if (countDown) {
    clearInterval(countDown);
    countDown = null;
  }

  // Fix: Stop finish sound jika sedang bermain
  finishSound.pause();
  finishSound.currentTime = 0;
  finishSound.loop = false;

  // Fix: Reset timer state
  isPaused = false;
  timeLeft = 0;

  hal4.classList.add("exit-right");
  hal4.classList.remove("active");

  hal3.classList.remove("hidden");
  hal3.style.transform = "translateX(-100%)"; // mulai dari luar kiri

  setTimeout(() => {
    hal3.classList.add("active");
    updateMenuView(); // Update tampilan menu

    // Show back button when returning to menu with animation
    const backBtn = document.getElementById("backBtn");
    backBtn.classList.remove("hidden");
    backBtn.classList.add("fade-in");
    setTimeout(() => backBtn.classList.remove("fade-in"), 500);

    // Show toggle view button when returning to menu with animation
    const toggleViewBtn = document.getElementById("toggleViewBtn");
    toggleViewBtn.classList.remove("hidden");
    toggleViewBtn.classList.add("fade-in");
    setTimeout(() => toggleViewBtn.classList.remove("fade-in"), 500);
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
//     toggleBtn.textContent = "🔇";
//   }
//   bgmPlaying = !bgmPlaying;
// });

function skipIntro() {
  clickSound.currentTime = 0;
  clickSound.play();

  // Fix: Hentikan animasi ngetik dan reset interval
  if (typingInterval) {
    clearInterval(typingInterval);
    typingInterval = null;
  }

  // Fix: Stop finish sound jika sedang bermain
  finishSound.pause();
  finishSound.currentTime = 0;
  finishSound.loop = false;

  // Sembunyikan tombol skip dengan animasi
  skipBtn.classList.add("fade-out");
  setTimeout(() => {
    skipBtn.classList.add("hidden");
    skipBtn.classList.remove("fade-out");
  }, 500);

  // Cari halaman yang sedang aktif untuk dianimasikan keluar
  let activePage;
  if (startPage.classList.contains("active")) activePage = startPage;
  else if (hal1.classList.contains("active")) activePage = hal1;
  else if (hal2.classList.contains("active")) activePage = hal2;

  if (activePage) {
    // Animate out halaman yang aktif
    activePage.classList.add("exit-left");
    activePage.classList.remove("active");

    // Pastikan halaman lain juga tersembunyi (cleanup)
    if (activePage !== startPage) startPage.classList.add("hidden");
    if (activePage !== hal1) hal1.classList.add("hidden");
    if (activePage !== hal2) hal2.classList.add("hidden");

    // Reset inline styles dari halaman yang aktif sebelum exit
    activePage.style.transform = "";
    activePage.style.opacity = "";

    // Tunggu animasi fade out selesai sebelum menampilkan hal3
    setTimeout(() => {
      activePage.classList.add("hidden");
      activePage.classList.remove("exit-left");
      activePage.style.transform = ""; // Reset transform
      activePage.style.opacity = ""; // Reset opacity

      // Reset hal3 sebelum animasi masuk
      hal3.style.transform = "";
      hal3.style.opacity = "";

      // Tampilkan menu (hal3) dengan animasi masuk setelah fade out selesai
      hal3.classList.remove("hidden");

      // Set initial state untuk animasi masuk
      setTimeout(() => {
        hal3.style.transform = "translateX(100%)"; // Mulai dari kanan
        hal3.style.opacity = "0";

        // Force reflow untuk memastikan initial state diterapkan
        void hal3.offsetHeight;

        setTimeout(() => {
          hal3.classList.add("active");
          hal3.style.transform = "translateX(0)";
          hal3.style.opacity = "1";
          updateMenuView(); // Update tampilan menu

          // Show back button on menu with animation
          const backBtn = document.getElementById("backBtn");
          backBtn.classList.remove("hidden");
          backBtn.classList.add("fade-in");
          setTimeout(() => backBtn.classList.remove("fade-in"), 500);

          // Show toggle view button on menu with animation
          const toggleViewBtn = document.getElementById("toggleViewBtn");
          toggleViewBtn.classList.remove("hidden");
          toggleViewBtn.classList.add("fade-in");
          setTimeout(() => toggleViewBtn.classList.remove("fade-in"), 500);
        }, 50);
      }, 50);
    }, 600); // Tunggu animasi exit selesai
  } else {
    // Fallback jika tidak ada yang active
    startPage.classList.add("hidden");
    hal1.classList.add("hidden");
    hal2.classList.add("hidden");

    // Reset semua inline styles
    startPage.style.transform = "";
    startPage.style.opacity = "";
    hal1.style.transform = "";
    hal1.style.opacity = "";
    hal2.style.transform = "";
    hal2.style.opacity = "";
    hal3.style.transform = "";
    hal3.style.opacity = "";

    // Tampilkan menu langsung
    hal3.classList.remove("hidden");

    setTimeout(() => {
      hal3.style.transform = "translateX(100%)";
      hal3.style.opacity = "0";

      // Force reflow
      void hal3.offsetHeight;

      setTimeout(() => {
        hal3.classList.add("active");
        hal3.style.transform = "translateX(0)";
        hal3.style.opacity = "1";
        updateMenuView(); // Update tampilan menu

        // Show back button on menu with animation
        const backBtn = document.getElementById("backBtn");
        backBtn.classList.remove("hidden");
        backBtn.classList.add("fade-in");
        setTimeout(() => backBtn.classList.remove("fade-in"), 500);

        // Show toggle view button on menu with animation
        const toggleViewBtn = document.getElementById("toggleViewBtn");
        toggleViewBtn.classList.remove("hidden");
        toggleViewBtn.classList.add("fade-in");
        setTimeout(() => toggleViewBtn.classList.remove("fade-in"), 500);
      }, 50);
    }, 50);
  }

  // Nyalakan BGM jika belum nyala
  if (!bgmPlaying) {
    if (!bgm.src) {
      bgm.src = "audio/journey.mp3";
      bgm.type = "audio/mpeg";
    }
    bgm.loop = true;
    bgm.volume = 0.5;
    bgm.play().catch((err) => {
      // Fix: Handle autoplay policy errors
      console.warn("BGM autoplay blocked:", err);
    });
    // toggleBtn.textContent = "🔈"; // Toggle btn is commented out in HTML
    bgmPlaying = true;
  }
}

function goBack() {
  clickSound.currentTime = 0;
  clickSound.play();

  // Fix: Clear timer jika sedang berjalan
  if (countDown) {
    clearInterval(countDown);
    countDown = null;
  }

  // Fix: Stop finish sound jika sedang bermain
  finishSound.pause();
  finishSound.currentTime = 0;
  finishSound.loop = false;

  // Fix: Reset timer state
  isPaused = false;
  timeLeft = 0;

  // Hide back button with animation
  const backBtn = document.getElementById("backBtn");
  backBtn.classList.add("fade-out");
  setTimeout(() => {
    backBtn.classList.add("hidden");
    backBtn.classList.remove("fade-out");
  }, 500);

  // Hide toggle view button with animation
  const toggleViewBtn = document.getElementById("toggleViewBtn");
  toggleViewBtn.classList.add("fade-out");
  setTimeout(() => {
    toggleViewBtn.classList.add("hidden");
    toggleViewBtn.classList.remove("fade-out");
  }, 500);

  // Reset inline styles dari skipIntro() sebelum animasi exit
  // Ini penting untuk mencegah konflik dengan animasi exit
  hal3.style.transform = "";
  hal3.style.opacity = "";

  // Pastikan hal3 tidak dalam state yang konflik
  // Hapus semua class animasi yang mungkin masih aktif
  hal3.classList.remove(
    "slide-in-right",
    "slide-in-left",
    "slide-out-right",
    "slide-out-left"
  );

  // Animate menu out to the right
  hal3.classList.add("exit-right");
  hal3.classList.remove("active");

  // Tunggu animasi fade out hal3 selesai sebelum menampilkan hal2
  setTimeout(() => {
    hal3.classList.add("hidden");
    hal3.classList.remove("exit-right");
    hal3.style.transform = ""; // Reset transform
    hal3.style.opacity = ""; // Reset opacity

    // Pastikan hal2 juga di-reset dulu sebelum animasi masuk
    hal2.style.transform = "";
    hal2.style.opacity = "";
    hal2.classList.remove(
      "active",
      "exit-left",
      "exit-right",
      "slide-in-left",
      "slide-in-right",
      "slide-from-left"
    ); // Reset semua class

    // Show hal2 (last conversation page) with animation from left
    hal2.classList.remove("hidden");

    // Set initial state dengan inline style (dari kiri)
    hal2.style.transform = "translateX(-100%)";
    hal2.style.opacity = "0";
    hal2.style.transition = "transform 0.6s ease, opacity 0.6s ease"; // Pastikan transition aktif

    // Gunakan requestAnimationFrame untuk memastikan initial state diterapkan
    requestAnimationFrame(() => {
      // Force reflow
      void hal2.offsetHeight;

      // Ubah inline style ke posisi tengah (dari kiri ke tengah)
      hal2.style.transform = "translateX(0)";
      hal2.style.opacity = "1";

      // Tambahkan class active untuk state final
      hal2.classList.add("active");

      // Setelah transisi selesai, hapus inline style dan biarkan CSS class yang mengatur
      setTimeout(() => {
        hal2.style.removeProperty("transform");
        hal2.style.removeProperty("opacity");
        hal2.style.removeProperty("transition");
      }, 600); // Sesuai durasi transition

      // Show skip button again with animation
      skipBtn.classList.remove("hidden");
      skipBtn.classList.add("fade-in");
      setTimeout(() => skipBtn.classList.remove("fade-in"), 500);

      // Reset conversation to last page
      typeTextHal2(textHal2Content);
    });
  }, 600); // Tunggu animasi exit hal3 selesai
}
