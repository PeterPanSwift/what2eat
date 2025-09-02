// 美食資料庫 - 包含名稱、描述和可靠的圖片URL
const foods = [
    {
        name: "牛肉麵",
        description: "台灣經典美食，濃郁湯頭配上嫩牛肉和Q彈麵條",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&crop=center"
    },
    {
        name: "珍珠奶茶",
        description: "台灣發明的經典飲品，香濃奶茶搭配Q彈珍珠",
        image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&h=300&fit=crop&crop=center"
    },
    {
        name: "小籠包",
        description: "精緻的上海點心，皮薄餡多，湯汁豐富",
        image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop&crop=center"
    },
    {
        name: "臭豆腐",
        description: "台灣街頭小吃之王，外酥內嫩，越臭越香",
        image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop&crop=center"
    },
    {
        name: "雞排",
        description: "台灣國民美食，香嫩多汁的炸雞排",
        image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&crop=center"
    },
    {
        name: "滷肉飯",
        description: "台灣庶民料理，香濃滷肉搭配白米飯",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&crop=center"
    },
    {
        name: "肉圓",
        description: "彰化名產，Q彈外皮包裹豐富內餡",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&crop=center"
    },
    {
        name: "鹽酥雞",
        description: "台灣夜市人氣小吃，酥脆外皮香嫩雞肉",
        image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop&crop=center"
    },
    {
        name: "刈包",
        description: "台式漢堡，軟Q包子夾滷肉和花生粉",
        image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=400&h=300&fit=crop&crop=center"
    },
    {
        name: "蔥抓餅",
        description: "香酥層次豐富的台式早餐",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&crop=center"
    },
    {
        name: "牛肉捲餅",
        description: "嫩牛肉片包在薄餅裡的美味小吃",
        image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop&crop=center"
    },
    {
        name: "豆花",
        description: "清爽甜品，嫩滑豆花配各種配料",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop&crop=center"
    },
    {
        name: "擔仔麵",
        description: "台南經典小吃，清淡湯頭配蝦子和肉燥",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&crop=center"
    }
];

// DOM 元素
const foodCard = document.getElementById('foodCard');
const foodImage = document.getElementById('foodImage');
const foodName = document.getElementById('foodName');
const foodDescription = document.getElementById('foodDescription');
const randomButton = document.getElementById('randomButton');
const againButton = document.getElementById('againButton');
const foodGrid = document.getElementById('foodGrid');

// 當前選中的食物索引
let currentFoodIndex = -1;

// 初始化頁面
function init() {
    renderFoodGrid();
    setupEventListeners();
}

// 渲染美食網格
function renderFoodGrid() {
    foodGrid.innerHTML = '';
    foods.forEach((food, index) => {
        const foodItem = document.createElement('div');
        foodItem.className = 'food-item';
        foodItem.innerHTML = `
            <img src="${food.image}" alt="${food.name}" onerror="this.src='https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=60&h=60&fit=crop&crop=center'">
            <span>${food.name}</span>
        `;
        foodItem.addEventListener('click', () => selectFood(index));
        foodGrid.appendChild(foodItem);
    });
}

// 設置事件監聽器
function setupEventListeners() {
    randomButton.addEventListener('click', startRandomSelection);
    againButton.addEventListener('click', startRandomSelection);
}

// 開始隨機選擇
function startRandomSelection() {
    // 重置UI
    resetSelection();

    // 添加載入動畫
    foodCard.classList.add('loading');
    randomButton.disabled = true;
    againButton.disabled = true;

    // 模擬載入過程
    let counter = 0;
    const maxCounter = 20;

    const interval = setInterval(() => {
        // 隨機顯示不同的食物
        const randomIndex = Math.floor(Math.random() * foods.length);
        displayFood(randomIndex, false);

        counter++;

        if (counter >= maxCounter) {
            clearInterval(interval);
            // 最終選擇
            const finalIndex = Math.floor(Math.random() * foods.length);
            selectFood(finalIndex);

            // 移除載入動畫
            foodCard.classList.remove('loading');
            foodCard.classList.add('selected-animation');

            // 啟用按鈕
            randomButton.style.display = 'none';
            againButton.style.display = 'inline-block';
            againButton.disabled = false;

            // 移除慶祝動畫
            setTimeout(() => {
                foodCard.classList.remove('selected-animation');
            }, 600);
        }
    }, 100);
}

