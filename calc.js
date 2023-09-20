// calc.js
function calculatePosition() {
    const openPrice = parseFloat(document.getElementById('openPrice').value);
    const leverage = parseFloat(document.getElementById('leverage').value);
    const margin = parseFloat(document.getElementById('margin').value);
    const direction = document.getElementById('direction').value;
    const openway = document.getElementById('openway').value;
    
    const positionTableBody = document.getElementById('positionTableBody');
    
    // 清空表格
    while (positionTableBody.firstChild) {
        positionTableBody.removeChild(positionTableBody.firstChild);
    }
    //console.log(openway);

    // 定義倉位數量
    let numPositions; // 在外部作用域定義 numPositions 變數

    if (openway === 'single') {
        numPositions = 1;
    } else if (openway === 'shitdad') {
        numPositions = 3;
    }
    //const numPositions = 3;
    if (numPositions !== undefined) {
        console.log(numPositions);
    } else {
        console.log('numPositions 未初始化或未被賦值');
    }    
    // 創建用於存儲資料的數組，位於迴圈外部
    const positionData = [];
    
    // 初始化第一倉的數據
    const firstPosition = {};
    firstPosition.position = '第1倉';
    firstPosition.leverage = leverage;
    firstPosition.entryPrice = openPrice;
    
    
    if (direction === 'long') {
        firstPosition.stopLossPrice = openPrice - 20;
    } else if (direction === 'short') {
        firstPosition.stopLossPrice = openPrice + 20;
    }
    firstPosition.numPositions = numPositions; 
    positionData.push(firstPosition);
    
    // 使用迴圈處理第二倉和第三倉的計算和添加
    for (let i = 2; i <= numPositions; i++) {
        const rowData = {}; // 創建一個用於存儲每個倉位數據的物件
        
        rowData.position = '第' + i + '倉'; // 倉位編號
        rowData.leverage = leverage * (0.5 * i + 1); // 計算倍數
        
        // 第二倉和第三倉的入場點位是前一倉的止損點位
        rowData.entryPrice = positionData[i - 2].stopLossPrice;
        
        if (direction === 'long') {
            rowData.stopLossPrice = rowData.entryPrice - 20;
        } else if (direction === 'short') {
            rowData.stopLossPrice = rowData.entryPrice + 20;
        }
        rowData.numPositions = numPositions;
        // 添加數據到數組
        positionData.push(rowData);
    }
    
    // 輸出計算結果到控制台
    console.log(positionData);
    
    // 將數組的內容插入到網頁上的表格中
    for (let i = 0; i < positionData.length; i++) {
        const data = positionData[i];
        const newRow = positionTableBody.insertRow();
        
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        
        cell1.innerHTML = data.position;
        cell2.innerHTML = data.leverage;
        cell3.innerHTML = data.entryPrice;
        cell4.innerHTML = data.stopLossPrice;
    }
}

function placeMarketOrder() {
    // 獲取選項元素
    const binanceCheckbox = document.getElementById('binance');
    const bybitCheckbox = document.getElementById('bybit');
    const kineCheckbox = document.getElementById('kine');

    // 創建一個空數組來存儲所選擇的選項
    const selectedExchanges = [];

    // 檢查哪些選項被選擇
    if (binanceCheckbox.checked) {
        selectedExchanges.push(binanceCheckbox.value);
    }
    if (bybitCheckbox.checked) {
        selectedExchanges.push(bybitCheckbox.value);
    }
    if (kineCheckbox.checked) {
        selectedExchanges.push(kineCheckbox.value);
    }

    // 在控制台輸出所選擇的選項
    console.log('所選擇的交易所：', selectedExchanges);

    // 在這裡執行API調用，使用selectedExchanges的值構建API URL
    // 例如：https://10.1.1.0:10000/trading/?exchanges=binance&exchanges=bybit
}
 


function clearFields() {
    document.getElementById('openPrice').value = '';
    document.getElementById('leverage').value = '';
    document.getElementById('margin').value = '';
    document.getElementById('direction').value = 'long';
}
