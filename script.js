function playSound(file) {
    const audio = new Audio(file);
    audio.play();
}

function downloadMP3(file) {
    // 检查是否能正确访问到文件
    const link = document.createElement('a');
    link.href = file;  // 设置要下载的文件路径
    link.download = file.split('/').pop();  // 获取文件名并设置为下载文件的名称

    // 如果浏览器支持下载功能，触发下载
    if (link.download !== undefined) {
        link.click();
    } else {
        // 如果不支持直接下载，则通过 Blob 创建下载链接
        fetch(file)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                link.href = url;
                link.download = file.split('/').pop();
                link.click();
                URL.revokeObjectURL(url); // 清理 URL 对象
            })
            .catch(error => {
                console.error('Download failed', error);
            });
    }

    // 创建并显示下载成功的提示
    const downloadMessage = document.createElement('div');
    downloadMessage.textContent = 'Download started successfully!';
    downloadMessage.style.position = 'fixed';
    downloadMessage.style.top = '50%';  // 设置提示框位置为页面中间
    downloadMessage.style.left = '50%'; // 设置提示框位置为页面中间
    downloadMessage.style.transform = 'translate(-50%, -50%)'; // 精确居中
    downloadMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    downloadMessage.style.color = '#fff';
    downloadMessage.style.padding = '10px';
    downloadMessage.style.borderRadius = '5px';
    downloadMessage.style.zIndex = '1000';
    downloadMessage.style.fontSize = '16px';
    downloadMessage.style.textAlign = 'center';
    document.body.appendChild(downloadMessage);

    // 提示框2秒后消失
    setTimeout(() => {
        document.body.removeChild(downloadMessage);
    }, 2000);
}

document.getElementById('search').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const buttons = document.querySelectorAll('.sound-button');
    
    buttons.forEach(button => {
        const soundName = button.querySelector('p a').textContent.toLowerCase();
        if (soundName.includes(query)) {
            button.style.display = '';
        } else {
            button.style.display = 'none';
        }
    });
});


// 新增的复制链接到剪贴板的功能
function copyLink() {
    // 创建一个临时的输入框
    const tempInput = document.createElement('input');
    // 获取当前页面的 URL
    tempInput.value = window.location.href;
    // 将输入框添加到 DOM 中
    document.body.appendChild(tempInput);
    // 选中输入框的内容
    tempInput.select();
    // 执行复制操作
    document.execCommand('copy');
    // 删除临时输入框
    document.body.removeChild(tempInput);

    // 创建并显示复制成功的提示
    const copyMessage = document.createElement('div');
    copyMessage.textContent = 'Link copied to clipboard!';
    copyMessage.style.position = 'fixed';
    copyMessage.style.top = '50%';  // 设置为页面中间
    copyMessage.style.left = '50%'; // 设置为页面中间
    copyMessage.style.transform = 'translate(-50%, -50%)'; // 精确居中
    copyMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    copyMessage.style.color = '#fff';
    copyMessage.style.padding = '10px';
    copyMessage.style.borderRadius = '5px';
    copyMessage.style.zIndex = '1000';
    copyMessage.style.fontSize = '16px';
    copyMessage.style.textAlign = 'center';
    document.body.appendChild(copyMessage);

    // 提示2秒后消失
    setTimeout(() => {
        document.body.removeChild(copyMessage);
    }, 2000);
}