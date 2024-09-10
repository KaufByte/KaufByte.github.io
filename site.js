document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('background-music');
    const clickerImage = document.getElementById('clicker-image');
    const clickCountDisplay = document.getElementById('click-count');
    const backgroundSelect = document.getElementById('background-select');
    const buyBoosterButton = document.getElementById('buy-booster');
    const buySkinButtons = document.querySelectorAll('.buy-skin');
    const buyWallpaperButtons = document.querySelectorAll('.buy-wallpapers');
    const ownedSkinsSelect = document.getElementById('owned-skins-select');
    const energyBar = document.getElementById('energy-bar');
    const energyText = document.getElementById('energy-text');
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.getElementById('progress-bar');
    const gameContainer = document.getElementById('game-container');
    const quoteElement = document.getElementById('quote-text');
    const quoteAuthorPhotoElement = document.getElementById('quote-author-photo');
    const themeSelector = document.getElementById('theme-selector');
    const languageSelector = document.getElementById('language-selector');
    const buyMaxEnergyBoosterButton = document.getElementById('buy-max-energy-booster');
    const videoBackground = document.getElementById('video-background');
    const hideShowButton = document.getElementById('hide-show-button');

    const backgroundImageElement = document.createElement('div');
    backgroundImageElement.classList.add('background-image');
    document.body.appendChild(backgroundImageElement);

    const quotes = [
        { text: "\"Life is what happens while you are busy making other plans\" — John Lennon", photo: "authors/john_lennon.jpg" },
        { text: "\"I don't believe in killing whatever the reason!\" — John Lennon", photo: "authors/john_lennon.jpg" },

        { text: "\"First they ignore you, then they laugh at you, then they fight you, then you win.\" — Mahatma Gandhi", photo: "authors/Gandhi.jpg" },
        { text: "\"Character alone will have real effect on the masses.\" — Mahatma Gandhi", photo: "authors/Gandhi.jpg" },

        { text: "\"No, I don't want to go to heaven. Hell is much better. Think of all the interesting people you're going to meet down there!\" — Freddie Mercury", photo: "authors/freddieMercury.jpg" },
        { text: "\"Modern paintings are like women, you'll never enjoy them if you try to understand them..\" — Freddie Mercury", photo: "authors/freddieMercury.jpg" },

        { text: "\"Veni, vidi, vici! (I came, I saw, I conquered!)\" — Julius Caesar", photo: "authors/Caesar.jpg" },
        { text: "\"Et Tu Bruté?\" — Julius Caesar", photo: "authors/Caesar.jpg" },
        { text: "\"Human nature is universally imbued with a desire for liberty, and a hatred for servitude\" — Julius Caesar", photo: "authors/Caesar.jpg" },
        
        { text: "\"There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle\" — Albert Einstein", photo: "authors/Einstein.jpg" },

        { text: "\"А сегодня в завтрашний день не все могут смотреть. Вернее смотреть могут не только лишь все, мало кто может это делать!\" — Виталий Кличко", photo: "authors/box.jpg" },
        { text: "\"У нас есть что было\" — Виталий Кличко", photo: "authors/box.jpg" },
        { text: "\"Каждого из киевлян я прошу с пониманием ставиться до... к этой проблеме, иииааа... просил бы также всех киевлян.... точно также... с особым... составляющей... обратиться к проблеме... теплосбережения... подготовки к земле\" — Виталий Кличко", photo: "authors/box.jpg" }
    ];

    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    };

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.toggle('night-mode', savedTheme === 'night');
        themeSelector.value = savedTheme;
    }

    themeSelector.addEventListener('change', (event) => {
        const theme = event.target.value;
        document.body.classList.toggle('night-mode', theme === 'night');
        localStorage.setItem('theme', theme);
    });

    const tryPlayMusic = () => {
        music.volume = 0.1;
        music.play().catch(() => {
            document.addEventListener('click', tryPlayMusic, { once: true });
            document.addEventListener('keydown', tryPlayMusic, { once: true });
        });
    };

    const musicToggleButton = document.getElementById('music-toggle-button');

    let isMusicPlaying = true;

    musicToggleButton.addEventListener('click', () => {
        if (isMusicPlaying) {
            music.pause();
            musicToggleButton.textContent = '🔇';
        } else {
            music.play();
            musicToggleButton.textContent = '🔈';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    loadingScreen.classList.remove('hidden');
    gameContainer.classList.add('hidden');

    const { text, photo } = getRandomQuote();
    quoteElement.textContent = text;
    quoteAuthorPhotoElement.src = photo;

    progressBar.addEventListener('animationend', () => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            gameContainer.classList.remove('hidden');
        }, 900);
    });

    let clickCount = +localStorage.getItem('clickCount') || 0;
    let clickIncrement = +localStorage.getItem('clickIncrement') || 1;
    let clickerSkin = localStorage.getItem('clickerSkin') || 'images/Ethereum.png';
    let ownedSkins = JSON.parse(localStorage.getItem('ownedSkins')) || ['images/Ethereum.png'];
    let ownedWallpapers = JSON.parse(localStorage.getItem('ownedWallpapers')) || ['wallpapers/default.jpg'];
    let boosterCost = +localStorage.getItem('boosterCost') || 200;
    let currentWallpaper = localStorage.getItem('currentWallpaper') || 'wallpapers/default.jpg';
    let energyBoosterCost = +localStorage.getItem('energyBoosterCost') || 50;
    let maxEnergy = +localStorage.getItem('maxEnergy') || 100;
    let energy = +localStorage.getItem('energy') || maxEnergy;
    let currentLanguage = localStorage.getItem('language') || 'en';

    const translations = {
        en: {
            clicks: 'Clicks: ',
            buyBooster: 'Buy Booster (+1 per click) - ',
            boosterCost: ' clicks',
            notEnoughClicks: 'Not enough clicks!',
            chooseBackground: 'Choose Background',
            ownedSkins: 'Owned Skins',
            boosters: 'Boosters',
            skins: 'Skins',
            wallpapers: 'Wallpapers',
            energy: 'Energy',
        },
        ru: {
            clicks: 'Клики: ',
            buyBooster: 'Купить усилитель (+1 за клик) - ',
            boosterCost: ' кликов',
            notEnoughClicks: 'Недостаточно кликов!',
            chooseBackground: 'Выберите фон',
            ownedSkins: 'Мои скины',
            boosters: 'Усилители',
            skins: 'Скины',
            wallpapers: 'Обои',
            energy: 'Энергия',
        },
        ua: {
            clicks: 'Кліки: ',
            buyBooster: 'Купити підсилювач (+1 за клік) - ',
            boosterCost: ' кліків',
            notEnoughClicks: 'Недостатньо кліків!',
            chooseBackground: 'Оберіть фон',
            ownedSkins: 'Мої скіни',
            boosters: 'Підсилювачі',
            skins: 'Скіни',
            wallpapers: 'Шпалери',
            energy: 'Енергія',
        },
        de: {
            clicks: 'Klicks: ',
            buyBooster: 'Booster kaufen (+1 pro Klick) - ',
            boosterCost: ' Klicks',
            notEnoughClicks: 'Nicht genug Klicks!',
            chooseBackground: 'Hintergrund wählen',
            ownedSkins: 'Meine Skins',
            boosters: 'Booster',
            skins: 'Skins',
            wallpapers: 'Hintergründe',
            energy: 'Energie',
        }
    };

    const updateText = (language) => {
        const translationsForLang = translations[language];
        clickCountDisplay.textContent = `${translationsForLang.clicks} ${clickCount}`;
        buyBoosterButton.textContent = `${translationsForLang.buyBooster}${boosterCost}${translationsForLang.boosterCost}`;
        buyBoosterButton.title = translationsForLang.notEnoughClicks;
        document.querySelector('.background-selector label').textContent = translationsForLang.chooseBackground;
        document.querySelector('.owned-skins label').textContent = translationsForLang.ownedSkins;
        document.querySelector('.boosters h2').textContent = translationsForLang.boosters;
        document.querySelector('.skins h2').textContent = translationsForLang.skins;
        document.querySelector('.wallpapers h2').textContent = translationsForLang.wallpapers;
        energyText.textContent = `${translationsForLang.energy}: ${energy}%`;
    };

    languageSelector.value = currentLanguage;
    updateText(currentLanguage);

    languageSelector.addEventListener('change', (event) => {
        const language = event.target.value;
        currentLanguage = language;
        localStorage.setItem('language', language);
        updateText(language);
    });

    const updateClickCountDisplay = () => {
        clickCountDisplay.textContent = `${translations[currentLanguage].clicks} ${clickCount}`;
        localStorage.setItem('clickCount', clickCount);
    };

    const updateEnergyDisplay = () => {
        energyBar.style.width = `${energy}%`;
        energyText.textContent = `${translations[currentLanguage].energy}: ${energy}`;
        localStorage.setItem('energy', energy);
    };

    const updateOwnedSkinsSelect = () => {
        ownedSkinsSelect.innerHTML = ownedSkins.map(skin => 
            `<option value="${skin}">${skin.split('/').pop().split('.')[0]}</option>`
        ).join('');
        ownedSkinsSelect.value = clickerSkin;
    };
    
    const updateBackgroundSelect = () => {
        backgroundSelect.innerHTML = ownedWallpapers.map(wallpaper => 
            `<option value="${wallpaper}">${wallpaper.split('/').pop().split('.')[0]}</option>`
        ).join('');
        backgroundSelect.value = currentWallpaper;
    };

    const setBackground = (backgroundUrl) => {
        if (backgroundUrl.endsWith('.mp4')) {
            backgroundImageElement.classList.add('hidden');
            videoBackground.src = backgroundUrl;
            videoBackground.classList.remove('hidden');
            videoBackground.play();
        } else {
            backgroundImageElement.style.backgroundImage = `url('${backgroundUrl}')`;
            videoBackground.classList.add('hidden');
            backgroundImageElement.classList.remove('hidden');
            videoBackground.pause();
            videoBackground.src = ''; 
        }
        localStorage.setItem('currentWallpaper', backgroundUrl);
    };
    
    const savedBackground = localStorage.getItem('currentWallpaper') || 'wallpapers/default.jpg';
    if (savedBackground) setBackground(savedBackground);

    backgroundSelect.addEventListener('change', () => setBackground(backgroundSelect.value));

    clickerImage.src = clickerSkin;
    updateClickCountDisplay();
    updateEnergyDisplay();
    updateOwnedSkinsSelect();
    updateBackgroundSelect();
    updateEnergyDisplay();
    tryPlayMusic();

    const handleEnergyRegen = () => {
        if (energy < maxEnergy) {
            energy = Math.min(energy + 10, maxEnergy);
            updateEnergyDisplay();
        }
    };

    clickerImage.addEventListener('click', () => {
        if (energy > 0) {
            clickCount += clickIncrement;
            energy -= 1;
            updateClickCountDisplay();
            updateEnergyDisplay();

            clickerImage.classList.add('clicked');
            setTimeout(() => clickerImage.classList.remove('clicked'), 100);
        } else {
            alert('Not enough energy to click!');
        }
    });

    ownedSkinsSelect.addEventListener('change', () => {
        clickerSkin = ownedSkinsSelect.value;
        clickerImage.src = clickerSkin;
        localStorage.setItem('clickerSkin', clickerSkin);
    });

    buyBoosterButton.textContent = `${translations[currentLanguage].buyBooster}${boosterCost}${translations[currentLanguage].boosterCost}`;
    buyBoosterButton.addEventListener('click', () => {
        if (clickCount >= boosterCost) {
            clickCount -= boosterCost;
            clickIncrement += 1;
            boosterCost = Math.ceil(boosterCost * 1.8);
            updateClickCountDisplay();
            localStorage.setItem('clickIncrement', clickIncrement);
            localStorage.setItem('boosterCost', boosterCost);
            buyBoosterButton.textContent = `${translations[currentLanguage].buyBooster}${boosterCost}${translations[currentLanguage].boosterCost}`;
        } else {
            alert(`${translations[currentLanguage].notEnoughClicks}`);
        }
    });

    buySkinButtons.forEach(button => {
        if (ownedSkins.includes(button.dataset.skin)) {
            button.classList.add('bought');
        }

        button.addEventListener('click', () => {
            const cost = +button.dataset.cost;
            const skin = button.dataset.skin;
            if (clickCount >= cost && !ownedSkins.includes(skin)) {
                clickCount -= cost;
                ownedSkins.push(skin);
                updateOwnedSkinsSelect();
                clickerSkin = skin;
                clickerImage.src = clickerSkin;
                updateClickCountDisplay();
                localStorage.setItem('ownedSkins', JSON.stringify(ownedSkins));
                localStorage.setItem('clickerSkin', clickerSkin);
                button.classList.add('bought');
            } else if (ownedSkins.includes(skin)) {
                clickerSkin = skin;
                clickerImage.src = clickerSkin;
                localStorage.setItem('clickerSkin', clickerSkin);
            } else {
                alert(`${translations[currentLanguage].notEnoughClicks}`);
            }
        });
    });
    buyMaxEnergyBoosterButton.textContent = `Buy Max Energy Booster (+5 Max Energy) - ${energyBoosterCost} clicks`;
    buyMaxEnergyBoosterButton.addEventListener('click', () => {
        if (clickCount >= energyBoosterCost) {
            clickCount -= energyBoosterCost;
            maxEnergy += 5; 
            energyBoosterCost = Math.ceil(energyBoosterCost * 1.5); 
    
            if (energy > maxEnergy) {
                energy = maxEnergy;
            }
    
            updateClickCountDisplay();
            updateEnergyDisplay();
            buyMaxEnergyBoosterButton.textContent = `Buy Max Energy Booster (+5 Max Energy) - ${energyBoosterCost} clicks`;
    
            localStorage.setItem('energyBoosterCost', energyBoosterCost);
            localStorage.setItem('maxEnergy', maxEnergy);
            localStorage.setItem('energy', energy);
        } else {
            alert('Not enough clicks!');
        }
    });
    buyWallpaperButtons.forEach(button => {
        if (ownedWallpapers.includes(button.dataset.wallpaper)) {
            button.classList.add('bought');
        }

        button.addEventListener('click', () => {
            const cost = +button.dataset.cost;
            const wallpaper = button.dataset.wallpaper;
            if (clickCount >= cost && !ownedWallpapers.includes(wallpaper)) {
                clickCount -= cost;
                ownedWallpapers.push(wallpaper);
                updateBackgroundSelect();
                setBackground(wallpaper);
                updateClickCountDisplay();
                localStorage.setItem('ownedWallpapers', JSON.stringify(ownedWallpapers));
                localStorage.setItem('currentWallpaper', wallpaper);
                button.classList.add('bought');
            } else if (ownedWallpapers.includes(wallpaper)) {
                setBackground(wallpaper);
                localStorage.setItem('currentWallpaper', wallpaper);
            } else {
                alert(`${translations[currentLanguage].notEnoughClicks}`);
            }
        });
    });

    setInterval(handleEnergyRegen, 4000);
});
