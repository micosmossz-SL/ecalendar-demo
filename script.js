/**
 * 电子日历 - JavaScript 脚本
 * 功能：实时更新时间，显示当前日期、星期、迷你月历和天气
 */

// OpenWeatherMap API 配置
const WEATHER_API_KEY = 'b09ec24ac369afa7889d8687fc8d0024';
const WEATHER_CITY = 'Shanghai'; // 城市名称
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${WEATHER_CITY}&appid=${WEATHER_API_KEY}&units=metric&lang=zh_cn`;

// 更新时间的函数
function updateTime() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// 更新日期和星期的函数
function updateDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const weekday = now.getDay();

    const dateStr = `${year}年${month}月${day}日`;
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

    document.getElementById('date').textContent = `${dateStr} ${weekdays[weekday]}`;
}

/**
 * 获取天气数据
 * 调用 OpenWeatherMap API，更新天气图标和温度
 */
async function fetchWeather() {
    try {
        const response = await fetch(WEATHER_API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.cod === 200) {
            // API 返回成功
            const temp = Math.round(data.main.temp); // 温度（四舍五入）
            const weatherMain = data.weather[0].main; // 天气类型（Clear, Clouds, Rain 等）
            const weatherIcon = data.weather[0].icon; // 图标代码（如 01d, 02n 等）

            // 更新温度
            document.querySelector('.temperature').textContent = `${temp}°C`;

            // 更新天气图标（根据天气类型和图标代码）
            const emojiIcon = mapWeatherIcon(weatherMain, weatherIcon);
            document.querySelector('.weather-icon').textContent = emojiIcon;
        } else {
            console.error('天气 API 返回错误:', data.cod, data.message);
            // 使用默认值
            document.querySelector('.temperature').textContent = '--°C';
            document.querySelector('.weather-icon').textContent = '❓';
        }
    } catch (error) {
        console.error('获取天气数据失败:', error);
        // 网络错误时使用默认值，保持界面友好
        document.querySelector('.temperature').textContent = '--°C';
        document.querySelector('.weather-icon').textContent = '❓';
    }
}

/**
 * 将 OpenWeatherMap 图标代码转换为 emoji
 * OpenWeatherMap 图标代码说明（2位数字 + d/n）：
 * 01d/01n: Clear（晴）
 * 02d/02n: Few Clouds（少云）
 * 03d/03n: Scattered Clouds（多云）
 * 04d/04n: Broken Clouds（阴）
 * 09d/09n: Shower Rain（阵雨）
 * 10d/10n: Rain（雨）
 * 11d/11n: Thunderstorm（雷阵雨）
 * 13d/13n: Snow（雪）
 * 50d/50n: Mist（雾）
 *
 * 参数：
 * - weatherMain: 天气类型（Clear, Clouds, Rain 等）
 * - iconCode: 图标代码（如 01d, 02n 等）
 */
function mapWeatherIcon(weatherMain, iconCode) {
    // 根据图标代码映射
    const iconMap = {
        // 晴天
        '01d': '☀️', '01n': '🌙',
        // 少云
        '02d': '🌤️', '02n': '☁️',
        // 多云
        '03d': '⛅', '03n': '☁️',
        // 阴天
        '04d': '☁️', '04n': '☁️',
        // 阵雨
        '09d': '🌧️', '09n': '🌧️',
        // 雨
        '10d': '🌦️', '10n': '🌧️',
        // 雷阵雨
        '11d': '⛈️', '11n': '⛈️',
        // 雪
        '13d': '❄️', '13n': '❄️',
        // 雾
        '50d': '🌫️', '50n': '🌫️'
    };

    // 优先使用图标代码映射
    if (iconMap[iconCode]) {
        return iconMap[iconCode];
    }

    // 如果图标代码未知，根据天气类型返回默认图标
    const typeMap = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Fog': '🌫️',
        'Haze': '🌫️'
    };

    return typeMap[weatherMain] || '🌤️'; // 默认返回多云图标
}

/**
 * 生成日历网格
 * 动态生成当月的所有日期
 */
function generateCalendarGrid(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    document.getElementById('month-year').textContent = `${year}年${monthNames[month]}`;

    const daysGrid = document.querySelector('.days-grid');
    daysGrid.innerHTML = '';

    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

    // 上个月日期
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = document.createElement('div');
        day.className = 'day other-month';
        day.textContent = daysInPrevMonth - i;
        daysGrid.appendChild(day);
    }

    // 当月日期
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = day;

        if (isCurrentMonth && day === today.getDate()) {
            dayElement.classList.add('today');
        }

        daysGrid.appendChild(dayElement);
    }

    // 下个月日期
    const totalCells = firstDay + daysInMonth;
    const remainingCells = 42 - totalCells;
    for (let day = 1; day <= remainingCells; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day other-month';
        dayElement.textContent = day;
        daysGrid.appendChild(dayElement);
    }
}

/**
 * 初始化日历
 */
function initCalendar() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    updateDate();
    generateCalendarGrid(year, month);
    updateTime();
    fetchWeather(); // 获取天气数据

    // 定时更新：时间每秒更新，天气每 10 分钟更新
    setInterval(updateTime, 1000);
    setInterval(fetchWeather, 10 * 60 * 1000); // 10 分钟刷新一次天气
}

document.addEventListener('DOMContentLoaded', initCalendar);
