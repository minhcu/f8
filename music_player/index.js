const listBlock = document.querySelector(".list");
const cd = document.querySelector(".disc");
const songName = document.querySelector(".song-name");
const disc = document.querySelector(".disc");
const discImg = document.querySelector(".disc__img");
const audio = document.querySelector("#audio");
const playBtn = document.querySelector(".play__btn");
const stopBtn = document.querySelector(".stop__btn");
const progressBar = document.querySelector(".progress");
const nextBtn = document.querySelector(".next__btn");
const prevBtn = document.querySelector(".prev__btn");
const randomBtn = document.querySelector(".random__btn");
const repeatBtn = document.querySelector(".repeat__btn");
const PLAYER_STORAGE_KEY = "PLAYER";

const app = {
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  currentIndex: 0,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  songs: [
    {
      name: "Em nên dừng lại",
      singer: "Khang Việt",
      url: "https://vnso-zn-5-tf-mp3-s1-zmp3.zmdcdn.me/b20d982d446cad32f47d/6809065341606619327?authen=exp=1659322626~acl=/b20d982d446cad32f47d/*~hmac=4fb6a967c172382df730b424442b320e&fs=MTY1OTE0OTgyNjMyNnx3ZWJWNnwwfDU4LjE4Ni4xMjkdUngMTmUsIC2",
      bgImg:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/b/0/c/8/b0c8399ab4bf53e7eb1285ee1e8aaa32.jpg",
    },
    {
      name: "Vì mẹ anh bắt chia tay",
      singer: "Miu Lê, Karik, Châu Đăng Khoa",
      url: "https://vnso-zn-5-tf-mp3-s1-zmp3.zmdcdn.me/656217daee9b07c55e8a/2674514253420310719?authen=exp=1659322630~acl=/656217daee9b07c55e8a/*~hmac=96f228882dc1215515ce68a51faaa922&fs=MTY1OTE0OTgzMDAzMnx3ZWJWNnwwfDExMy4xNjEdUngODgdUngMjIy",
      bgImg:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/b/8/9/1b8958017b04a663eb8c093905dd4d85.jpg",
    },
    {
      name: "Ngôi sao cô đơn",
      singer: "Jack",
      url: "https://mp3-s1-zmp3.zmdcdn.me/66c408efdcae35f06cbf/2779850410373472121?authen=exp=1659322628~acl=/66c408efdcae35f06cbf/*~hmac=9a36818856059867e037f28e82934a1c&fs=MTY1OTE0OTgyODAxN3x3ZWJWNnwwfDExMy4xNjEdUngMTY2LjU3",
      bgImg:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/e/2/e/b/e2eb2e4c19e54ab61871ce9f04ac339f.jpg",
    },
    {
      name: "Yêu hơn chính mình",
      singer: "Châu Dương, Dương Edward, AVC",
      url: "https://mp3-s1-zmp3.zmdcdn.me/b287e1ec30add9f380bc/4971733640525752363?authen=exp=1659322636~acl=/b287e1ec30add9f380bc/*~hmac=a31ef71e2dcad5ad0c69cf8ef15fc8f7&fs=MTY1OTE0OTgzNjY5M3x3ZWJWNnwwfDExNy40LjkwLjmUsIC5",
      bgImg:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/7/e/0/7/7e07ef80391681866bc46c471f4219de.jpg",
    },
    {
      name: "Dang dở",
      singer: "Nal, CT",
      url: "https://mp3-s1-zmp3.zmdcdn.me/1eda58d58b9462ca3b85/1305654153906137489?authen=exp=1659322629~acl=/1eda58d58b9462ca3b85/*~hmac=8af80d7b9a7be7b234f3a68120b57079&fs=MTY1OTE0OTgyOTUxOHx3ZWJWNnwwfDExNS43NC4yNDgdUngMTIx",
      bgImg:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/e/4/c/1e4cbb712a766f626e10bfebf5383591.jpg",
    },
    {
      name: "Only",
      singer: "Mr. B",
      url: "https://mp3-s1-zmp3.zmdcdn.me/8c5ce64b300ad954801b/2743145316148622163?authen=exp=1659322629~acl=/8c5ce64b300ad954801b/*~hmac=1bf80dcd21ae58972f07ca237902d699&fs=MTY1OTE0OTgyOTI2Nnx3ZWJWNnwxMDA4NzU2NTg1fDExMy4xNzYdUngNjkdUngMjI5",
      bgImg:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_png/cover/8/f/9/d/8f9d6db9630665533ef0c645b306748c.png",
    },
    {
      name: "Sóng gió đời trai",
      singer: "Danh Vũ Linh, N.G.N, HOA HỒNG DẠI MUSIC",
      url: "https://mp3-s1-zmp3.zmdcdn.me/5786929244d3ad8df4c2/2337701853398304972?authen=exp=1659322622~acl=/5786929244d3ad8df4c2/*~hmac=5fbd30d0791dbde5ffd1bf8d04a8b0c2&fs=MTY1OTE0OTgyMjAzM3x3ZWJWNnwwfDExMy4xODMdUngNzkdUngMjU",
      bgImg:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/b/2/9/3/b29348dcbabcc2025354538c0409bf62.jpg",
    },
    {
      name: "Thương em",
      singer: "Châu Khải Phong, AVC",
      url: "https://mp3-s1-zmp3.zmdcdn.me/3bd3a4570816e148b807/2353244868757319482?authen=exp=1659322622~acl=/3bd3a4570816e148b807/*~hmac=e518ee0ee920d0ddad20c5ea6bc6e8c2&fs=MTY1OTE0OTgyMjg2MXx3ZWJWNnwwfDEyNS4yMzEdUngMjQ0Ljk1",
      bgImg:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/b/0/0/3/b003deb65962e3b9b5f61f21f2f375ba.jpg",
    },
  ],
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  render: function (songs) {
    const htmls = songs
      .map((song, index) => {
        return `
            <div class="list__item ${
              index === this.currentIndex ? "active" : ""
            }"
            data-index="${index}"
            >
            <div class="img" style="background-image: url('${
              song.bgImg
            }')"></div>
            <div class="content">
                <h2>${song.name}</h2>
                <span>${song.singer}</span>
            </div>
            <i class="option fa-solid fa-ellipsis"></i>
            </div>
        `;
      })
      .join("");

    listBlock.innerHTML = htmls;
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.clientWidth;
    listBlock.onscroll = function () {
      const scrollTop = listBlock.scrollTop;
      const newWidth = cdWidth - scrollTop;

      cd.style.width = scrollTop > 195 ? 0 : newWidth + "px";
    };

    playBtn.onclick = function () {
      audio.play();
    };
    stopBtn.onclick = function () {
      audio.pause();
    };

    audio.onplay = function () {
      _this.isPlaying = true;
      disc.style.animationPlayState = "running";
      playBtn.classList.remove("active");
      stopBtn.classList.add("active");
    };

    audio.onpause = function () {
      _this.isPlaying = false;
      disc.style.animationPlayState = "paused";
      stopBtn.classList.remove("active");
      playBtn.classList.add("active");
    };

    audio.ontimeupdate = function () {
      if (audio.duration) {
        const curentProgress = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progressBar.value = curentProgress;
      }
    };

    progressBar.onchange = function (e) {
      const changedValue = (e.target.value / 100) * audio.duration;
      audio.currentTime = changedValue;
    };

    nextBtn.onclick = function () {
      if (_this.isRandom) {
        return _this.playRandomSong();
      }
      _this.nextSong();
      audio.play();
      _this.render(_this.songs);
      _this.scrollToActiveSong();
    };

    prevBtn.onclick = function () {
      if (_this.isRandom) {
        return _this.playRandomSong();
      }
      _this.prevSong();
      audio.play();
      _this.render(_this.songs);
      _this.scrollToActiveSong();
    };

    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      _this.setConfig('isRandom', _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig('isRepeat', _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    audio.onended = function () {
      if (_this.isRepeat) {
        progressBar.value = 0;
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    listBlock.onclick = function (e) {
      const songClick = e.target.closest(".list__item:not(.active)");
      const optionClick = e.target.closest(".option");
      if (songClick || optionClick) {
        if (songClick) {
          _this.currentIndex = Number.parseInt(songClick.dataset.index);
          _this.loadCurrentSong();
          audio.play();
          _this.render(_this.songs);
        }
      }
    };
  },
  loadConfig: function() {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  },
  loadCurrentSong: function () {
    songName.textContent = this.currentSong.name;
    discImg.style.backgroundImage = `url('${this.currentSong.bgImg}')`;
    audio.src = this.currentSong.url;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex === this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (this.currentIndex === newIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      const activeSong = document.querySelector(".list__item.active");
      activeSong.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 400);
  },
  start: function () {
    this.loadConfig();

    this.defineProperties();

    this.handleEvents();

    this.loadCurrentSong();

    this.render(this.songs);
  },
};

app.start();

//
