/**
 * 电子日历 - JavaScript 脚本
 * 功能：实时更新时间，显示当前日期和星期
 */

// 更新时间的函数
function updateTime() {
    // 获取当前时间
    const now = new Date();

    // 获取时、分、秒
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // 更新页面上的时间显示
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// 更新日期和星期的函数
function updateDate() {
    const now = new Date();

    // 获取年月日
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 月份从0开始，需要+1
    const day = now.getDate();

    // 更新日期显示
    const dateStr = `${year}年${month}月${day}日`;
    document.getElementById('date').textContent = dateStr;

    // 获取星期几（0=周日，1=周一，...，6=周六）
    const weekday = now.getDay();
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const weekdayStr = weekdays[weekday];
    document.getElementById('weekday').textContent = weekdayStr;
}

/**
 * 生成日历网格
 * 动态生成当月的所有日期
 */
function generateCalendarGrid(year, month) {
    // 获取当月第一天是星期几（0=周日，1=周一，...）
    const firstDay = new Date(year, month, 1).getDay();

    // 获取当月有多少天
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // 获取上个月有多少天
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // 更新年月显示
    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    document.querySelector('.month-year').textContent = `${year}年${monthNames[month]}`;

    // 获取日期格子容器
    const daysGrid = document.querySelector('.days-grid');
    daysGrid.innerHTML = ''; // 清空现有内容

    // 获取今天的日期
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

    // 生成上个月的日期（填充前几行）
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = document.createElement('div');
        day.className = 'day other-month';
        day.textContent = daysInPrevMonth - i;
        daysGrid.appendChild(day);
    }

    // 生成当月的日期
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = day;

        // 如果是今天，添加高亮
        if (isCurrentMonth && day === today.getDate()) {
            dayElement.classList.add('today');
        }

        daysGrid.appendChild(dayElement);
    }

    // 生成下个月的日期（填充最后一行）
    const totalCells = firstDay + daysInMonth;
    const remainingCells = 42 - totalCells; // 6行 × 7列 = 42个格子
    for (let day = 1; day <= remainingCells; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day other-month';
        dayElement.textContent = day;
        daysGrid.appendChild(dayElement);
    }
}

/**
 * 初始化日历
 * 1. 设置当前日期
 * 2. 生成日历网格
 * 3. 开始实时更新时间
 */
function initCalendar() {
    // 获取今天的日期
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    // 设置当前日期
    updateDate();

    // 生成日历网格
    generateCalendarGrid(year, month);

    // 立即更新一次时间
    updateTime();

    // 设置定时器，每秒更新一次时间
    setInterval(updateTime, 1000);
}

// 页面加载完成后初始化日历
document.addEventListener('DOMContentLoaded', initCalendar);

/**
 * 未来可以扩展的功能：
 * 1. 获取真实天气数据（通过API）
 * 2. 显示节假日
 * 3. 支持主题切换
 * 4. 支持显示日程
 */