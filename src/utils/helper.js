export function copyToClipboard(text) {
    // Create a temporary input element
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
  
    // Select and copy the text from the input element
    input.select();
    document.execCommand('copy');
  
    // Remove the input element from the DOM
    document.body.removeChild(input);
  }
  

export function formatDate(milliseconds) {
  var date = parseInt(milliseconds);
  var d = new Date(date);
  var ds = d.toLocaleString("default", { month: "short", day: "numeric" });
  return ds;
}

