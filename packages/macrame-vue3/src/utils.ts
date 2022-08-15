export function randomId(len) {
    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, x => x.toString(16).padStart(2, '0')).join('');
}
