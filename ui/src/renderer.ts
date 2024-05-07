const btn = document.getElementById('read-file');
const filePathElement = document.getElementById('filePath');

console.log('--------------------------------------------------------')

//
btn?.addEventListener('click', async () => {
    const filePath = await (window as any).electronAPI.openFile()
    filePathElement!.innerText = filePath
})