// 選擇特定食物
function selectFood(index) {
    currentFoodIndex = index;
    displayFood(index, true);
    highlightFoodItem(index);
}

// 顯示食物資訊
function displayFood(index, isSelected = false) {
    const food = foods[index];

    foodImage.src = food.image;
    foodImage.alt = food.name;
    foodName.textContent = food.name;
    foodDescription.textContent = food.description;

    // 處理圖片載入錯誤
    foodImage.onerror = function () {
        this.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop&crop=center';
    };

    if (isSelected) {
        // 添加選中效果
        foodName.style.color = '#667eea';
        setTimeout(() => {
            foodName.style.color = '';
        }, 2000);
    }
}

// 高亮選中的食物項目
function highlightFoodItem(index) {
    // 移除所有選中狀態
    const allItems = foodGrid.querySelectorAll('.food-item');
    allItems.forEach(item => item.classList.remove('selected'));

    // 添加選中狀態到當前項目
    if (allItems[index]) {
        allItems[index].classList.add('selected');

        // 滾動到選中項目
        allItems[index].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }
}

// 重置選擇狀態
function resetSelection() {
    currentFoodIndex = -1;

    // 重置按鈕狀態
    randomButton.style.display = 'inline-block';
    againButton.style.display = 'none';

    // 移除所有選中狀態
    const allItems = foodGrid.querySelectorAll('.food-item');
    allItems.forEach(item => item.classList.remove('selected'));

    // 重置食物卡片
    foodName.textContent = '正在選擇中...';
    foodDescription.textContent = '讓我們為你挑選美味的食物！';
    foodImage.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop&crop=center';
}

// 添加鍵盤快捷鍵
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        if (randomButton.style.display !== 'none') {
            startRandomSelection();
        } else {
            startRandomSelection();
        }
    }
});

// 添加觸摸支持
let touchStartY = 0;
let touchEndY = 0;

foodCard.addEventListener('touchstart', (event) => {
    touchStartY = event.changedTouches[0].screenY;
});

foodCard.addEventListener('touchend', (event) => {
    touchEndY = event.changedTouches[0].screenY;
    const swipeDistance = touchStartY - touchEndY;

    // 向上滑動觸發隨機選擇
    if (swipeDistance > 50) {
        if (randomButton.style.display !== 'none') {
            startRandomSelection();
        } else {
            startRandomSelection();
        }
    }
});

// 添加更多互動效果
foodCard.addEventListener('mouseenter', () => {
    if (currentFoodIndex >= 0) {
        foodCard.style.transform = 'translateY(-5px) scale(1.02)';
    }
});

foodCard.addEventListener('mouseleave', () => {
    foodCard.style.transform = '';
});

// 頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', init);

// 添加一些實用的工具函數
function addToFavorites(index) {
    // 可以後續擴展：添加到收藏功能
    const food = foods[index];
    console.log(`已添加 ${food.name} 到收藏！`);
}

function shareFoodChoice(index) {
    // 可以後續擴展：分享功能
    const food = foods[index];
    if (navigator.share) {
        navigator.share({
            title: '今天吃什麼？',
            text: `我選擇了：${food.name} - ${food.description}`,
            url: window.location.href
        });
    }
}

// 添加統計功能（可選）
let selectionHistory = [];

function trackSelection(index) {
    selectionHistory.push({
        food: foods[index],
        timestamp: new Date()
    });

    // 保存到本地存儲
    localStorage.setItem('foodSelectionHistory', JSON.stringify(selectionHistory));
}

// 載入歷史記錄
function loadSelectionHistory() {
    const saved = localStorage.getItem('foodSelectionHistory');
    if (saved) {
        selectionHistory = JSON.parse(saved);
    }
}
